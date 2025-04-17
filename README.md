# Movie_Expplorer

A web application that allows users to search for movies and TV shows, view trending content, and explore detailed information including posters, ratings, cast, and trailers. Built with HTML, CSS, and JavaScript, it uses the TMDB API for data.

Features





Search: Search for movies, TV shows, or both by title and filter by year.



Trending Section: Displays trending movies and TV shows for the week.



Details Modal: View detailed information including poster, overview, genres, runtime, cast, and trailer.



Responsive Design: Optimized for desktop and mobile devices.



Favorite Button: Placeholder for favoriting movies (requires backend for persistence).



Filters: Filter by media type (movies, TV shows, or both) and release year.

Demo

Live Demo (Replace with your deployed URL after hosting)

Technologies Used





Frontend: HTML5, CSS3, JavaScript (ES6)



API: The Movie Database (TMDB) API



Icons: Font Awesome



Hosting: AWS Amplify (recommended for deployment)



Version Control: Git, GitHub

Getting Started

Prerequisites





A TMDB API key. Sign up for a free account and generate an API key.



A modern web browser (Chrome, Firefox, Edge, etc.).



Node.js and npm (optional, for local development with a server).



Git for cloning the repository.

Installation





Clone the Repository:

git clone https://github.com/your-username/movie-tv-explorer.git
cd movie-tv-explorer



Add TMDB API Key:





Open script.js.



Replace the API_KEY variable with your TMDB API key:

const API_KEY = 'your-tmdb-api-key';



Serve the Application Locally:





Option 1: Use a local server (recommended for API calls):

npm install -g live-server
live-server



Option 2: Open index.html directly in a browser (note: some API calls may be blocked due to CORS).



The app will be available at http://localhost:8080 (port may vary).

Folder Structure

movie-tv-explorer/
├── index.html        # Main HTML file
├── styles.css        # CSS styles
├── script.js         # JavaScript logic for API calls and DOM manipulation
└── README.md         # Project documentation

Deployment

Deploy the app to a hosting service like AWS Amplify for free using the AWS Free Tier.

Deploying to AWS Amplify





Push Code to GitHub:





Create a GitHub repository and push your code:

git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/movie-tv-explorer.git
git branch -M main
git push -u origin main



Set Up AWS Amplify:





Sign in to the AWS Management Console.



Go to AWS Amplify, select New app > Host web app.



Connect your GitHub repository and authorize AWS Amplify.



Select your repository and branch (e.g., main).



Accept default build settings and deploy.



Once deployed, access your app at the provided URL (e.g., https://main.random-id.amplifyapp.com).



Continuous Deployment:





Updates pushed to the main branch will automatically trigger redeployment.

For detailed instructions, refer to the AWS Amplify documentation.

Alternative Deployment





Amazon S3: Upload files to an S3 bucket and enable static website hosting.



Netlify/Vercel: Drag-and-drop or Git-based deployment for simpler hosting.

Usage





Search: Enter a movie or TV show title in the search bar and press Enter or click the search button.



Filter: Use the dropdowns to filter by media type (movies, TV shows, or both) and release year.



Explore Trending: View trending content in the "Trending This Week" section.



View Details: Click a movie/TV show card to open a modal with detailed information, including cast and trailer (if available).

Screenshots

(Add screenshots of your app here, e.g., homepage, search results, modal. Store images in the repository, e.g., screenshot.png.)

Contributing

Contributions are welcome! To contribute:





Fork the repository.



Create a feature branch (git checkout -b feature/your-feature).



Commit your changes (git commit -m "Add your feature").



Push to the branch (git push origin feature/your-feature).



Open a Pull Request.

Issues

If you encounter bugs or have feature requests, please open an issue on the GitHub Issues page.

Security Note

The TMDB API key is hardcoded in script.js for simplicity. For production:





Store the API key in an environment variable.



Use a backend (e.g., AWS Lambda) to proxy API requests securely.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments





The Movie Database (TMDB) for providing the API.



Font Awesome for icons.



AWS Amplify for hosting.

Contact

For questions or feedback, reach out via GitHub Issues or email at therpsingh.2110@gmail.com
