const mongoose = require("mongoose")

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title   : {type:String,required:true},
    content : {type:String,required:true},
    /*user_id : {type:String,required:true}*/
    image:{type: String , required:true},
    writer: {type: String, required:true}
    

},{timestamps : true})


const Blog = mongoose.model('blog',blogSchema)
module.exports = Blog