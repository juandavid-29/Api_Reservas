//paquete express
const express = require('express')//npm install express package
const app = express();

//paquete body-parser
const bodyParser = require('body-parser');//npm install body-parser (package) enviar datos 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//PAQUETE MODELO RESERVA(IMPORTAR EL ESQUEMA DESDE EL MODELO )
const ModeloReserva = require('./ModeloReserva');

//paquete de underscore
let under = require('underscore');

//OPERACIONES DEL API(servicios)
//get agregar
app.get('/reservas/:id', (reqpeticion, resrespuesta) => {
    //1. recibir el id del documento a buscar en la coleccion
    let identificador = reqpeticion.params.id;
    //2. ejecutar la opracion de mongoose para buscar un documento por id
    ModeloReserva.findById(identificador, (err, resultado) => {
        if (err) {
            resrespuesta.status(400).json({
                mensaje: err,
                estado: false
            })

        } else {
            resrespuesta.json({
                reserva: resultado
            })
        }
    });

});
//post guardar datos 
app.post('/reservas', (reqpeticion, resrespuesta) => {

    //se traen los datos desde el cliente
    let datos = reqpeticion.body;

    //armo un objeto acorde a mi esquema
    let reservaGuardar = new ModeloReserva({
        nombre: datos.nombre,
        Apellido_Cliente: datos.Apellido_Cliente,
        Telefono_Cliente: datos.Telefono_Cliente,
        Fecha_Inicio_Reserva: datos.Fecha_Inicio_Reserva,
        Fecha_Final_Reserva: datos.Fecha_Final_Reserva,
        Numero_de_personas: datos.Numero_de_personas,
        Tipo_paquete: datos.Tipo_paquete


    });

    reservaGuardar.save((err, resultado) => {

        if (err) {
            resrespuesta.status(400).json({
                mensaje: err,
                estado: false
            })

        } else {
            resrespuesta.json({
                mensaje: 'reserva agregada con exito'
            })
        }

    });
});
//put actualizar
app.put('/reservas/:id', (reqpeticion, resrespuesta) => {

    //1. recibir los datos que voy actualizar
    let datos = reqpeticion.body;
    //2. filtrar los datos con underscore(_)
    let datosActualizar = under.pick(datos, ["Telefono_Cliente", "Numero_de_personas"])
    //3. recibir id o identificador del documento a actualizar
    let identificador = reqpeticion.params.id;
    //4. ejecutar la opracion para actualizar datos(1.id a actualizar 2.datos a actualizar 3. callback para manejo de error)
    ModeloReserva.findByIdAndUpdate(identificador, datosActualizar, (err, resultado) => {
        if (err) {
            resrespuesta.status(400).json({
                mensaje: err,
                estado: false
            });
        } else {

            resrespuesta.json({
                mensaje: 'reserva editado con exito'
            })
        }

    });

});
//delete eliminar
app.delete('/reservas/:id', (reqpeticion, resrespuesta) => {
    //1.recibir el id del documento a eliminar
    let identificador = reqpeticion.params.id;
    //2. ejecutar la funcion de mongoose para eliminar un documento de una coleccion 
    ModeloReserva.findByIdAndRemove(identificador,(err,resultado)=>{
        if(err){
            resrespuesta.status(400).json({
            mensaje: err,
            estado: false
            });
        }else{
            resrespuesta.json({
                mensaje:"reserva eliminada con exito de la bd"
            });
        }
    });
})

module.exports = app;