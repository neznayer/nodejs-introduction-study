const fs = require("fs/promises");

async function isIdExists(req, res, next) {
  const todos = JSON.parse(await fs.readFile("todos.json", "utf8"));
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send("The todo item was not found");
  }
  return next();
}

module.exports = isIdExists;
