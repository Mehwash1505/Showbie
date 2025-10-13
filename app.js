// --- CONFIGURATION ---
const API_KEY = '869ec6d'; // IMPORTANT: Add your API key
const API_BASE_URL = 'https://www.omdbapi.com/';

// --- DOM ELEMENTS ---
const searchForm = document.getElementById('searchForm');
const movieInput = document.getElementById('movieInput');
const resultsContainer = document.getElementById('resultsContainer');
const uiFeedback = document.getElementById('uiFeedback');

// --- EVENT LISTENERS ---
searchForm.addEventListener('submit', handleSearch);
resultsContainer.addEventListener('click', handleCardClick);
// Add listener to load default movies when the page first loads
window.addEventListener('DOMContentLoaded', fetchDefaultMovies);


// --- FUNCTIONS ---

/**
 * Handles the form submission to search for movies.
 */
function handleSearch(e) {
    e.preventDefault();
    const searchTerm = movieInput.value.trim();
    if (searchTerm) fetchMovieData(searchTerm);
    else showFeedback('Please enter a movie title.', 'warning');
}

/**
 * Handles clicks on movie cards to redirect to the details page.
 */
function handleCardClick(e) {
    const card = e.target.closest('.movie-card-wrapper');
    if (card) {
        const imdbID = card.dataset.imdbid;
        // Redirect to the new details page with the ID in the URL
        window.location.href = `movie.html?id=${imdbID}`;
    }
}

/**
 * Fetches and displays a default list of movies on page load.
 * The OMDb API doesn't have a "latest" endpoint, so we search for a popular term.
 */
function fetchDefaultMovies() {
    fetchMovieData("Action"); // You can change "Action" to any other default search
}

/**
 * Fetches a list of movies based on a search term.
 */
async function fetchMovieData(searchTerm) {
    showFeedback('Loading Movies...', 'info', true);
    try {
        const url = `${API_BASE_URL}?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
            displayMovies(data.Search);
            clearFeedback();
        } else {
            displayMovies([]);
            showFeedback(data.Error, 'danger');
        }
    } catch (error) {
        displayMovies([]);
        showFeedback('An error occurred. Please try again.', 'danger');
    }
}

/**
 * Displays a list of movies in the results container.
 */
function displayMovies(movies) {
    resultsContainer.innerHTML = '';
    if (movies.length === 0) return;
    movies.forEach(movie => {
        resultsContainer.innerHTML += createMovieCard(movie);
    });
}

/**
 * Creates the HTML for a single movie card.
 */
function createMovieCard(movie) {
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600.png?text=No+Image';
    return `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4 movie-card-wrapper" data-imdbid="${movie.imdbID}">
            <div class="card h-100 movie-card shadow-sm">
                <img src="${posterUrl}" class="card-img-top" alt="${movie.Title} Poster">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title movie-title">${movie.Title}</h5>
                    <p class="card-text movie-year mt-auto">${movie.Year}</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Shows feedback messages (like errors or loading indicators).
 */
function showFeedback(message, type, isLoading = false) {
    let content = isLoading ? `
        <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
        <p class="mt-2">${message}</p>` :
        `<div class="alert alert-${type}" role="alert">${message}</div>`;
    uiFeedback.innerHTML = content;
}

/**
 * Clears the feedback message area.
 */
function clearFeedback() {
    uiFeedback.innerHTML = '';
}