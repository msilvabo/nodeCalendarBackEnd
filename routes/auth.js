
// rutas de usuario Auth
// host + '/api/auth'

const {Router} = require('express');
const {check} = require('express-validator');
const {fieldValidator} = require('../middlewares/fieldValidator')
const router = Router() ;
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
; 
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

 router.get('/renew', revalidarToken );

module.exports = router;
