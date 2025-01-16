import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

function App() {

  const BASE_URL = 'http://localhost:3000'
  const [todos, setTodos] = useState([])

  const getTodos = async () => {

    const res = await axios.get(`${BASE_URL}/api/v1/get-todos`)
    const data = res?.data?.data
    setTodos(data)
    console.log("data", data);
  }

  useEffect(() => {
    getTodos()
  }, [])

  const addTodo = async (event) => {
    try {
      event.preventDefault()
      const todoValue = event.target.elements.todoInput.value;
      const res = await axios.post(`${BASE_URL}/api/v1/post-todos`, {
        todo: todoValue,
      });
      getTodos()
      event.target.reset()
      // setTodos(...todos , res.data.data)
    } catch (error) {
      console.log("error in post", error);
    }


  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <header className="bg-indigo-600 text-white text-center p-4 rounded-t-lg">
          <h1 className="text-xl font-semibold">To-Do List</h1>
        </header>
        <div className="p-4">
          <form
            onSubmit={addTodo}
            className="flex items-center mb-4">
            <input
              type="text"
              name='todoInput'
              placeholder="Add a new task"
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition duration-300"
            >
              Add
            </button>
          </form>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                className="bg-gray-50 flex justify-between items-center p-2 rounded-lg shadow-sm"
                key={todo.id}
              >
                <span className="text-gray-700">{todo.todo}</span>
                <div className="flex space-x-2">
                  <button className="text-green-500 hover:text-green-600 transition duration-300">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-600 transition duration-300">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <footer className="bg-gray-50 text-center p-2 rounded-b-lg">
          <p className="text-gray-500">All tasks completed!</p>
        </footer>
      </div>
    </div>
  )
}

export default App
