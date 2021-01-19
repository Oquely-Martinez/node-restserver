
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//const { delete } = require('../routes/usuario');


let rolesValidos = {
    values:['ADMIN_ROLE', 'SUPER_ADMIN_ROLE'],
    message: '{VALUE} No es un rol valido de usuario'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "Es necesario un nombre de usuario"]
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Es obligatorio ingresar el email']
    },
    password: {
        type: String,
        required: [true, 'Es necesario un password de usuario']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum:rolesValidos
    },
    estado:{
        type: Boolean,
        default: true

    },
    google:{

        type: Boolean,
        default: false

    }

});

usuarioSchema.methods.toJSON = function (){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin( uniqueValidator, {message: '{PATH} Ya esta registrado en el sistema'})

module.exports = mongoose.model('Usuario', usuarioSchema);