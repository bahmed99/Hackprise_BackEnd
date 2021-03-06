
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
        type: String
        
        
    },
    email2 :{
        type: String
    },
    tel2:{
        type: String
    },
    profession2:{
        type:String
    },
    Etablissement2:{
        type:String
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
    done:{
        type : Boolean,
        default:false 
    }
}, { timestamps: true })


const register = mongoose.model('Inscription_Hackathon_Stb', registerSchema);
module.exports = register

//     {
//         nom2: String ,
//         prenom2:String ,
//         email2:String 
//     },
//     {
//         nom3: String ,
//         prenom3:String ,
//         email3:String 
//     },
//     {
//         nom4: String ,
//         prenom4:String ,
//         email4:String ,
        
//     },
//     {
//         nom5: String ,
//         prenom5:String ,
//         email5:String ,
        
//     }
// ]
