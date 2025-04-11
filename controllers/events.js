
const response = require('express');
const Evento = require('../models/Events');

const getEvents = async(req, res = response) => {

    const events = await Evento.find()
                               .populate('user', 'name');
    res.json({
        ok:true,
        msg:events
    })
}
const createEvent = async(req, res = response) => {

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventSave = await evento.save();
        res.json({
            ok:true,
            evento:eventSave
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error
        });
    }
}
const updateEvent = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        let event = await Evento.findById(id);
        
        if (!event) return res.status(400).json({ok:false, msg:`evento ${id} inexistente`})

        if (event.user.toString() !== uid) return res.status(401).json({ok:false, msg:`No tiene privilegio de modificar`})

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(id, newEvent, {new: true});
        res.json({
            ok:true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error
        });
    }
}
const deleteEvent = async(req, res = response) => {
    
    try {
        const id = req.params.id;
        const uid = req.uid;

        let event = await Evento.findById(id);

        if (!event) return res.status(400).json({ok:false, msg:`evento ${id} inexistente`})
        if (event.user.toString() !== uid) return res.status(401).json({ok:false, msg:`No tiene privilegio de modificar`})
        
        const eventoEliminado = await Evento.findByIdAndDelete(id);
        res.json({
            ok:true,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}