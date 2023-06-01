const { Todo } = require("../models/Todo");

async function isIdExists(req, res, next) {
  const id = req.params.id;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).send("The todo item was not found");
  }
  return next();
}

module.exports = isIdExists;
