const express = require("express");

// Initialize express app
const app = express();

const PORT = process.env.PORT || 4000;

// Define a simple GET route
app.get("/", function (req, res) {
  return res.send("Hello World!");
});

const todos = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Learn React.js", completed: false },
  { id: 3, title: "Climb mount Fuji", completed: true },
];

app.get("/todos", function (req, res) {
  // get the todos list here,
  return res.status(200).json(todos);
});

app.get("/todos/:id", function (req, res) {
  // get the todo item by id
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send("The todo item was not found");
  }
  return res.status(200).json(todo);
});

// Start the server
app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT}!`);
});
