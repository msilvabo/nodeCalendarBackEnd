 
 const express = require('express');
 require('dotenv').config();

//  console.log(process.env);

 //CREAR SERVIDOR EXPRESS
    const app = express();


// DIRECTORIO PUBLICO
    app.use(express.static('public'));

// LECTURA Y PARSEO DEL BODY
    app.use(express.json());

// RUTAS
    app.use('/api/auth', require('./routes/auth'));
 //todo   auth   crear, login, renew
 //todo   crud   Eventos

//ESCUCHAR PETICIONES
    app.listen(process.env.PORT, () => {
        console.log(`Servidor corriendo puerto ${process.env.PORT}`);
        
    });
