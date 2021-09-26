const router= require("express").Router()
const User= require ("../Models/User")

//para encriptar las cosas
const bcrypt = require('bcrypt');

//Registro
router.post("/register", async(req,res)=>{
        try {

            //encriptar la pass
            const salt = await bcrypt.genSalt(10)
            //hasta 10 veces el cambio, pasando le el salt
            const hashedPass= await  bcrypt.hash(req.body.password,salt)      

            //el usuario devolverra datos que traeremos del cliente
            const newUser= new User({
                username:req.body.username,
                email:req.body.email,
                password:hashedPass
            })

            //save guardar en el moongose
            const user = await newUser.save()

            //y mandaremos una respuesta en json
            res.status(200).json(user)

        } catch (error) {
            res.status(500).json({"ROUTER POST  ":error })
        }
})




//Login
router.post("/login",async (req, res)=>{
    try {
        const user =await User.findOne({
            username:req.body.username
        })  

        //si no existe usuario o password
        !user &&res.status(400).json({
            mensaje:"Error de credenciales aki"
        })

        //compara con el user que traemos de arriba y saca el password
        const validated = await bcrypt.compare(req.body.password,user.password)
        
        //si no existe usuario o password
        !validated &&res.status(400).json({
            mensaje:"Error de credenciales"
        })


        //asi no nos saldra el password , luego de lo demas hecho
        const {password,...others}= user._doc
        //retorne el user
        res.status(200).json(others)




        
        
    } catch (error) {
        console.log(error);
    }
})




module.exports = router