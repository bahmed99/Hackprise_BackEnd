const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    nom: {
        type: String,
        required: true 
        
    },
    email :{
        type: String,
        required: true 
    },
    tel:{
        type: String,
        required: true 
    },
    profession:{
        type:String,
        required: true 
    }
}, { timestamps: true })

const register = mongoose.model('Inscription_Event', registerSchema);
module.exports = register