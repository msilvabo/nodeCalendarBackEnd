const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

// encriptar contraseña
UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = bcrypt.genSaltSync();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
    

module.exports = model('Usuario', UsuarioSchema);