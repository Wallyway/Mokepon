
const express = require("express")

//CREANDO SERVIDOR

const app = express()  //copia de la instancia

//cada que se solicite un recurso, hacer algo
// '/' significa la raiz
app.get("/", (req, res) => {
    res.send("hola")
})


//escuchar peticiones de los usuarios
app.listen(8080, () =>{
    console.log("---------------SERVER-----------------");
    
})
