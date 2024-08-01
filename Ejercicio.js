/**const cargarPeliculas = async () => {
    try{
        const respuesta = await fetch('https://api.themoviedb.org/3/movie/500?api_key=6645d72e44308dec415e7475472659b5');
        if (!respuesta.ok){
            throw new Error('Network response was not ok ' + respuesta.statusText);
        }
        const datos = await respuesta.json();
        console.log(datos);
    }catch (error){
        console.error('Hubo un problema con la solicitud Fletch', error);
    }
}
cargarPeliculas() */

let pagina = 1;
constbtnAnterior = document.getElementById("btnAnterior");
constbtnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener("click", () => {
    if(pagina < 1){
        pagina -= 1;
        cargarPeliculas();
    }
});
const cargarPeliculas = async() => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/500?api_key=6645d72e44308dec415e7475472659b5${pagina}`)
        console.log(respuesta);
        if(respuesta.status === 200){
            const datos = await respuesta.json();

            let peliculas = "";
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class= "pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h3 class= "titulo>${pelicula.title}</h3>
                </div>
                `;        
            });
            document.getElementById("container").innerHTML = peliculas;
        } else if(respuesta.status === 401){
            console.log("Pusiste la llave mal");
        }else if(respuesta.status===404){

            console.log("La pelicula que buscas no existe");
        }else {
            console.log("Hubo un error y no sabemos que pasó")
        }
    } catch (error) {
        console.log(error)
    }
    
}
cargarPeliculas()