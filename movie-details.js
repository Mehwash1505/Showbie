// --- CONFIGURATION ---
const API_KEY = '869ec6d'; // IMPORTANT: Add your API key
const API_BASE_URL = 'https://www.omdbapi.com/';

// --- DOM ELEMENTS ---
const movieDetailsContainer = document.getElementById('movieDetailsContainer');

// --- FUNCTIONS ---

function getMovieIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchAndDisplayMovieDetails() {
    const imdbID = getMovieIdFromUrl();
    if (!imdbID) {
        movieDetailsContainer.innerHTML = `<div class="alert alert-danger">No movie ID provided.</div>`;
        return;
    }

    try {
        const url = `${API_BASE_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`;
        const response = await fetch(url);
        const movie = await response.json();

        if (movie.Response === "True") {
            displayMovieDetails(movie);
        } else {
            movieDetailsContainer.innerHTML = `<div class="alert alert-danger">${movie.Error}</div>`;
        }
    } catch (error) {
        movieDetailsContainer.innerHTML = `<div class="alert alert-danger">Failed to load movie details.</div>`;
    }
}

function displayMovieDetails(movie) {
    document.title = movie.Title; // Update the page title
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600.png?text=No+Image';

    movieDetailsContainer.innerHTML = `
        <div class="row g-4">
            <div class="col-md-4 text-center">
                <img src="${posterUrl}" class="img-fluid rounded shadow-sm" alt="${movie.Title}">
            </div>
            <div class="col-md-8">
                <h2 class="display-5 fw-bold">${movie.Title}</h2>
                <p class="text-muted">${movie.Year} · ${movie.Rated} · ${movie.Runtime}</p>
                
                <h3 class="mt-4">Plot</h3>
                <p>${movie.Plot}</p>
                
                <h3 class="mt-4">Details</h3>
                <div class="details-grid">
                    <div class="detail-item"><strong>Director</strong> ${movie.Director}</div>
                    <div class="detail-item"><strong>Writer</strong> ${movie.Writer}</div>
                    <div class="detail-item"><strong>Genre</strong> ${movie.Genre}</div>
                    <div class="detail-item"><strong>IMDb Rating</strong> ${movie.imdbRating} / 10</div>
                </div>

                <h3 class="mt-4">Cast</h3>
                <p>${movie.Actors}</p>
            </div>
        </div>
    `;
}

// --- INITIALIZATION ---
window.addEventListener('DOMContentLoaded', fetchAndDisplayMovieDetails);