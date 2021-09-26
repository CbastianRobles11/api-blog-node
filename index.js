
const express = require ('express')
const app= express();
const dotenv= require("dotenv")
const mongoose= require("mongoose");
//para las imagenes
const multer= require("multer")

//traemos las tutas autn
const authRoute= require("./Routes/auth")
const userRoute=require("./Routes/users")
const postRoute= require("./Routes/posts")
const categoryRoute= require("./Routes/categories")

const port = 5001


//funcione valiables de entorno
dotenv.config();
//configurar los json de la api habilitar json de postman
app.use(express.json())

// connect mongo

    mongoose.connect(process.env.MONGO_URL)
    .then(console.log("CONECTECD"))
    .catch(err=> console.log(err))


//tratamiento de imagenes

// const storage= multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"images")
//     },filename:(req,file,cb)=>{
//         cb(null,"hello.jpg")
//     }
// })

// const upload= multer({storage:storage})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      
    //   cb(null, file.fieldname+'-'+Date.now())
    cb(null, req.body.name+'-'+Date.now())

    }
  })
  
const upload = multer({ storage: storage })



app.post("/api/upload",upload.single("file"), (req,res)=>{
    try {
        res.status(200).json("el archivo fue descargado")
    } catch (error) {
        console.log(error);
    }
    
})


app.use("/api/auth",authRoute)

app.use("/api/users",userRoute)

app.use("/api/posts",postRoute)

app.use("/api/categories",categoryRoute)

app.use("/",(req,res)=>{
    res.json({
        memsaje:"Hola"
    })
}) 



 
app.listen(port,()=>{
    console.log("Bckend iest corriendo en el puerto "+port);
})