
import express from 'express'
import { send } from 'vite'
const app = express()
const port = 3000
const products = []
app.use(express.json())
const todos = [];


app.get('/', (req, res) => {
  console.log("todo in get", req.body);

  res.send("hello world")
})

app.get('/get-todos', (req, res) => {
  console.log("todo in get", req.body);

  res.send(todos)
})

app.post('/post-todos', (req, res) => {

  const todoObj = {
    todo: req.body.todoContent,
    id: Date.now()
  }
  todos.push(todoObj)
  res.send('todo added successfully')
})

app.delete('/delete-todos/:id', (req, res) => {
  const id = req.params.id
  let isFound = false

  for (let i = 0; i < todos.length; i++) {

    if (todos[i].id == id) {
      todos.splice(i, 1)
      isFound = true
      break
    }
  }

  if (isFound) {
    res.status(200).send("Todo deleted");
  } else {

    res.status(404).send("Todo not avaliable");
  }

})


app.patch('/update-todos/:id', (req, res) => {
  const id = req.params.id
  let isFound = false
  let todo = req.body.todo
  console.log("todo updated", todo);

  for (let i = 0; i < todos.length; i++) {

    if (todos[i].id == id) {
      todos[i].todo = todo
      isFound = true
      break
    }
  }

  if (isFound) {
    res.status(200).send("Todo updated");
  } else {

    res.status(404).send("Todo not avaliable");
  }

})





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/jokes', (req, res) => {


  const jokes = [
    {
      id: 1,
      title: 'hello 1',
      description: 'hello 1'
    },
    {
      id: 2,
      title: 'hello 2',
      description: 'hello 2'
    },
    {
      id: 3,
      title: 'hello 3',
      description: 'hello 3'
    },
  ]

  res.send(jokes)
})


app.post('/api/product', (req, res) => {
  console.log("req", req.body);
  const product = req.body
  products.push(product)
  res.send('Product added successfully')
})

app.get('/api/products', (req, res) => {
  res.send(products)

})

app.get('/api/product/:id', (req, res) => {
  const index = Number(req.params.id) - 1
  const product = products[index]
  if (!product) {
    res.status(404).send({ message: "route not found!", status: 404 });

  }

  res.send({ data: product, message: 'Fetched Succcessfully', status: 200 })

})


app.use((req, res) => {
  res.status(404).send({ message: "route not found!", status: 404 });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})