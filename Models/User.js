const mongoose= require('mongoose')

//crear usuario

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true}
);

//exportamos
module.exports= mongoose.model("User",UserSchema)
