const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;



mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const LoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lists: [
    {
      name: String,
      films: [
        {
          id: Number,
          title: String,
          year: String,
          posterUrl: String,
        },
      ],
    },
  ],
});





const collection = new mongoose.model("Collection1", LoginSchema);
module.exports = collection;