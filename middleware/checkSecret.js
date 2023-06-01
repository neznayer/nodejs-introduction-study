function checkSecret(req, res, next) {
  const secret = req.headers["x-secret"];
  if (secret === process.env.SECRET_KEY) {
    return next();
  }
  return res.status(401).send("Unauthorized");
}

module.exports = checkSecret;
