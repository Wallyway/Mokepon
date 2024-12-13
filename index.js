const express = require("express")

const jugadores = []

class Jugador {
    constructor(id){
        this.id = id
    }
}

//CREANDO SERVIDOR

const app = express()  //copia de la instancia

//cada que se solicite un recurso, hacer algo
// '/' significa la raiz
app.get("/join", (req, res) => {
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})


//escuchar peticiones de los usuarios
app.listen(8080, () =>{
    console.log("---------------SERVER-----------------");
    
})
