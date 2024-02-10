const z = require("zod");

// Zod input check model
const todoInputCheck = z.object({
    tittle: z.string(),
    description: z.string(),
  });

  const userDetailCheck =z.object({
    username:z.string(),
    password:z.string().min(8),
    email:z.string().email()
  })

  module.exports={
    todoInputCheck,
    userDetailCheck
  }