
const {response} = require('express');
const Usuario = require('../models/Users');
const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {
    const {name , email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});
        if (usuario){
            return res.status(400).json({
                ok:false,
                msg: `el usuario con correo ${email} ya existe`
            })
        }
        
        usuario = new Usuario(req.body);
        await usuario.save();
        
        // Generar JWT
        const token = await generateJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name, 
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.errorResponse.errmsg
        });
    }
}

const loginUsuario = async(req, res= response) => {
    const {email, password} = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(400).json({ok: false, msg:`${email} Correo inexistente `})
        }
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({ok: false, msg:'Password incorrecto'})
        }

        const token = await generateJWT(usuario.id, usuario.name);
        
        res.json({
        ok:true,
        UID:usuario.id,
        name:usuario.name, 
        token
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error de consulta'
        });
    }
 }

 const revalidarToken = async(req, res = response) => {

    const {uid, name} = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok:true,
        uid,
        name,
        token
    })
 } 

 module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    }