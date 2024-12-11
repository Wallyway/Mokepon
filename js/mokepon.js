const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')

const subtitulo = document.getElementById('subtitle')
const subtituloMokepon = document.getElementById('pokemon-subtitle')

const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorMokepones = document.getElementById('mokepones')
const contenedorAtaques = document.getElementById('ataques-container')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo
let opcionDeMokepones
let inputHipodoge
let inputCapipepo 
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let botonAgua 
let botonFuego
let botonTierra 
let botones = []
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, gif, vida, pokeball){
        this.nombre = nombre
        this.gif = gif
        this.vida = vida
        this.pokeball = pokeball
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/pokemon-1.gif', 5, 'pokeball-1')
let capipepo = new Mokepon('Capipepo', './assets/pokemon-2.gif', 5, 'pokeball-2')
let ratigueya = new Mokepon('Ratigueya', './assets/pokemon-3.gif', 5,'pokeball-3')

hipodoge.ataques.push(
    {tipo: '💧', id: 'boton-agua'},
    {tipo: '💧', id: 'boton-agua'},
    {tipo: '💧', id: 'boton-agua'},
    {tipo: '🔥', id: 'boton-fuego'},
    {tipo: '🌱', id: 'boton-tierra'},
)
capipepo.ataques.push(
    {tipo: '🌱', id: 'boton-tierra'},
    {tipo: '🌱', id: 'boton-tierra'},
    {tipo: '🌱', id: 'boton-tierra'},
    {tipo: '💧', id: 'boton-agua'},
    {tipo: '🔥', id: 'boton-fuego'},
)
ratigueya.ataques.push(
    {tipo: '🔥', id: 'boton-fuego'},
    {tipo: '🔥', id: 'boton-fuego'},
    {tipo: '🔥', id: 'boton-fuego'},
    {tipo: '💧', id: 'boton-agua'},
    {tipo: '🌱', id: 'boton-tierra'},
)
mokepones.push(hipodoge,capipepo,ratigueya)


document.addEventListener('DOMContentLoaded', (event) => {
    
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        //template literario
        opcionDeMokepones = `
            <input type="radio" name="mascota" id="${mokepon.nombre}" />
            <label class="pokeball" for="${mokepon.nombre}">
                <img src="./assets/pokeball-closed.png" alt="${mokepon.nombre}" class="pokeball-img" id="${mokepon.pokeball}">
                <img src="${mokepon.gif}" alt="${mokepon.nombre}" id="${mokepon.nombre}-img" style='display: none;'> </img>
            </label>
            `
        contenedorMokepones.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonMascotaJugador.style.display = 'none'


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
                        if (inputId === 'Hipodoge') {
                            subtitulo.innerHTML = inputId
                            document.getElementById('pokeball-1').style.display = 'none'
                            document.getElementById('Hipodoge-img').style.display = 'block';

                        } else if (inputId === 'Capipepo') {
                            subtitulo.innerHTML = inputId
                            document.getElementById('pokeball-2').style.display = 'none'
                            document.getElementById('Capipepo-img').style.display = 'block' // Ruta del GIF de Capipepo
                            
                        } else if (inputId === 'Ratigueya') {
                            subtitulo.innerHTML = inputId
                            document.getElementById('pokeball-3').style.display = 'none'
                            document.getElementById('Ratigueya-img').style.display = 'block' // Ruta del GIF de Ratigueya
                            
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
            spanMascotaJugador.innerHTML = inputHipodoge.id   //Una sola fuente de verdad
            mascotaJugador = inputHipodoge.id
        } else if (inputCapipepo.checked) {
            spanMascotaJugador.innerHTML = inputCapipepo.id
            mascotaJugador = inputCapipepo.id
        } else if (inputRatigueya.checked) {
            spanMascotaJugador.innerHTML = inputRatigueya.id
            mascotaJugador = inputRatigueya.id
        } else {
            alert('Selecciona una mascota')
            reload()
        }

        document.getElementById('seleccionar-mascota').style.display = 'none'
        sectionSeleccionarAtaque.style.display= 'flex'
        
        extraerAtaques(mascotaJugador)
        seleccionarMascotaEnemigo()
    }

    function extraerAtaques(mascotaJugador){
        let ataques
        for (let i = 0; i < mokepones.length; i++) {
            if(mascotaJugador === mokepones[i].nombre){
                ataques =  mokepones[i].ataques
            }
        }
        mostrarAtaques(ataques)

    }

    function mostrarAtaques(ataques){
        ataques.forEach((ataque) => {
            ataquesMokepon = `
                <button id="${ataque.id}" class="boton-de-ataque BAtaque">${ataque.tipo}</button>
            `
            contenedorAtaques.innerHTML += ataquesMokepon
        })

        botonAgua = document.getElementById('boton-agua')
        botonFuego = document.getElementById('boton-fuego')
        botonTierra = document.getElementById('boton-tierra')
        botones = document.querySelectorAll('.BAtaque')
    }

    function secuenciaAtaque(){
        botones.forEach((boton) => {
            boton.addEventListener('click', (e) => {
               if(e.target.textContent === '🔥') {
                    ataqueJugador.push('FUEGO')
                    console.log(ataqueJugador)
                    boton.style.background = '#fff'
               }else if(e.target.textContent === '💧') {
                    ataqueJugador.push('AGUA')
                    console.log(ataqueJugador)
                    boton.style.background = '#fff' 
               }else{
                    ataqueJugador.push('TIERRA')
                    console.log(ataqueJugador)
                    boton.style.background = '#fff' 
               }
                
            })
        })
    }

    function seleccionarMascotaEnemigo(){
        let mascotaAleatoria = aleatorio(1, mokepones.length -1)     
        spanMascotaEnemigo.innerHTML= mokepones[mascotaAleatoria].nombre
        secuenciaAtaque()
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



