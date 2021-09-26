const mongoose= require('mongoose')

//crear usuario

const PostSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        
    },
    photo:{
        type:String,
        required:false,
       
    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type: Array,
        required:false
        
    }
},{timestamps:true}
);

//exportamos
module.exports= mongoose.model("Post",PostSchema)
