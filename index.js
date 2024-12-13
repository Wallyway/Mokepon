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
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}
//CREANDO SERVIDOR

const app = express()  //copia de la instancia

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


//escuchar peticiones de los usuarios
app.listen(8080, () =>{
    console.log("---------------SERVER-----------------");
    
})
