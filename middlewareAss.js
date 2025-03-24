// Assignment #5 - You have to create a middleware for logging the number of requests on a server
// You have been given an express server which has a few endpoints.

// Your task is to create a global middleware (app.use) which will maintain a count of the number of 
// requests made to the server in the global requestCount variable


// import express module using require function and store it in express variable
const express=require("express");
// create an express application using express function
const app=express();

let totalrequests=0;

function solve(req,res,next){
    totalrequests=totalrequests+1;
    next();
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


app.get("/requestCount",function(req,res){
    res.status(200).json({
        totalrequests,
    })
})

app.listen(3000);