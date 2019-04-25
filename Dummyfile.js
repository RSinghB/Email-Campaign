const exp = require("express");
const app = exp();
const test = exp();

app.get("/", (req, res) => {
  res.send({ bye: "buddy" });
});

test.get("/", (req, res) => {
  res.send({ Hello: "This is test modul" });
});

const PORT = process.env.PORT || 5001; //Environment Varialbes which is find port number at Heroku or production. get 5001 port number for
// Dev environment.
//app.listen(5001);
app.listen(PORT);
app.listen(5002);
