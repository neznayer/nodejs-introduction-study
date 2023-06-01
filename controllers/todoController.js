const { Todo } = require("../models/Todo");

async function getAllTodos(req, res) {
  // get the todos list here,

  const todos = await Todo.find({});
  return res.status(200).json(todos);
}

async function getTodoById(req, res) {
  // get the todo item by id

  const todo = await Todo.findById(req.params.id);

  return res.status(200).json(todo);
}

async function createNewTodo(req, res) {
  const newTodoJson = req.body;

  const newTodo = new Todo(newTodoJson);

  try {
    await newTodo.save();
    const todos = await Todo.find({});
    return res.status(201).json(todos);
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
}

async function updateTodoById(req, res) {
  const id = req.params.id;
  const updatedTodoJson = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, updatedTodoJson, {
      returnDocument: "after",
    });

    return res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
}

async function deleteTodoById(req, res) {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    const todos = await Todo.find({});
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
