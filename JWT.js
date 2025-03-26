const express=require("express")
const app=express();
const jwt=require("jsonwebtoken");
const users = [];

// Create a secret key for the jwt token
const JWT_SECRET = "ilove100xdevsliveclasses";

app.use(express.json());

app.post('/signup',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    const founduser=users.find(u=>u.username===username)

    if(founduser){
        return res.json({
            message:"user already exists"
        })
    }

    if(username.length<5){
        return res.json({
            message:"username is invalid",
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

app.post("/signin",function(req,res){
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

app.get("/me",function(req,res){
    const token=req.headers.token;

    if(!token){
        return res.json({
            message:"token is missing",
        })
    }
    const userdetails=jwt.verify(token,JWT_SECRET);

    const founduser=users.find(u=>u.username===userdetails.username);

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


