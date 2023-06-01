const express = require("express");
const fs = require("fs/promises");
const {
  getAllTodos,
  createNewTodo,
  updateTodoById,
  deleteTodoById,
  getTodoById,
} = require("../controllers/todoController");
const validateNewTodo = require("../middleware/validateNewTodo");
const isIdExists = require("../middleware/isIdExists");

const router = express.Router();

router.get("/", getAllTodos);

router.get("/:id", isIdExists, getTodoById);

router.post("/", validateNewTodo, createNewTodo);

router.put("/:id", isIdExists, updateTodoById);

router.delete("/:id", isIdExists, deleteTodoById);

module.exports = router;
