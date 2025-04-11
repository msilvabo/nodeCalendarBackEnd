 
 const express = require('express');
 require('dotenv').config();
 const cors = require('cors');
 const {dbConnection} = require('./database/config');


 //CREAR SERVIDOR EXPRESS
    const app = express();

// BASE DE DATOS
    dbConnection();

// CORS
    app.use(cors());

// DIRECTORIO PUBLICO
    app.use(express.static('public'));

// LECTURA Y PARSEO DEL BODY
    app.use(express.json());

// RUTAS
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/event', require('./routes/events'));
 //todo   auth   crear, login, renew
 //todo   crud   Eventos

//ESCUCHAR PETICIONES
    app.listen(process.env.PORT, () => {
        console.log(`Servidor corriendo puerto ${process.env.PORT}`);
        
    });
