window.onload = async () => {
    const app = document.getElementById("root");
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    app.appendChild(container);

    // Aquí debemos agregar nuestro fetch
    const response = await fetch('http://localhost:3031/api/movies');
    const peliculas = await response.json();

    // Obtener las películas favoritas del localStorage
    let favoriteMovies = localStorage.getItem('favoriteMovies');
    // Verificar si hay películas favoritas en el localStorage
    favoriteMovies = favoriteMovies ? JSON.parse(favoriteMovies) : {};

    // Filtrar las películas para mostrar solo las favoritas
    const favoriteMovieIds = Object.keys(favoriteMovies);

    let data = peliculas.data.filter(movie => favoriteMovieIds.includes(movie.id.toString()));

    data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
            const genero = document.createElement("p");
            genero.textContent = `Género: ${movie.genre.name}`;
            card.appendChild(genero);
        }
        card.appendChild(duracion);
    });
};
