const mongoose= require('mongoose')

//crear usuario

const CategorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    
   
},{timestamps:true}
);

//exportamos
module.exports= mongoose.model("Category",CategorySchema)
