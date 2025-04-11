
// rutas de usuario Auth
// host + '/api/auth'

const {Router} = require('express');
const router = Router() ;

const {check} = require('express-validator');
const {fieldValidator} = require('../middlewares/fieldValidator')

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar_jwt');

 router.post(
        '/new',
        [
            check('name', 'name obligatorio').not().isEmpty(),
            check('email', 'email obligatorio').isEmail(),
            check('password', 'password debe tener por lo menos 5 caracteres').isLength({ min:5 }),
            fieldValidator
        ],
        crearUsuario );

 router.post(
        '/', 
        [
            check('email', 'email obligatorio').isEmail(),
            check('password', 'password debe tener por lo menos 5 caracteres').isLength({ min:5 }),
            fieldValidator
        ],
        loginUsuario );

 router.get(
        '/renew',
        validarJWT,
        revalidarToken
    );

module.exports = router;
