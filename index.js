const { todoInputCheck, userDetailCheck } = require("./TypeCheck");
const express = require("express");
const { checkuser } = require("./Middleware/signIn");
const { userschema, todoSchema } = require("./DB/DBschema");
const app = express();
const port = 3000;
const cors = require('cors')
var bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res)=>{
  res.json({
    msg: "Your server is running"
  })
})
app.post("/signup", async (req, res) => {
  // signup Route
  const username = req.headers.username;
  const password = req.headers.password;
  const email = req.headers.email;

  const checkUserDetails = userDetailCheck.safeParse({
    // Input Validation
    username: username,
    password: password,
    email: email,
  });

  if (checkUserDetails.success == false) {
    // input validation ERROR
    res.json("Invalid Input");
    return;
  }

  const isExists = await userschema.findOne({
    //
    username: username,
  });

  if (isExists) return res.json("User already exists");

  userschema.create({
    // saved user Detail to DB
    // inserting userdetail in DB
    username,
    password,
    email,
  });

  res.json("User Saved"); // res back "user Saved"
});

// Adding ToDO Route
app.post("/todo", (req, res) => {
  // Adding todo route
  const tittle = req.body.tittle;
  const description = req.body.description;
  const completed = req.body.completed || false; //set completed false default
  const username = req.headers.username;

  console.log(req.body);
  const verify = todoInputCheck.safeParse({
    tittle: tittle,
    description: description,
  });

  if (verify.success == "false") {
    // if false then return
    res.json("Invalid Input");
    return;
  }

  todoSchema.create({
    // adding Input to DB
    tittle,
    description,
    username,
    completed,
  });

  res.json("Data saved"); // send response
});

// All todo's Route
app.get("/todos", async (req, res) => {
  // Display all TODO of user
  const username = req.headers.username;
  const data = await todoSchema.find({
    
  });
  res.json(data);
});

app.put("/completed/:id/:flag", checkuser, async (req, res) => {
  // marking TODO completed
  const id = req.params.id;
  const flag = req.params.flag;
  const getDetail = await todoSchema.findByIdAndUpdate(id, { completed: flag });
  res.json(`Task Set ${flag}`);
});

app.listen(port, () => console.log("Running"));
