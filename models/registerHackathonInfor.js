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
    },
    Etablissement:{
        type:String,
        required: true 
    },
    NomEquipe:{
        type:String ,
        required: true 
    },
    
    niveau:{
        type:String ,
        required: true 
    },

    accord :{
        type:Boolean

    },
    nom1: {
        type: String 
    },
    email1 :{
        type: String
    },
    tel1:{
        type: String
    },
    profession1:{
        type:String
    },
    
    Etablissement1:{
        type:String
    
    },
    niveau1:{
        type:String 
    },
    done:{
        type : Boolean,
        default:false 
    }
}, { timestamps: true })



const register = mongoose.model('Inscription_Hackathon_Infor', registerSchema);
module.exports = register