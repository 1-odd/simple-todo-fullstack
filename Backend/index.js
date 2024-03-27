const express = require("express");
require("dotenv").config();
const { createTodo, updateTodo } = require("./typesZod");
const { connectDB, Todo } = require("./db");
const cors=require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.get("/todos", async (req, res) => {
  // fetch all exist todos
  try {
    const todos = await Todo.find({});
    if (todos.length === 0) {
      res.status(404).json({
        msg: "No todo found",
      });
    }
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
});

app.post("/add-todo", async (req, res) => {
  // add a new todo

  const payload = req.body;
  

  const userTodo = createTodo.safeParse(payload); // validation check
 
  try {
    if (userTodo.success) {
      // if validation pass

      const todo = await Todo.create({
        title: userTodo.data.title,
        description: userTodo.data.description || "",
        completed: false,
      });
      res.status(200).json({
        msg: "Todo created successfully!",
        data: todo,
      });
    } else {
      // if validation got failed
      res.status(500).json({
        msg: "Error in the payload data",
        error: userTodo.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error in create a new todo",
      error: error,
    });
  }
});

app.put("/todo-completed", async (req, res) => {
  // update as completed

  const payload = req.body;
  const putTodo = updateTodo.safeParse(payload);

  try {
    if (putTodo.success) {
      const result = await Todo.updateOne(
        {
          _id: req.body.id,
        },
        {
          completed: true,
        }
      );
      if (result) {
        res.status(200).json({
          msg: "Task marked as completed",
        });
      } else {
        throw "No task found";
      }
    } else {
      res.status(500).json({
        msg: "Invalid Data for updation.",

        error: putTodo.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "error in update todo",
      error: error,
    });
  }
});

function listner() {
  connectDB().then(
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    })
  );
}

listner();
