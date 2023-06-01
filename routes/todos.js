const express = require("express");
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

router.get("/:id", getTodoById);

router.post("/", validateNewTodo, createNewTodo);

router.put("/:id", updateTodoById);

router.delete("/:id", isIdExists, deleteTodoById);

module.exports = router;
