function checkSecret(req, res, next) {
  const secret = req.headers["X-SECRET"];
  if (secret === process.env.SECRET) {
    return next();
  }
  return res.status(401).send("Unauthorized");
}
