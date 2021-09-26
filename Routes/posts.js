const router= require("express").Router()
const User= require ("../Models/User")
const Post= require ("../Models/Post")

///CRUD
router.post("/", async(req,res)=>{

    const newPost= new Post(req.body);

    try {
        const savePos = await newPost.save();
        res.status(200).json(savePos)

    } catch (error) {
        res.status(500).json(error)
    }

})


//UPDATE
router.put("/:id", async(req,res)=>{
       
        try {
            const postFind = await Post.findById(req.params.id)    
            console.log(postFind.username);

           if (postFind.username === req.body.username) {
               try {
                   //encontrar por id
                   const updatePost= await Post.findByIdAndUpdate(
                       req.params.id,
                    {
                        //cambiar por lo que este en el req.body   
                        $set:req.body
                    },
                        { new:true}
                    )
                
                   return res.status(200).json(updatePost)

               } catch (error) {
                    res.status(401).json({mensaje:"No encontrado el post" })
               }
           } else {
               res.status(401).json({
                   mensaje:"Solo puedes actualizar tus posts"
               })
           }

        } catch (error) {
            res.status(500).json(error)
        }
})



router.delete("/:id", async(req,res)=>{
    try {
        const postFind = await Post.findById(req.params.id)    
        console.log(postFind.username);

       if (postFind.username === req.body.username) {
           try {
               //encontrar por id
               await Post.findOneAndDelete(req.params.id)
            
               return res.status(200).json({
                   mensaje:"Post eliminado con exito"
               })

           } catch (error) {
                res.status(401).json({mensaje:"No encontrado el post" })
           }
       } else {
           res.status(401).json({
               mensaje:"Solo puedes eliminar tus posts"
           })
       }

    } catch (error) {
        res.status(500).json(error)
    }
})

//get usuario
router.get("/:id", async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.id)

        !post && res.status(200).json({mensaje:"No existen post"})

        post && res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error)
    }
} )

//all post
router.get("/", async(req,res)=>{

    const username= req.query.user;
    const catName= req.query.cat;


    try {
        
        let posts;
       if (username) {
           posts=await Post.find({
               username:username
           })
       }else if(catName){
        posts=await Post.find({
            categories:{
                $in:[catName]
            }
        })
       }else{

        //son condiciones es decir todos
           posts=await Post.find()
        //    console.log(posts);

       }

       res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({mensaje:error})
    }
} )


module.exports=router
