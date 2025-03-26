//authentication using tokens
const express=require("express")
const app=express();

app.use(express.json());

let user=[];

function generateToken() {

    // Create an array of options for the token 
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // Create a variable to store the token
    let token = "";

    // Loop through the options array and generate a token
    for (let i = 0; i < 32; i++) {

        // Add a random character from the options array to the token
        token += options[Math.floor(Math.random() * options.length)];
    }

    // Return the token
    return token;
}

app.post('/signup',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    // validation checks

   user.push({
        username:username,
        password:password 
   })
   res.json({
    message:"you are signed in successfully",
   });
})

app.post('/signin',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    let founduser=null;

    for(let i=0;i<user.length;i++){
        if(user[i].username===username && user[i].password===password){
            founduser=user[i];
        }
    }

   //const foundUser = users.find(user => user.username === username && user.password === password);

    if(founduser){
        const token=generateToken();
        founduser.token=token;
        return res.json({
           message:"user has signed successfully",
           token:token,
        });
    }
    else{
        return res.json({
            message:"user not found"
        })
    }

});

app.get('/details',function(req,res){
    const token=req.headers.token;
    if(!token){
        return res.json({
            message:"token is missing",
        });
    }
    let founduser=[];

    // const founduser=user.find(user=>user.token===token);
    for(let i=0;i<user.length;i++){
        if(token===user[i].token){
            founduser=user[i];
        }
    }

    if(founduser){
        return res.json({
          username:founduser.username,
          password:founduser.password
        })
    }
    else{
        return res.json({
            message:"user not found"
        })
    }
})

app.listen(3000);

