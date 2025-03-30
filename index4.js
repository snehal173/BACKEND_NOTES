
const express=require("express");
const { UserModel, TodoModel } = require("./db");
const app=express();
const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");
JWT_SECRET="SNEHAL"
app.use(express.json());
mongoose.connect("mongodb+srv://snehalmehra017:1EccLLFo4N306Z0x@cluster0.7exjp2p.mongodb.net/");

app.post('/signup', async function(req,res){
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    if(!name || !email || !password){
        return res.status(401).json({
            message:"all fields are required"
        })
    }

    try{
         await UserModel.create({
            name:name,
            email:email,
            password:password
        })
    }catch(error){
        return res.status(400).json({
            message:"user already exists"
        })
    }

    return res.status(200).json({
        message:"user signup",
       
    })
})

app.post('/signin',async function(req,res){
   const email=req.body.email;
   const password=req.body.password;
    const user =await UserModel.findOne({email:email,password:password});

   if(user){

    const token=jwt.sign({
        id:user._id.toString()
    },JWT_SECRET)

    return res.status(200).json({
        message:"user signed in",
        token:token
      })
   }else{
    res.status(403).json({
        message:"invalid credentials"
    })
   }
   
   

})

async function authMiddleware(req,res,next){
    const token=req.headers.token;
    console.log(token);
    const decode=jwt.verify(token,JWT_SECRET);
    console.log(decode);
    const userid=decode.id;

    const user=await UserModel.findById(userid);
    if(!user){
        return res.status(401).json({
            message:"user donot exist"
        })
    }
    req.user=user;
    next();

}

app.post('/todo',authMiddleware,async function(req,res){
    const user=req.user;
    const title=req.body.title;
    const description=req.body.description;
    const done=req.body.done;

    const todo= await TodoModel.create({
       title:title,
       description:description,
       done:done,
       userid:user._id
    })

    return res.status(200).json({
        message:"todo created successfully",
        todo
    })
})
// return the list of all the todos
app.get('/todos',authMiddleware,async function(req,res){
    const user=req.user;
    const userid=user._id;

    const todos=await TodoModel.find({
        userid
    })

    return res.status(200).json({
        message:"success",
        todos
    })
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});