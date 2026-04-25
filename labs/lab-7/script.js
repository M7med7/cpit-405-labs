const API_KEY = 'FQvkVxzUmrQKsDMu1ieSiayWeLCXdbNwkGYhjlXOHiU';
const BASE_URL = 'https://api.unsplash.com/search/photos';

const searchInput = document.getElementById('searchInput');
const btnXHR = document.getElementById('btnXHR');
const btnFetchPromise = document.getElementById('btnFetchPromise');
const btnFetchAsync = document.getElementById('btnFetchAsync');
const imageGrid = document.getElementById('imageGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');

// Utility to clear UI
function clearUI() {
    imageGrid.innerHTML = '';
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
}

// Utility to show/hide loading
function toggleLoading(isLoading) {
    if (isLoading) {
        loadingIndicator.classList.remove('hidden');
        imageGrid.classList.add('hidden');
    } else {
        loadingIndicator.classList.add('hidden');
        imageGrid.classList.remove('hidden');
    }
}

// Utility to show error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    toggleLoading(false);
}

// Render images to DOM
function renderImages(photos) {
    if (photos.length === 0) {
        showError('No images found for your search query.');
        return;
    }

    const fragment = document.createDocumentFragment();

    photos.forEach(photo => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'img-item';

        const img = document.createElement('img');
        img.src = photo.urls.regular;
        img.alt = photo.alt_description || 'Unsplash Image';
        img.loading = 'lazy'; // For performance

        itemDiv.appendChild(img);
        fragment.appendChild(itemDiv);
    });

    imageGrid.appendChild(fragment);
}

// Build the request URL
function getSearchUrl() {
    const query = searchInput.value.trim();
    if (!query) {
        showError('Please enter a search term.');
        return null;
    }
    return `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=12`;
}

// Method 1: Using XMLHttpRequest
function searchUsingXHR() {
    const url = getSearchUrl();
    if (!url) return;

    clearUI();
    toggleLoading(true);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `Client-ID ${API_KEY}`);

    xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
            try {
                const response = JSON.parse(this.responseText);
                renderImages(response.results);
                toggleLoading(false);
            } catch (e) {
                showError('Error parsing XHR response.');
            }
        } else {
            showError(`XHR Error: ${this.status} ${this.statusText}`);
        }
    };

    xhr.onerror = function() {
        showError('Network error occurred with XHR.');
    };

    xhr.send();
}

// Method 2: Using fetch with Promises
function searchUsingFetchPromises() {
    const url = getSearchUrl();
    if (!url) return;

    clearUI();
    toggleLoading(true);

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Client-ID ${API_KEY}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Fetch Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        renderImages(data.results);
        toggleLoading(false);
    })
    .catch(error => {
        showError(error.message);
    });
}

// Method 3: Using fetch with async/await
async function searchUsingFetchAsyncAwait() {
    const url = getSearchUrl();
    if (!url) return;

    clearUI();
    toggleLoading(true);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Client-ID ${API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`Fetch Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        renderImages(data.results);
        toggleLoading(false);
    } catch (error) {
        showError(error.message);
    }
}

// Event Listeners for buttons
btnXHR.addEventListener('click', searchUsingXHR);
btnFetchPromise.addEventListener('click', searchUsingFetchPromises);
btnFetchAsync.addEventListener('click', searchUsingFetchAsyncAwait);

// Keyboard event listener for Enter key on search input
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        // Trigger default async/await search on Enter
        searchUsingFetchAsyncAwait();
    }
});

// Optionally trigger initial search
document.addEventListener('DOMContentLoaded', () => {
    searchUsingFetchAsyncAwait();
});
