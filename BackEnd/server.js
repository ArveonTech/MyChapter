const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

require("dotenv").config();
app.use(express.json());

const post = [
  {
    nama: "saya",
    email: "saya@gmail.com",
  },
  {
    nama: "Ar",
    email: "ar@gmail.com",
  },
];

app.get("/post", authenticateToken, (req, res) => {
  res.json(post.filter((post) => post.nama === req.user.nama));
});

app.post("/login", (req, res) => {
  const nama = req.body.nama;
  const user = { nama };

  const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY);
  res.json({ accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (Err, user) => {
    if (Err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000);
