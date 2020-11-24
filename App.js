const express = require('express')//npm install express package
const app = express();

const bodyParser = require('body-parser');//npm install body-parser (package) enviar datos 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const mongoose = require('mongoose');//npm install mongoose package paquetes bd no relacional

//importemos y usemos app de express
app.use(require('./ControladorReserva'));

//ESTABLESEMOS LA CONECION CON LA BD 
mongoose.connect('mongodb://localhost:27017/bdprueba', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection
    .once('open', () => console.log("estas conectado a la bd"))
    .on('error', (error) => console.log("pilas", error));

//ESTABLECEMOS la CONEXION CON EL SERVIDOR QUE TIENE LOS SERVICIOS
app.listen(3000, () => {
    console.log("Servidor encendido en el puerto 3000");
});