const apiKey = '2b225b51';
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

let debounceTimeout;

searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const query = searchInput.value.trim();
        if (query.length > 3) {
            searchMovies(query);
        } else {
            resultsContainer.innerHTML = '';
        }
    }, 300);
});

function searchMovies(query) {
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayResults(data.Search);
            } else {
                resultsContainer.innerHTML = `<p>${data.Error}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultsContainer.innerHTML = `<p>Error fetching data</p>`;
        });
}

function displayResults(movies) {
    resultsContainer.innerHTML = movies.map(movie => `
    <div class="movie">
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'img/placeholder.jpg'}" alt="${movie.Title}">
      <div class="movie-info">
        <h3>${movie.Title} (${movie.Year})</h3>
        <p><strong>Type:</strong> ${movie.Type}</p>
        <p><strong>IMDb ID:</strong> ${movie.imdbID}</p>
      </div>
    </div>
  `).join('');
}
