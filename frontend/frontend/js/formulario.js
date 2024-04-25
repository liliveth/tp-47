window.onload = async () => {
    console.log("EN EL FORMULARIO")
    const title = document.querySelector('#title');
    const rating = document.querySelector('#rating');
    const awards = document.querySelector('#awards');
    const release_date = document.querySelector('#release_date');
    const length = document.querySelector('#length');
    const form = document.querySelector('.formulario');
    const path = window.location.pathname;
    const movieId = path.substring(path.lastIndexOf('/') + 1);
    const inputs = document.querySelectorAll('input');

    function notEmpty(input){
        input.addEventListener('blur', (e)=>{
            if(!input.value.trim()){
                input.style.backgroundColor = 'red'
            } else {
                input.style.backgroundColor = 'white'
            }
        
        })
    }

    inputs.forEach(input =>{
        notEmpty(input)
    })
    
        const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    
        if (selectedMovie) {
            console.log(selectedMovie)
            title.value = selectedMovie.title;
            rating.value = selectedMovie.rating;
            awards.value = selectedMovie.awards;
            release_date.value = new Date(selectedMovie.release_date).toISOString().split('T')[0];
            length.value = selectedMovie.length;
        }
    
    

    const buttons = {
        agregar: document.querySelector('.botonAgregar'),
        editar: document.querySelector('.botonModificar'),
        eliminar: document.querySelector('.botonBorrar')
    };

    Object.values(buttons).forEach(button => {
        button.addEventListener('click', async (e) => {
            const buttonId = e.target.classList;

            console.log("Action button:", buttonId)

            if (buttonId == 'botonAgregar') {
                await handleAdd(e);
            } else if (buttonId == 'botonModificar') {
                await handleEdit(e);
            } else if (buttonId == 'botonBorrar') {
                await handleDelete(e);
            } else {
                console.error('Botón no reconocido');
            }
        });
    });

async function handleAdd(e) {
    try {
        if(selectedMovie){
            console.log(selectedMovie)
            localStorage.removeItem('selectedMovie');
            console.log(selectedMovie)
        } else {
        const movie = {
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: release_date.value,
            length: length.value,
        };
        console.log("RESPUESTA BODY: ", movie);

        const response = await fetch('http://localhost:3031/api/movies/create', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });

        console.log("RESPUESTA CREAR: ", response);

        if (response.ok) {
            console.log('Se ha creado la película correctamente');
            location.href = `home.html`;
        } else {
            console.log('Ha habido un error al crear la película');
        }
    }
    } catch (error) {
        console.error('Error al crear la película:', error);
    }
}

async function handleEdit(e) {
    console.log('Estás en la página de edición de una película');
        try {
                const updatedMovie = {
                    title: title.value,
                    rating: rating.value,
                    awards: awards.value,
                    release_date: release_date.value,
                    length: length.value,
                };
                console.log("datos a editar:", updatedMovie)

                e.preventDefault()
                const response = await fetch(`http://localhost:3031/api/movies/update/${selectedMovie.id}`, {
                    method: 'PUT',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedMovie)
                });

                if (response.ok) {
                    location.href = `home.html`;
                    console.log('Película actualizada correctamente');
                } else {
                    console.error('Error al actualizar la película:', response.status);
                }
            
        } catch (error) {
            console.log("Error:", error);
        }

}

async function handleDelete(e) {
    try {
            
            const response = await fetch(`http://localhost:3031/api/movies/delete/${selectedMovie.id}`, {
                method: 'DELETE',
                
            })

            if(response.ok){
                location.href = `home.html`;
                console.log('Se ha eliminado la pelicula correctamente');
            } else {
                console.log('Ha habido un error al eliminar la pelicula');
            }

        
    } catch (error) {
        
    }
}

}