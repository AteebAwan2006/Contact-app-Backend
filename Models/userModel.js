const mongoose =require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the username"]
    },
    email:{
        type:String,
        required:[true,"Please add the user email address"],
        unique:[true,"Email address already in use"]
    },
    password:{
        type:String,
        required:[true,"Please add the user password"],
    }
},
{
    Timestamps:true,
},)
module.exports=mongoose.model("user",userSchema);