const express=require("express");
const app=express();

let todos=[
    {
        id:1,
        desc:"Go to swimming",
        startAt:"12:00pm",
    },
    {
        id:2,
        desc:"Go to cycling",
        startAt:"12:00pm",
    },

];

app.get('/',function(req,res){
    let newarray=[];
    for(let i=0;i<todos.length;i++){
       newarray.push(todos[i].desc);
    }

    res.status(200).json({
        newarray,
    })

})

app.get('/:id',function(req,res){
    // req.params.id output is string
    let taskid=Number(req.params.id);
    let task;
    for(let i=0;i<todos.length;i++){
        if(todos[i].id===taskid){
           task=todos[i].desc; 
        }
    }
    if(!task){
        return res.status(404).json({
            message:"id not found",
        })
    }
    res.status(200).json(
        {
            task
        }
    )

})
app.use(express.json());

app.post('/',function(req,res){
    todos.push({
        id:req.body.id,
        desc:req.body.desc,
        startAt:req.body.startAt,
    })
    
    res.status(200).json({
        message:"done",
        todos
    })

})

app.put('/',function(req,res){
   let new_id=req.body.id;
   let newtask=req.body.desc;
   let ispresent=false;

   for(let i=0;i<todos.length;i++){
    if(todos[i].id===new_id){
        todos[i].desc=newtask;
        ispresent=true;
    }
   }
   if(ispresent){
    return res.status(200).json({
        message:"task updated successfully",
        todos
    })
   }
    return res.status(411).json({
        message:"id not found",
    })
   

})

app.delete("/", function (req, res) {
    let delete_id = req.body.id;

    // Check if the task exists before modifying the array
    let taskExists = todos.some(todo => todo.id === delete_id);

    if (!taskExists) {
        return res.status(404).json({ message: "Task not deleted as ID was not found" });
    }

    // Remove the task by filtering out the given ID
    todos = todos.filter(todo => todo.id !== delete_id);

    res.status(200).json({ 
        message: "Task deleted successfully",
        todos,
     });
});

app.listen(3000);
