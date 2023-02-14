const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/LoginSignUp")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const LoginSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
    email:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    }
})

const collection = new mongoose.model("Collection1", LoginSchema);
module.exports = collection;