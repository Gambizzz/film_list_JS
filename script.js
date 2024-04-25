const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const movieResults = document.getElementById('movieResults');

let observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const searchWord = searchInput.value.trim(); //enlève espaces inutiles de la saisie

  if (!searchWord) { //si barre de recherche vide 
      alert('Write something before submit !'); //message d'erreur
      return;
  }

  const apiKey = '6e8c56c';
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchWord}`; //appel API selon titre recherché

  //requête API
  fetch(url)
      .then(response => {
          if (!response.ok) { //si réponse pas valide
              throw new Error('API request error !');
          }
          return response.json();
      })
      .then(data => {
          if (data.Response === 'True') { //si réponse valide
              displayMovies(data.Search); //films affichés
          } else {
              movieResults.innerHTML = '<p> No result !</p>'; //si réponse pas valide, message d'erreur
          }
      })
      .catch(error => {
          console.error('API request error !', error); //si pb avec requête API
          movieResults.innerHTML = '<p> Problem while searching... </p>'; //message erreur apparait
      });
});

//afficher les films
function displayMovies(movies) {
  movieResults.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div'); //création film card
    movieCard.classList.add('movie-card', 'row'); //ajout classe à film card
    observer.observe(movieCard); //indique élément à observer

    const posterColumn = document.createElement('div'); //création colonne pour image
    posterColumn.classList.add('col-md-4'); //ajout classe à colonne image

    const poster = document.createElement('img'); //création affiche de film
    poster.src = movie.Poster; //source image
    poster.alt = movie.Title; //alt image

    posterColumn.appendChild(poster); //ajout de la colonne à élément poster

    const contentColumn = document.createElement('div'); //création colonne pour contenu
    contentColumn.classList.add('col-md-8', 'd-flex', 'flex-column', 'justify-content-center'); //ajout classe à colonne contenu

    const title = document.createElement('h2'); //création titre film
    title.textContent = movie.Title; //texte du titre

    const releaseDate = document.createElement('p'); //création date de sortie
    releaseDate.textContent = `${movie.Year}`; //texte date de sortie

    const ctaButton = document.createElement('button'); //création bouton Read More
    ctaButton.classList.add('cta-btn'); //ajout classe au bouton
    ctaButton.textContent = 'Read More'; //texte du bouton

    //ajout évènement click au bouton
    ctaButton.addEventListener('click', function() {
      const apiKey = '6e8c56c';
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`; //appel API via ID pour avoir infos complètes du film

      fetch(url)
        .then(response => {
          if (!response.ok) { //si réponse pas valide
            throw new Error('API request error !');
          }
          return response.json();
        })
        .then(data => { //sinon affichage des données du films via une fonction
          showMovieDescription(data.Title, data.Poster, data.Released, data.Plot);
        })
        .catch(error => {
          console.error('Error fetching movie details:', error); 
        });
    });

    //ajout des éléments title, releaseDate et ctaButton dans élément contentColumn
    contentColumn.appendChild(title);
    contentColumn.appendChild(releaseDate);
    contentColumn.appendChild(ctaButton);

    //ajout des deux colonnes dans élément movieCard
    movieCard.appendChild(posterColumn);
    movieCard.appendChild(contentColumn);

    //ajout élément movieCard dans élément movieResults
    movieResults.appendChild(movieCard);
  });
};

//affichage des données du film dans le modal
function showMovieDescription(title, poster, released, plot) {
  const modalTitle = document.getElementById('movieModalLabel');
  const modalPoster = document.getElementById('moviePoster');
  const modalBody = document.getElementById('movieDescription');

  modalTitle.textContent = title;
  modalBody.innerHTML = `${released}<br><br>${plot}`;
  modalPoster.src = poster;

  $('#movieModal').modal('show');
}



