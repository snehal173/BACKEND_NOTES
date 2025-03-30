const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const user=new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})
const todo=new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    done:{
        type:Boolean
    },
    userid:{
        type:ObjectId
    }

})
const UserModel=mongoose.model('users',user);
const TodoModel=mongoose.model('todos',todo);

module.exports={
    UserModel:UserModel,
    TodoModel:TodoModel
}

