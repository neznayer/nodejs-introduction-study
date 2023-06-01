require("dotenv").config();
const express = require("express");
const fs = require("fs/promises");
// Initialize express app
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

async function isIdExists(req, res, next) {
  const todos = JSON.parse(await fs.readFile("todos.json", "utf8"));
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send("The todo item was not found");
  }
  return next();
}

async function validateNewTodo(req, res, next) {
  const newTodo = req.body;
  if (!newTodo.title) {
    return res.status(400).send("The title is required");
  }
  if (typeof newTodo.completed === "undefined") {
    return res.status(400).send("The description is required");
  }

  return next();
}

// Define a simple GET route
app.get("/", function (req, res) {
  return res.send("Hello World!");
});

app.get("/todos", async function (req, res) {
  // get the todos list here,
  const todos = JSON.parse(await fs.readFile("todos.json", "utf8"));
  return res.status(200).json(todos);
});

app.get("/todos/:id", isIdExists, async function (req, res) {
  // get the todo item by id
  const todos = JSON.parse(await fs.readFile("todos.json", "utf8"));

  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));

  return res.status(200).json(todo);
});

app.post("/todos", validateNewTodo, async function (req, res) {
  const newTodo = req.body;

  const todos = JSON.parse(await fs.readFile("todos.json", "utf8"));
  const newTodoId = todos.length + 1;
  newTodo.id = newTodoId;
  todos.push(newTodo);
  try {
    await fs.writeFile("todos.json", JSON.stringify(todos));
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }

  return res.status(201).json(todos);
});

app.put("/todos/:id", isIdExists, async function (req, res) {
  const todos = JSON.parse(await fs.readFile("todos.json", "utf8"));
  const todoIndex = todos.findIndex(
    (todo) => todo.id === parseInt(req.params.id)
  );
  const todo = todos[todoIndex];
  const updatedTodo = { ...todo, ...req.body };
  todos[todoIndex] = updatedTodo;
  try {
    await fs.writeFile("todos.json", JSON.stringify(todos));
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
  return res.status(200).json(updatedTodo);
});

app.delete("/todos/:id", isIdExists, async function (req, res) {
  const todos = JSON.parse(await fs.readFile("todos.json", "utf8"));
  const todoIndex = todos.findIndex(
    (todo) => todo.id === parseInt(req.params.id)
  );
  todos.splice(todoIndex, 1);
  try {
    await fs.writeFile("todos.json", JSON.stringify(todos));
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
});

// Start the server
app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT}!`);
});
