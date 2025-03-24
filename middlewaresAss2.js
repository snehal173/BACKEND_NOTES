// Assignment #6 - You have to create a middleware for rate limiting a users request based on their username passed in the header
// You have been given an express server which has a few endpoints.

// Your task is to create a global middleware (app.use) which will rate limit the requests from a user to only 5 request per second
// - If a user sends more than 5 requests in a single second, the server should block them with a 404.
// - User will be sending in their user id in the header as 'user-id'
// - You have been given a numberOfRequestsForUser object to start off with which clears every one second

// import express module using require function and store it in express variable
const express=require("express");
// create an express application using express function
const app=express();

let totalrequest={};

setInterval(() => {
    totalrequest={};
}, 1000);

function solve(req,res,next){
    const userid=req.headers["user-id"];
    if(totalrequest[userid]>1){
        totalrequest[userid]++;

        if(totalrequest[userid]>5){
            return res.status(404).json({
                message:"No Entry!"
            })
        }
        else {
            next();
        }
    }else{
         totalrequest[userid]=1;
         next();

    }

    
}


app.use(solve);

// create a route for GET request on /user path
app.get("/user", function (req, res) {
    // return a json response with name as Bharat
    res.status(200).json({ name: "Bharat" });
});

// create a route for POST request on /user path
app.post("/user", function (req, res) {
    // return a json response with message "created dummy user
    res.status(200).json({ msg: "created dummy user" });
});

app.get('/',function(req,res){
    res.status(200).json({
        totalrequest,
    })
})

app.listen(3000);

// assignment-3

/*
Assignment #7 - You have to create a middleware for logging the number of errors on a server

You have been given an express server which has a few endpoints.

Your task is to
1. Ensure that if there is ever an exception, the end user sees a status code of 404
2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint
*/

// // import express module using require function and store it in express variable
// const express = require("express");

// // create an express application using express function
// const app = express();

// // create a global variable errorCount and assign it a value of 0
// let errorCount = 0;

// // create a route for GET request on /user path
// app.get("/user", function (req, res) {
//     // throw an error with message "Some Error"
//     throw new Error("Some Error");

//     // return a json response with name as john if there is no error in the code execution
//     res.status(200).json({ name: "john" });
// });

// // create a route for POST request on /user path
// app.post("/user", function (req, res) {
//     // return a json response with message "created dummy user"
//     res.status(200).json({ msg: "created dummy user" });
// });

// // create a route for GET request on /errorCount path
// app.get("/errorCount", function (req, res) {
//     // return a json response with errorCount variable value
//     res.status(200).json({ errorCount });
// });

// // Error Handling Middleware it is used in end
// app.use((err, req, res, next) => {
//     // send a 404 status code as response to the user if there is an exception in any endpoint 
//     res.status(404).send({});

//     // increment the errorCount variable by 1
//     errorCount++;
// });

// // Start the server on port 3000
// app.listen(3000);
