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

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
// const miMokepon = obtenerObjetoMascota()

const audio = document.getElementById('audio')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo 
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonAgua 
let botonFuego
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let lienzo = mapa.getContext("2d")
let mapaBackground = new Image()
mapaBackground.src = './assets/maps/map_night_4.png'
let intervalo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, gif, vida, pokeball, x , y){
        this.nombre = nombre
        this.gif = gif
        this.vida = vida
        this.pokeball = pokeball
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 40
        this.mapaFoto = new Image()
        this.mapaFoto.src = gif
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/pokemon-1.gif', 5, 'pokeball-1',20,70)
let capipepo = new Mokepon('Capipepo', './assets/pokemon-2.gif', 5, 'pokeball-2',20,70)
let ratigueya = new Mokepon('Ratigueya', './assets/pokemon-3.gif', 5,'pokeball-3',20,70)

let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/pokemon-1.gif', 5, 'pokeball-1', 340, 210)
let capipepoEnemigo = new Mokepon('Capipepo', './assets/pokemon-2.gif', 5, 'pokeball-2', 290, 95)
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/pokemon-3.gif', 5,'pokeball-3', 85, 200)

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

    audio.volume = 0.05;
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

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
       
        
        
       
        //sectionSeleccionarAtaque.style.display= 'flex'
        
        extraerAtaques(mascotaJugador)
        sectionVerMapa.style.display = 'flex'
        seleccionarMascotaEnemigo()
        iniciarMapa()
        
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
                    boton.disabled = true
               }else if(e.target.textContent === '💧') {
                    ataqueJugador.push('AGUA')
                    console.log(ataqueJugador)
                    boton.style.background = '#fff' 
                    boton.disabled = true
               }else{
                    ataqueJugador.push('TIERRA')
                    console.log(ataqueJugador)
                    boton.style.background = '#fff' 
                    boton.disabled = true
               }
               ataqueEnemigoAleatorio()
                
            })
        })

        
    }

    function seleccionarMascotaEnemigo(){
        let mascotaAleatoria = aleatorio(0, mokepones.length -1)     
        spanMascotaEnemigo.innerHTML= mokepones[mascotaAleatoria].nombre
        ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
        secuenciaAtaque()
    }


    function ataqueEnemigoAleatorio(){
        let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1)

        if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
            ataqueEnemigo.push('FUEGO')
        }else if (ataqueAleatorio == 2 || ataqueAleatorio == 4){
            ataqueEnemigo.push('AGUA')
        }else{
            ataqueEnemigo.push('TIERRA')
        }

        console.log(ataqueEnemigo)
        iniciarPelea()
    }

    function iniciarPelea(){
        if (ataqueJugador.length === 5){
            combate()
        }
    }

    function indexAmbosOponentes(jugador, enemigo){
        indexAtaqueJugador = ataqueJugador[jugador]
        indexAtaqueEnemigo = ataqueEnemigo[enemigo]
    }

    function combate(){

        for (let i = 0; i < ataqueJugador.length; i++) {
            if (ataqueJugador[i] === ataqueEnemigo[i]) {
                indexAmbosOponentes(i, i)
                crearMensaje("EMPATE")
            }
            else if(ataqueJugador[i] == 'FUEGO' && ataqueEnemigo[i] == 'TIERRA'){
                indexAmbosOponentes(i, i)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }else if (ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO'){
                indexAmbosOponentes(i,i)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }else if (ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA'){
                indexAmbosOponentes(i,i)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }else {
                indexAmbosOponentes(i,i)
                crearMensaje("PERDISTE")
                victoriasEnemigo++
                spanVidasEnemigo.innerHTML = victoriasEnemigo
            }
            
        }


        revisarVidas()
    }

    function revisarVidas(){
        
        if (victoriasJugador === victoriasEnemigo){
            crearMensajeFinal("Esto fue un empate")
        }else if(victoriasJugador > victoriasEnemigo){
            crearMensajeFinal("Has ganado!")
        }else{
            crearMensajeFinal("Has perdido")
        }
    }


    function crearMensaje(resultado){

        let nuevoAtaqueDelJugador = document.createElement('p')
        let nuevoAtaqueDelEnemigo = document.createElement('p')

        sectionMensajes.innerHTML = resultado
        nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
        nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

        ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
        ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

    }

    function crearMensajeFinal(resultadoFinal){

        sectionMensajes.innerHTML = resultadoFinal
        botonReiniciar.style.display = 'block'
    }

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    function reiniciarJuego(){
        location.reload()
    }

   
    

});

function pintarCanvas(){

    mascotaJugadorObjeto.x=mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y=mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()


    
}

function moverDer(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzq(){
    mascotaJugadorObjeto.velocidadX = -5

}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function keyPressed(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzq()
            break
        case 'ArrowRight':
            moverDer()
            break;
        default:
            console.log ("Invalid Key")
            break;
    }
}

function iniciarMapa(){
    mapa.width = 400
    mapa.height = 260
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
   
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown',keyPressed)
    window.addEventListener('keyup' ,detenerMovimiento)

}

    function obtenerObjetoMascota() {
        for (let i = 0; i < mokepones.length; i++) {
            if(mascotaJugador === mokepones[i].nombre){
                return mokepones[i]
            }
        }
    }





