// TMDB API Configuration
const API_KEY = '5d2e8d81af006db52b69051d9a4999bc'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mediaTypeSelect = document.getElementById('media-type');
const yearFilter = document.getElementById('year-filter');
const trendingContainer = document.getElementById('trending-movies');
const searchResultsContainer = document.getElementById('search-results');
const movieModal = document.getElementById('movie-modal');
const closeBtn = document.querySelector('.close-btn');
const modalBody = document.getElementById('modal-body');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load trending movies
    fetchTrendingMovies();
    
    // Populate year filter (last 30 years)
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 30; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    }
    
    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    closeBtn.addEventListener('click', () => {
        movieModal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === movieModal) {
            movieModal.style.display = 'none';
        }
    });
});

// Fetch trending movies
async function fetchTrendingMovies() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        const data = await response.json();
        displayMovies(data.results, trendingContainer);
    } catch (error) {
        console.error('Error fetching trending movies:', error);
    }
}

// Perform search
async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    
    const mediaType = mediaTypeSelect.value;
    const year = yearFilter.value;
    
    try {
        let url;
        if (mediaType === 'all') {
            // Search both movies and TV shows
            const [moviesResponse, tvResponse] = await Promise.all([
                fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&year=${year}`),
                fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&first_air_date_year=${year}`)
            ]);
            
            const moviesData = await moviesResponse.json();
            const tvData = await tvResponse.json();
            
            // Combine results
            const combinedResults = [
                ...moviesData.results.map(item => ({ ...item, media_type: 'movie' })),
                ...tvData.results.map(item => ({ ...item, media_type: 'tv' }))
            ];
            
            displayMovies(combinedResults, searchResultsContainer);
        } else {
            // Search specific media type
            url = `${BASE_URL}/search/${mediaType}?api_key=${API_KEY}&query=${query}`;
            if (mediaType === 'movie' && year) {
                url += `&year=${year}`;
            } else if (mediaType === 'tv' && year) {
                url += `&first_air_date_year=${year}`;
            }
            
            const response = await fetch(url);
            const data = await response.json();
            displayMovies(data.results.map(item => ({ ...item, media_type: mediaType })), searchResultsContainer);
        }
    } catch (error) {
        console.error('Error searching:', error);
    }
}

// Display movies in a container
function displayMovies(movies, container) {
    container.innerHTML = '';
    
    if (!movies || movies.length === 0) {
        container.innerHTML = '<p>No results found</p>';
        return;
    }
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        const posterPath = movie.poster_path ? IMG_BASE_URL + movie.poster_path : 'https://via.placeholder.com/200x300?text=No+Poster';
        const title = movie.title || movie.name;
        const date = movie.release_date || movie.first_air_date;
        const year = date ? date.split('-')[0] : 'N/A';
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
        
        movieCard.innerHTML = `
            <button class="favorite-btn" data-id="${movie.id}" data-type="${movie.media_type}">
                <i class="far fa-heart"></i>
            </button>
            <img src="${posterPath}" alt="${title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${title}</h3>
                <p class="movie-year">${year}</p>
            </div>
            <div class="movie-rating">⭐ ${rating}</div>
        `;
        
        movieCard.addEventListener('click', () => {
            showMovieDetails(movie.id, movie.media_type);
        });
        
        container.appendChild(movieCard);
    });
}

// Show movie/TV show details in modal
async function showMovieDetails(id, mediaType) {
    try {
        // Fetch details, credits, and videos
        const [detailsResponse, creditsResponse, videosResponse] = await Promise.all([
            fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`),
            fetch(`${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`),
            fetch(`${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}`)
        ]);
        
        const details = await detailsResponse.json();
        const credits = await creditsResponse.json();
        const videos = await videosResponse.json();
        
        // Find trailer (first YouTube video)
        const trailer = videos.results.find(video => 
            video.site === 'YouTube' && video.type === 'Trailer'
        );
        
        // Prepare modal content
        const posterPath = details.poster_path ? IMG_BASE_URL + details.poster_path : 'https://via.placeholder.com/500x750?text=No+Poster';
        const title = details.title || details.name;
        const date = details.release_date || details.first_air_date;
        const year = date ? date.split('-')[0] : 'N/A';
        const runtime = details.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : 'N/A';
        const genres = details.genres.map(genre => genre.name).join(', ');
        
        // Get top 10 cast members
        const cast = credits.cast.slice(0, 10).map(person => ({
            name: person.name,
            character: person.character,
            photo: person.profile_path ? IMG_BASE_URL + person.profile_path : 'https://via.placeholder.com/100x100?text=No+Photo'
        }));
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${title} (${year})</h2>
                <div class="modal-rating">⭐ ${details.vote_average?.toFixed(1) || 'N/A'}/10</div>
            </div>
            
            <div class="modal-main-content">
                <img src="${posterPath}" alt="${title}" class="modal-poster">
                
                <div class="modal-info">
                    <div class="modal-details">
                        <span><strong>Genres:</strong> ${genres}</span>
                        ${mediaType === 'movie' ? `<span><strong>Runtime:</strong> ${runtime}</span>` : ''}
                        <span><strong>Status:</strong> ${details.status}</span>
                    </div>
                    
                    <h3>Overview</h3>
                    <p class="modal-overview">${details.overview || 'No overview available.'}</p>
                    
                    ${trailer ? `
                        <h3>Trailer</h3>
                        <div class="trailer-container">
                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/${trailer.key}" 
                                    frameborder="0" allowfullscreen></iframe>
                        </div>
                    ` : ''}
                    
                    <h3>Top Cast</h3>
                    <div class="cast-container">
                        ${cast.map(person => `
                            <div class="cast-member">
                                <img src="${person.photo}" alt="${person.name}" class="cast-photo">
                                <p class="cast-name">${person.name}</p>
                                <p class="cast-character">${person.character}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        movieModal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching movie details:', error);
        modalBody.innerHTML = '<p>Error loading details. Please try again.</p>';
        movieModal.style.display = 'block';
    }
}