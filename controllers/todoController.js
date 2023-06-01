const fs = require("fs/promises");

async function getAllTodos(req, res) {
  // get the todos list here,
  const todos = JSON.parse(await fs.readFile("todos.json", "utf8"));
  return res.status(200).json(todos);
}

async function getTodoById(req, res) {
  // get the todo item by id
  const todos = JSON.parse(await fs.readFile("todos.json", "utf8"));

  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));

  return res.status(200).json(todo);
}

async function createNewTodo(req, res) {
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
}

async function updateTodoById(req, res) {
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
}

async function deleteTodoById(req, res) {
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
}

module.exports = {
  getAllTodos,
  getTodoById,
  createNewTodo,
  updateTodoById,
  deleteTodoById,
};
