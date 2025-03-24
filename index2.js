const express=require("express");
const app=express();

let users=[{
    name:"aman",
    kidneys:[
        {
            healthy:false,
        },
    ],
},
];

app.use(express.json());
app.get("/",function(req,res){
    let userkidney=users[0].kidneys;
    let totalkidneys=users[0].kidneys.length;
    let healthykidneys=0;
    for(let i=0;i<totalkidneys;i++){
         if(userkidney[i].healthy){
            healthykidneys=healthykidneys+1;
         }
    }
    let unhealthykidneys=totalkidneys-healthykidneys;
    res.json({
        totalkidneys,
        healthykidneys,
        unhealthykidneys,
    })
     

})

app.post("/",function(req,res){
    const isHealthy=req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy,
    })
    res.send({
        message:"done",
    })

})

function countunhealthykidneys(){
    const kidneys=users[0].kidneys;
    
    for(let i=0;i<kidneys.length;i++){
        if(!kidneys[i].healthy){
            return true;
        }
    }
    return false;

}

app.put("/",function(req,res){
    if(countunhealthykidneys()){
        const kidneys=users[0].kidneys;
        for(let i=0;i<kidneys.length;i++){
            kidneys[i].healthy=true;
        }
        res.json({
            message:"kidney replaced successfully"
        })
    }
    else{
        res.status(411).json({
            message:"there is no unhealthy kidney"
        });
    }
});

app.delete("/",function(req,res){
    if(countunhealthykidneys()){
        const newarray=[];
        for(let i=0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
               newarray.push({
                healthy:true,
               });
            }
        }
        users[0].kidneys=newarray;
        res.json({
            message:"kidney deleted successfully",
        })
    }
    else{
        res.status(411).json({
            message:"there is no unhealthy kidney",
        });
    }

});

//app.listen(3000);
