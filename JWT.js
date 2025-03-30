const express=require("express")
const app=express();
const jwt=require("jsonwebtoken");
const users = [];

// Create a secret key for the jwt token
const JWT_SECRET = "ilove100xdevsliveclasses";

app.use(express.json());

function logger(req,res,next){
    console.log(`${req.method} request received`);
    next();
}
//serve the index.html file when accessig the root route
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})

function authmiddleware(req,res,next){
   const token=req.headers.token;
   if(!token){
     return res.json({
        message:"token is missing"
     })
   }
   try{
    const decodedata=jwt.verify(token,JWT_SECRET);
    console.log(decodedata);
    req.username=decodedata.username;
    next();
   }catch(error){
    return res.json({
        message:" invalid token"
    })
   }
  
}

app.post('/signup',logger,function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    if(username.length<5){
        return res.json({
            message:"username is invalid",
        })
    }
    const founduser=users.find(u=>u.username===username)

    if(founduser){
        return res.json({
            message:"user already exists"
        })
    }

   
    users.push({
        username:username,
        password:password
    });

    res.json({
        message:"user signup successfully"
    });


    

});

app.post("/signin",logger,function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    const founduser=users.find(u=>u.username===username && u.password===password);

   if(founduser){
      const token=jwt.sign({
        username:founduser.username,
      },JWT_SECRET)
      return res.json({
        message:"you have signed in successfully",
        token:token
    })

   }else{
    return res.json({
        message:"invalid token",
       
    })
    
   }

})

app.get("/me",authmiddleware,function(req,res){
    
    //middleware se aaya req.username
    const founduser=users.find(u=>u.username===req.username);

    if(!founduser){
        return res.json({
            message:"user not found"
        })
    }else{
       return res.json({
            message:"user signup successfully",
            username:founduser.username,
            password:founduser.password,
    
        });

    }
});


app.listen(3000);


