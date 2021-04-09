const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExpositioSchema = new Schema({
    nom: {
        type: String,
        required: true 
        
    },
    image :{
        type: String,
        required: true 
    },
    description:{
        type: String,
        required: true 
    }
}, { timestamps: true })

const register = mongoose.model('Exposition', ExpositioSchema);
module.exports = register