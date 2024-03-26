const express = require('express');
require('dotenv').config();
const {createTodo , updateTodo} = require('./typesZod');


const app = express();
const PORT = process.env.PORT||3000;

app.use(express.json()); 


app.get('/todos',(req,res)=>{
    // fetch all exist todos
});

app.post('/todo',(req,res)=>{
    // add a todo code
});

app.put('/completed',(req,res)=>{
    // update as completed
})


app.listen(PORT,()=>{
    console.log("Server is running on port", PORT);
});