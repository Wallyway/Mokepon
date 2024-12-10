const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonAgua = document.getElementById('boton-agua')
const botonFuego = document.getElementById('boton-fuego')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')

const inputHipodoge = document.getElementById('hipodoge')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, gif, vida){
        this.nombre = nombre
        this.gif = gif
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/pokemon-1.gif', 5)
let capipepo = new Mokepon('Capipepo', './assets/pokemon-2.gif', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/pokemon-3.gif', 5)

hipodoge.ataques.push(
    {tipo: 'Agua', id: 'boton-agua'},
    {tipo: 'Agua', id: 'boton-agua'},
    {tipo: 'Agua', id: 'boton-agua'},
    {tipo: 'Fuego', id: 'boton-fuego'},
    {tipo: 'Tierra', id: 'boton-tierra'},
)
capipepo.ataques.push(
    {tipo: 'Tierra', id: 'boton-tierra'},
    {tipo: 'Tierra', id: 'boton-tierra'},
    {tipo: 'Tierra', id: 'boton-tierra'},
    {tipo: 'Agua', id: 'boton-agua'},
    {tipo: 'fuego', id: 'boton-fuego'},
)
ratigueya.ataques.push(
    {tipo: 'Fuego', id: 'boton-fuego'},
    {tipo: 'Fuego', id: 'boton-fuego'},
    {tipo: 'Fuego', id: 'boton-fuego'},
    {tipo: 'Agua', id: 'boton-agua'},
    {tipo: 'tierra', id: 'boton-tierra'},
)
mokepones.push(hipodoge,capipepo,ratigueya)


document.addEventListener('DOMContentLoaded', (event) => {
    
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        //template literario
        opcionDeMokepones = 2
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonMascotaJugador.style.display = 'none'

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)

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

                setTimeout(() => {
                    // Cambiar la imagen de la Pokeball a un GIF específico
                    
                    const selectedPokeball =  this.getAttribute('for');
                    document.getElementById(inputId).checked = true;
                    
                    if(selectedPokeball){
                        if (inputId === 'hipodoge') {
                            document.getElementById('subtitle').style.display = 'none';
                            document.getElementById('pokemon-subtitle').innerHTML = 'Hipodoge'
                            document.getElementById('pokemon-subtitle').style.display = 'block';
                            document.getElementById('pokeball-container').style.display = 'none';
                            pokeball.classList.add('hidden');
                            document.getElementById('hipodoge-img').style.display = 'flex'

                        } else if (inputId === 'capipepo') {
                            document.getElementById('subtitle').style.display = 'none';
                            document.getElementById('pokemon-subtitle').innerHTML = 'Capipepo'
                            document.getElementById('pokemon-subtitle').style.display = 'block';
                            document.getElementById('pokeball-container').style.display = 'none';
                            pokeball.classList.add('hidden');
                            document.getElementById('capipepo-img').style.display = 'block' // Ruta del GIF de Capipepo
                        } else if (inputId === 'ratigueya') {
                            document.getElementById('subtitle').style.display = 'none';
                            document.getElementById('pokemon-subtitle').innerHTML = 'Ratigueya'
                            document.getElementById('pokemon-subtitle').style.display = 'block';
                            document.getElementById('pokeball-container').style.display = 'none';
                            pokeball.classList.add('hidden');
                            document.getElementById('ratigueya-img').style.display = 'block' // Ruta del GIF de Ratigueya
                        }
                    }else{
                        console.error('No pokemon image found for the selected radio input')
                    }    

                    
                    
                },10);
            }, 90); // Adjust timing as needed

            document.getElementById('boton-github').style.display = 'none'
            document.getElementById('boton-mascota').style.display = 'block'
        });
    });
    
    //Seleccion Mascotas
    function seleccionarMascotaJugador() {
        
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
        sectionSeleccionarAtaque.style.display= 'flex'
        
        seleccionarMascotaEnemigo()

    }

    function seleccionarMascotaEnemigo(){
        let mascotaAleatoria = aleatorio(1,3)
        
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
        ataqueEnemigoAleatorio()
    }

    function ataqueAgua(){
        ataqueJugador = 'AGUA'  
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

        let nuevoAtaqueDelJugador = document.createElement('p')
        let nuevoAtaqueDelEnemigo = document.createElement('p')

        sectionMensajes.innerHTML = resultado
        nuevoAtaqueDelJugador.innerHTML = ataqueJugador
        nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

        ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
        ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

    }

    function crearMensajeFinal(resultadoFinal){

        sectionMensajes.innerHTML = resultadoFinal

        botonFuego.disabled=true
        botonAgua.disabled=true
        botonTierra.disabled=true

        botonReiniciar.style.display = 'block'
    }

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }


    function reiniciarJuego(){
        location.reload()
    }

});



