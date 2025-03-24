// import express module using require function and store it in express variable
const express=require("express");
// create an express application using express function
const app=express();
// This function is a middleware function that checks if the age of the person is greater than 14
function isOldEnoughMiddleware(req,res,next){
     // get the age from the query parameter of the request object and store it in age variable
    const age=req.query.age;
     // if age is greater than 14, call the next middleware function else return a status code 411 with message "Sorry!, your age is not enough to ride"
     
    if(age>=14){
        next();
    }
    else{
        return res.status(404).json({
            message:"under age "
        })
    }
}
// use the middleware function isOldEnoughMiddleware for all the routes below this line of code in the file 
app.use(isOldEnoughMiddleware);

app.get('/rides1',function(req,res){
    res.send("ride 1 taken successfully");
})
// create a route for GET request on /files path
app.get('/rides2',function(req,res){
    res.send("ride 2 taken successfully");
})
// Start the server on port 3000
app.listen(3000);

//google par jaake yeh type karo
//http://localhost:3000/ride1/?n=12