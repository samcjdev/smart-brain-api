const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '90gsm',
      database : 'smart-brain'
    }
  });



const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => { res.send(database.users) })
app.post("/signin", (req, res) => { signin.handleSignin (db, bcrypt)(req, res) })
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) })
app.put("/image", (req, res) => { image.handleImage(req, res, db) })
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })

//bcrypt.hash(password, null, null, function(err, hash) {
    //console.log(hash);
//});
// Load hash from your password DB.


app.listen(3000, () => {
    console.log("app is runnning on port 3000");
});

console.log(process.env)
/*
/ --> res = this is working
/signin --> POST  success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/