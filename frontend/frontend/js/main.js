// window.onload = async () => {
//   const app = document.getElementById("root");
//   const container = document.createElement("div");
//   container.setAttribute("class", "container");
//   app.appendChild(container);
//   const encabezado = document.querySelector(".encabezado");

//   try {
//     const response = await fetch("http://localhost:3031/api/movies");
//     const peliculas = await response.json();

//     let data = peliculas.data;

//     // Obtener las películas favoritas del localStorage
//     let favoriteMovies = localStorage.getItem("favoriteMovies");
//     // Verificar si hay películas favoritas en el localStorage
//     favoriteMovies = favoriteMovies ? JSON.parse(favoriteMovies) : {};

//     data.forEach((movie) => {
//       const card = document.createElement("div");
//       card.style.cursor = "pointer";
//       card.setAttribute("class", "card");

//       // Redirigir al usuario al detalle de la película cuando haga clic en la tarjeta
//       card.addEventListener("click", () => {
//         // window.location.href = `/movies/update/${movie.id}`;
//         // Dentro del event listener de la tarjeta
//         card.addEventListener("click", () => {
//           // Almacenar los datos de la película en localStorage
//           localStorage.setItem("selectedMovie", JSON.stringify(movie));
//           // Redirigir al usuario al formulario.html
//           window.location.href = "/frontend/frontend/formulario.html";
//         });
//       });

//       const h1 = document.createElement("h1");
//       h1.textContent = movie.title;

//       const p = document.createElement("p");
//       p.textContent = `Rating: ${movie.rating}`;

//       const duracion = document.createElement("p");
//       duracion.textContent = `Duración: ${movie.length}`;

//       const favorito = document.createElement("i");
//       favorito.id = movie.id;

//       if (favoriteMovies[movie.id]) {
//         favorito.classList.add("fa-solid");
//         favorito.classList.add("fa-star");
//       } else {
//         favorito.classList.add("fa-regular");
//         favorito.classList.add("fa-star");
//       }

//       favorito.addEventListener("click", (e) => {
//         // Stop Propagation sirve para que al usuario hacer click en la tarjeta no se active el evento de click que redirecciona al usuario.
//         e.stopPropagation();
//         e.preventDefault();

//         if (favoriteMovies[movie.id]) {
//           delete favoriteMovies[movie.id];
//           favorito.classList.remove("fa-solid");
//           favorito.classList.add("fa-regular");
//         } else {
//           favoriteMovies[movie.id] = true;
//           favorito.classList.remove("fa-regular");
//           favorito.classList.add("fa-solid");
//         }
//         localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
//       });

//       container.appendChild(card);
//       card.appendChild(h1);
//       card.appendChild(p);
//       if (movie.genre !== null) {
//         const genero = document.createElement("p");
//         genero.textContent = `Género: ${movie.genre.name}`;
//         card.appendChild(genero);
//       }
//       card.appendChild(duracion);

//       card.appendChild(favorito);
//     });

//     if (Object.keys(favoriteMovies).length > 0) {
//       const favoriteList = document.createElement("a");
//       favoriteList.href = "/favoriteMovies";
//       favoriteList.textContent = "Ver favoritos";
//       encabezado.appendChild(favoriteList);
//     }
//     console.log(favoriteMovies);
//   } catch (error) {
//     console.log("Error: ", error);
//   }
// };

window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  const encabezado = document.querySelector('.encabezado')

  try {
    const response = await fetch('http://localhost:3031/api/movies');
    const peliculas = await response.json();

    let data = peliculas.data;

    let favoriteMovies = localStorage.getItem('favoriteMovies');
    favoriteMovies = favoriteMovies ? JSON.parse(favoriteMovies) : {};

    console.log("local storage favorite:",favoriteMovies);
    
    data.forEach((movie) => {
      const card = document.createElement("div");
      card.style.cursor  = 'pointer';
      card.setAttribute("class", "card");

      card.addEventListener('click', () => {
        localStorage.setItem("selectedMovie", JSON.stringify(movie));
        window.location.href = "/frontend/frontend/formulario.html";
      });

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const favorito = document.createElement('i');
      favorito.id = movie.id;

      if (favoriteMovies[movie.id]) {
        favorito.classList.add('fas');
        favorito.classList.add('fa-star');
      } else {
        favorito.classList.add('far');
        favorito.classList.add('fa-star');
      }

      favorito.addEventListener('click', (e) => {
        // Stop Propagation sirve para que al usuario hacer click en la tarjeta no se active el evento de click que redirecciona al usuario.
        e.stopPropagation();
        e.preventDefault();
        console.log("Favorito boton");

        if (favoriteMovies[movie.id]) {
          delete favoriteMovies[movie.id];
          favorito.classList.remove('fas');
          favorito.classList.add('far');
        } else {
          favoriteMovies[movie.id] = true;
          favorito.classList.remove('far');
          favorito.classList.add('fas');
        }
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
      });

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Género: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      card.appendChild(favorito);
    });

    if (Object.keys(favoriteMovies).length > 0) {
      const favoriteList = document.createElement('a');
      favoriteList.href = '/favoriteMovies';
      favoriteList.textContent = 'Ver favoritos';
      encabezado.appendChild(favoriteList);
    }
    console.log(favoriteMovies);
  } catch (error) {
    console.log("Error: ", error);
  }
};