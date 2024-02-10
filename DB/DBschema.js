const mongoose = require("mongoose");
const { string, boolean } = require("zod");

mongoose.connect(
  "mongodb+srv://bikashi:bikash123@cluster0.4f5lmam.mongodb.net/TODO"
);

// Designing Schema for signup
const userschema = mongoose.model("userdetails", {
  username: String,
  password: String,
  email: String,
});

const todoSchema = mongoose.model("todos", {
  tittle: String,
  description: String,
  username: String,
  completed: Boolean
});

module.exports = {
  userschema,
  todoSchema,
};
