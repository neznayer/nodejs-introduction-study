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

module.exports = validateNewTodo;
