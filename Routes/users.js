const router= require("express").Router()
const User= require ("../Models/User")
const Post= require ("../Models/Post")
const bcrypt= require("bcrypt")

///CRUD


//UPDATE
router.put("/:id", async(req,res)=>{
       
        if(req.body.userId == req.params.id)
        {

            if(req.body.password){
                const salt= await bcrypt.genSalt(10);

                //revisa que ingrese una password y la encripte a la misma
                req.body.password= await bcrypt.hash(req.body.password,salt)

            }

            try {

                const updateUser= await User.findByIdAndUpdate(req.params.id,{
                    //lo cambiamos o actualizamos por lo que esta en body
                    $set:req.body
                })

                res.status(200).json(updateUser)

            } catch (error) {
                res.status(500).json({"ROUTER user put  ":error })
            }
        }else{
            res.status(401).json({
                mensaje:"Tu solo puedes actualizar tu cuenta"
            })
        }
})


router.delete("/:id", async(req,res)=>{
    if(req.body.userId == req.params.id)
    {

       try {
           const user= await User.findById(req.params.id)
           console.log(user);

           try {
               //borar si son iguales username
               await Post.deleteMany({username:user.username})
               await User.findByIdAndDelete(req.params.id)
               res.status(200).json({
                   mensaje:"Usuario Eliminado con exito"
               })
           } catch (error) {
               res.status(500).json({
                   mensaje:error
               })
           }
           
       } catch (error) {
           console.log(error);
           res.status(404).json({
               mensaje:error
           })
       }
    }else{
        res.status(401).json({
            mensaje:"Tu solo puedes borrar tu cuenta"
        })
    }
})

//get usuario
router.get("/:id", async(req,res)=>{
    try {
        
        const user = await User.findById(req.params.id)

        const {password,...others}=user._doc

        res.status(200).json(others)

    } catch (error) {
        res.status(500).json(error)
    }
} )


//DELETE

module.exports=router
