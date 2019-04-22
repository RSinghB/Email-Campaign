const exp = require("express");
const app = exp();
const test = exp();

app.get("/", (req, res) => {
  res.send({ Hi: "There" });
});

const PORT = process.env.PORT || 5001; //Enverment Varialbes which is find port number at Heroku or production. get 5001 port number for
// Dev enverment.
//app.listen(5001);
app.listen(PORT);
