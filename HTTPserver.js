const express=require("express");
const app=express();
//http://localhost:3000/add?a=1&b=2
app.get('/sum' , function(req,res){
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.json({
        ans:a+b,
    })
})
//http://localhost:3000/sum/6/2
app.get('/sum/:a/:b', function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);
    res.json({
        ans:a+b,
    })
})

//http://localhost:3000/subtract?a=1&b=2
app.get('/subtract' , function(req,res){
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.json({
        ans:a-b,
    })
})
app.get('/subtract/:a/:b' , function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);
    res.json({
        ans:a-b,
    })
})
//http://localhost:3000/divide?a=1&b=2
app.get('/divide' , function(req,res){
    const a=req.query.a;
    const b=req.query.b;
    res.json({
        ans:a/b,
    })
})
//http://localhost:3000/divide/6/2
app.get('/divide/:a/:b' , function(req,res){
    const a=req.params.a;
    const b=req.params.b;
    res.json({
        ans:a/b,
    })
})
//http://localhost:3000/multiplyt?a=1&b=2
app.get('/multiply' , function(req,res){
    const a=req.query.a;
    const b=req.query.b;
    res.json({
        ans:a*b,
    })
})
app.get('/multiply/:a/:b' , function(req,res){
    const a=req.params.a;
    const b=req.params.b;
    res.json({
        ans:a*b,
    })
})
app.listen(3000)
