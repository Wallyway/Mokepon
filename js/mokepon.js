let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3
document.addEventListener('DOMContentLoaded', (event) => {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonMascotaJugador.style.display = 'none'

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
    botonReiniciar.style.display = 'none'

    

    document.querySelectorAll('.pokeball').forEach(pokeball => {
        pokeball.addEventListener('click', function() {
            const inputId = this.getAttribute('for');
            document.getElementById(inputId).checked = true;

            const img = this.querySelector('.pokeball-img');
            img.src = './assets/pokeball-opening-1.png';
            img.style.animation = 'open 0.5s forwards';

            

            setTimeout(() => {
                img.src = './assets/pokeball-opening-2.png';
                // Hide other Pokeballs
                document.querySelectorAll('.pokeball').forEach(otherPokeball => {
                    if (otherPokeball !== pokeball) {
                        otherPokeball.classList.add('hidden');
                    }else{
                        pokeball.classList.add('centered'); 
                    }
                });

                //FIXME:Implement gifs to pokemons
                setTimeout(() => {
                    // Cambiar la imagen de la Pokeball a un GIF específico
                    const selectedPokeball = document.querySelector('.pokeball input[type="radio"]:checked + img');
                    if (inputId === 'hipodoge') {
                        selectedPokeball.src = '"C://Users//jseba//OneDrive//Imágenes//Capturas de pantalla//avatar (1).jpg"'; // Ruta del GIF de Hipodoge
                    } else if (inputId === 'capipepo') {
                        selectedPokeball.src = './assets/capipepo.gif'; // Ruta del GIF de Capipepo
                    } else if (inputId === 'ratigueya') {
                        selectedPokeball.src = './assets/ratigueya.gif'; // Ruta del GIF de Ratigueya
                    }
                    
                    
                },10);
            }, 90); // Adjust timing as needed

            document.getElementById('boton-github').style.display = 'none'
            document.getElementById('boton-mascota').style.display = 'block'
            
        });
    });
    
    //Seleccion Mascotas
    function seleccionarMascotaJugador() {

        let inputHipodoge = document.getElementById('hipodoge')
        let inputCapipepo = document.getElementById('capipepo')
        let inputRatigueya = document.getElementById('ratigueya')
        let spanMascotaJugador = document.getElementById('mascota-jugador')
        
        if (inputHipodoge.checked) {
            spanMascotaJugador.innerHTML = 'Hipodoge'
        } else if (inputCapipepo.checked) {
            spanMascotaJugador.innerHTML = 'Capipepo'
        } else if (inputRatigueya.checked) {
            spanMascotaJugador.innerHTML = 'Ratigueya'
        } else {
            alert('Selecciona una mascota')
            reload()
        }

        document.getElementById('seleccionar-mascota').style.display = 'none'
        document.getElementById('seleccionar-ataque').style.display = 'block'
        
        seleccionarMascotaEnemigo()

    }

    function seleccionarMascotaEnemigo(){
        let mascotaAleatoria = aleatorio(1,3)
        let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

        if(mascotaAleatoria == 1){
            //Hipodoge
            spanMascotaEnemigo.innerHTML = 'Hipodoge'

        }else if (mascotaAleatoria == 2){
            //Capipepo
            spanMascotaEnemigo.innerHTML = 'Capipepo'
        }else{
            //Ratigueya
            spanMascotaEnemigo.innerHTML = 'Ratigueya'
        }
    }

    // Ataques
    function ataqueFuego(){
        ataqueJugador = 'FUEGO'   
        document.getElementById('boton-mascota').disabled=true
        ataqueEnemigoAleatorio()

    }

    function ataqueAgua(){
        ataqueJugador = 'AGUA'  
        document.getElementById('boton-mascota').disabled=true

        ataqueEnemigoAleatorio()
    }

    function ataqueTierra(){
        ataqueJugador = 'TIERRA' 
        ataqueEnemigoAleatorio()
    }

    function ataqueEnemigoAleatorio(){
        let ataqueAleatorio = aleatorio(1,3)

        if(ataqueAleatorio == 1){
            
            ataqueEnemigo = 'FUEGO'

        }else if (ataqueAleatorio == 2){
            ataqueEnemigo = 'AGUA'

        }else{
            
            ataqueEnemigo = 'TIERRA'
        }
        
        ganador()
    }


    function ganador(){

        let spanVidasJugador = document.getElementById('vidas-jugador')
        let spanVidasEnemigo = document.getElementById('vidas-enemigo')

        if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA'){
            
            crearMensaje("GANASTE")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML= vidasEnemigo
            

        }else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO'){

            crearMensaje("GANASTE")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML= vidasEnemigo
            
        }else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){
            crearMensaje("GANASTE")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML= vidasEnemigo

        }else if(ataqueJugador==ataqueEnemigo){
            crearMensaje("EMPATE :)")
        }else{
            crearMensaje("PERDISTE :(")
            vidasJugador--
            spanVidasJugador.innerHTML= vidasJugador
        }

        revisarVidas()
    }

    function revisarVidas(){
        
        if (vidasEnemigo ==0){
            alert("GANASTE!!!")
            crearMensajeFinal("GANASTE LA BATALLA")


        }else if(vidasJugador==0){
            alert("PERDISTE")
            crearMensajeFinal("PERDISTE LA BATALLA")
        }
    }


    function crearMensaje(resultado){

        let sectionMensajes = document.getElementById('mensajes')

        let newP = document.createElement('p')
        newP.innerHTML = 'Tu mascota atacó con '+ ataqueJugador + ' la mascota del enemigo atacó con '+ ataqueEnemigo + ' - '+ resultado +'🎉'

        sectionMensajes.appendChild(newP)

    }

    function crearMensajeFinal(resultadoFinal){

        let sectionMensajes = document.getElementById('mensajes')

        let newP = document.createElement('p')
        newP.innerHTML = resultadoFinal+' 🎉'

        sectionMensajes.appendChild(newP)

        document.getElementById('boton-fuego').disabled=true
        document.getElementById('boton-agua').disabled=true
        document.getElementById('boton-tierra').disabled=true

        document.getElementById('boton-reiniciar').style.display = 'block'

    }

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }


    function reiniciarJuego(){
        location.reload()
    }



    // window.addEventListener('load', iniciarJuego)
    
});



