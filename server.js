require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "postgresql-deep-46739",
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: "smart-brain",
  },
});

// db.select()
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = new user
/profile/:userId --> GET = user
/image --> PUT = updated user

*/
