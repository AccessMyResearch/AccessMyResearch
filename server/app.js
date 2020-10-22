const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

// Remove fake user id
const USER_ID = 1;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/search", (req, res) => {
  console.log(req.body);
  client.hgetall(USER_ID, function(err, value) {
    res.status(200);
    res.send(value);
  });
});

app.post("/search", (req, res) => {
  for (const [key, value] of Object.entries(req.body)) {
    client.hmset(USER_ID, key, value);
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
