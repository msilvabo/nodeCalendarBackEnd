const {Router} = require('express');
const { getEvents, createEvent, updateEvent,deleteEvent } = require('../controllers/events');
const router = Router();

const {validarJWT} = require('../middlewares/validar_jwt');
const {check} = require('express-validator');
const {fieldValidator} = require('../middlewares/fieldValidator');
const { isDate } = require('../helpers/isDate');

router.get('/', validarJWT, getEvents);
router.post(
    '/',
    [
        check('title', 'titulo obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio obligatoria').custom(isDate),
        check('end', 'Fecha final obligatoria').custom(isDate),
        fieldValidator,
        validarJWT
    ],
     createEvent);
router.put('/:id', validarJWT, updateEvent);
router.delete('/:id', validarJWT, deleteEvent);

module.exports = router;