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
    
    SelectEnLigne:{
        type:String
    },
    nom1: {
        type: String,
        required: true 
        
    },
    email1 :{
        type: String,
        required: true 
    },
    tel1:{
        type: String,
        required: true 
    },
    profession1:{
        type:String,
        required: true 
    },
    
    Etablissement1:{
        type:String,
        required: true 
    },
    nom2: {
        type: String,
        required: true 
        
    },
    email2 :{
        type: String,
        required: true 
    },
    tel2:{
        type: String,
        required: true 
    },
    profession2:{
        type:String,
        required: true 
    },
    Etablissement2:{
        type:String,
        required: true 
    },
    nom3: {
        type: String
    },
    email3 :{
        type: String
    },
    tel3:{
        type: String
       
    },
    profession3:{
        type:String
    },
    Etablissement3:{
        type:String
    },
    nom4: {
        type: String
        
    },
    email4 :{
        type: String
    
    },
    tel4:{
        type: String 
    },
    profession4:{
        type:String
    },
    Etablissement4:{
        type:String 
    },
    done :{
        type : Boolean,
        default:false 
    },
    accord:{
        type : Boolean,
    }
}, { timestamps: true })



const register = mongoose.model('Inscription_Hackathon_Infor', registerSchema);
module.exports = register