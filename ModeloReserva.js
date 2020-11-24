const mongoose = require('mongoose');//npm install mongoose package paquetes

//definir el esquema que tendra nuestra coleccion
let EsquemaReserva = new mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'el nombre de la persona es necesario para realizar la reserva ']
    },
    Apellido_Cliente: {
        type: String,
        required: false
    },
    Telefono_Cliente: {
        type: Number,
        required: false
    },
    Fecha_Inicio_Reserva: {
        type: Number,
        required: false
    },
    Fecha_Final_Reserva: {
        type: Number,
        required: false
    },
    Numero_de_personas: {
        type: Number,
        required: false
    },
    Tipo_paquete: {
        type: String,
        required: [true,'el paquete es necesari para realizar la reserva ']
    }


});

module.exports = mongoose.model('modeloReserva', EsquemaReserva)
