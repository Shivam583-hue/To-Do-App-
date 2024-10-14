const mongoose = require("mongoose")
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
    ).then(() => console.log("Connected to MongoDB"))
        .catch(err => console.error("Failed to connect to MongoDB", err));

const todoSchema = new mongoose.Schema({
    title : String,
    completed : Boolean,
})

const TodoModel = mongoose.model("TodoModel",todoSchema)
module.exports = TodoModel; 

