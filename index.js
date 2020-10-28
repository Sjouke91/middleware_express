const express = require("express");
const app = express();
const port = 3000;

const loggingMiddleware = (req, res, next) => {
  const name = "X-Codaisseur-Time";
  const value = new Date();
  res.setHeader(name, value);
  next();
};

const failRandomMiddleware = (req, res, next) => {
  const random = Math.floor(Math.random() * 10);
  if (random >= 5) {
    next();
  } else {
    res.status(500).send("no content");
  }
};

app.use(loggingMiddleware);

app.get("/", failRandomMiddleware, (req, res) => res.send("Hello"));

app.get("/foo", (req, res) => res.send("Hello"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
