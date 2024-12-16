const express = require("express")
const cors = require("cors")


const jugadores = []

class Jugador {
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x,y){
        this.x = x
        this.y= y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}
//CREANDO SERVIDOR

const app = express()  //copia de la instancia

app.use(express.static('public'))    //Servir en una url archivos estaticos
app.use(cors())
app.use(express.json())

//cada que se solicite un recurso, hacer algo
// '/' significa la raiz
app.get("/join", (req, res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

//Impimir lista Jugadores
app.post("/mokepon/:jugadorId", (req,res) => {
    const jugadorId = req.params.jugadorId
    const nombre = req.body.mokepon
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >=0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})


app.post("/mokepon/:jugadorId/posicion", (req,res) =>{
    const jugadorId = req.params.jugadorId
    const x = req.body.x
    const y = req.body.y

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >=0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/mokepon/:jugadorId/ataques", (req,res) => {
    const jugadorId = req.params.jugadorId
    const ataques = req.body.ataques
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >=0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }

    res.end()
})

app.get("/mokepon/:jugadorId/ataques", (req,res) => {
    const jugadorId = req.params.jugadorId
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)

    res.send({
        ataques: jugador.ataques
    })
})


//escuchar peticiones de los usuarios
app.listen(8080, () =>{
    console.log("---------------SERVER-----------------");
    
})
