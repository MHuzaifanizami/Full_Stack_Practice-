import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import './database.js'
import { Todo } from './models/todoModel.js'
import { User } from './models/userModel.js'
import bcrypt from 'bcrypt'

const app = express()
const port = 3000
app.use(express.json())

app.use(cors())


// User Routes 

app.post('/api/v1/signup', async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.send({ message: "Missing some parameters" })
  }

  const user = await User.findOne({ email: req.body.email })

  if (user) {
    res.send({ message: "user is already exist" })
    return;
  }

  const result = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  console.log("user data", result);

  res.send({ data: result, message: "user added successfully" })
})

// Login Route 

app.post('/api/v1/login', async (req, res) => {

  const result = await User.findOne({ email: req.body.email })
  console.log("user data", result);

  if (!result) {
    res.status(404).send({ message: "user not found" })
    return;
  }

  const isMatch = await bcrypt.compare(req.body.password, result.password);

  if (!isMatch) {
    res.status(404).send({ message: "Password is Incorrect" })
    return;
  }
  res.send({ data: result, message: "Login Successfully" })
})


// Todo Routes ///

app.get('/api/v1/get-todos', async (req, res) => {
  const todos = await Todo.find()
  const message = !todos.length ? "Empty Todos" : "YE le Todo"
  console.log("todo in get", req.body);

  res.send({ data: todos, message: message })
})

app.post('/api/v1/post-todos', async (req, res) => {

  const todoObj = {
    todo: req.body.todo,
    // id: String(new Date().getTime())
    ip: req.ip
  }
  // todos.push(todoObj)
  const result = await Todo.create(todoObj)
  console.log("res in badabase", result);

  res.send({ data: todoObj, message: "todo added successfully" })
})

app.delete('/api/v1/delete-todos/:id', async (req, res) => {
  const id = req.params.id
  let isFound = false

  // for (let i = 0; i < todos.length; i++) {

  //   if (todos[i].id == id) {
  //     todos.splice(i, 1)
  //     isFound = true
  //     break
  //   }
  // }

  const deletedTodo = await Todo.findByIdAndDelete(id)

  if (deletedTodo) {
    res.status(200).send({ data: deletedTodo, message: "Todo deleted" });
  } else {

    res.status(404).send("Todo not avaliable");
  }

})


app.patch('/api/v1/update-todos/:id', async (req, res) => {
  const id = req.params.id
  let isFound = false
  let todo = req.body.todo
  console.log("todo updated", todo);

  // for (let i = 0; i < todos.length; i++) {

  //   if (todos[i].id == id) {
  //     todos[i].todo = todo
  //     isFound = true
  //     break
  //   }
  // }
  const updatedTodo = await Todo.findByIdAndUpdate(id,
    {
      todo: req.body.todo
    }
  )

  if (updatedTodo) {
    res.status(200).send({ data: updatedTodo, message: "Todo updated" });
  } else {

    res.status(404).send({ data: null, message: "Todo not avaliable" });
  }

})


app.use((req, res) => {
  res.status(404).send({ message: "route not found!", status: 404 });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


