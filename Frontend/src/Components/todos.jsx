import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'

function Todos() {

 const BASE_URL = 'https://full-stack-practice-backend.vercel.app'
  const [todos, setTodos] = useState([])

  console.log("settodos", todos);


  const getTodos = async () => {

    const res = await axios.get(`${BASE_URL}/api/v1/get-todos`)
    const data = res?.data?.data
    const newTodo = data.map((todo) => {
      return { ...todo, isEditing: false }
    })
    setTodos(newTodo)
    console.log("data", newTodo);
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
      toast.dismiss()
      toast.error(error?.response?.data || "unknown error")
    }


  }

  const deleteTodo = async (todoId) => {
    try {
      console.log("todoId", todoId);
      const { data } = await axios.delete(`${BASE_URL}/api/v1/delete-todos/${todoId}`)
      getTodos()
      toast.success(data.message)
    } catch (error) {
      console.log("error in delete", error);
      toast.error(error?.response?.data || "unknown error")

    }

  }

  const editTodo = async (event, todoId) => {
    
    try {
      console.log("todoId in edit", todoId);
      event.preventDefault()
      const todoValue = event.target.elements.editTodoInput.value;
      console.log("todoValue", todoValue);
      const { data } = await axios.patch(`${BASE_URL}/api/v1/update-todos/${todoId}`, {
        todo: todoValue,
      })
      getTodos()
      toast.success(data.message)
    } catch (error) {
      console.log("error in delete", error);
      // toast.error(error?.response?.data || "unknown error")

    }

  }



  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
      <header className="bg-indigo-600 text-white text-center p-4 rounded-t-lg">
        <h1 className="text-xl font-semibold">To-Do List</h1>
      </header>
      <div className="p-4">
        <div className='flex flex-col'>
          <form
            onSubmit={addTodo}
            className="flex items-center mb-4">
            <input
              type="text"
              name='todoInput'
              placeholder="Add a new task"
              className="flex-grow p-2 border border-gray-300 rounded-l-lg border-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition duration-300"
            >
              Add
            </button>
          </form>
        </div>
        <ul className="space-y-2">
          {todos?.map((todo, index) => (

            <li
              className="bg-gray-50 flex justify-between items-center p-2 rounded-lg shadow-sm"
              key={todo._id}
            >
              {!todo.isEditing ? <span className="text-gray-700">{todo.todo}</span> :
                <form
                  onSubmit={(event) => editTodo(event, todo._id)}
                >
                  <input
                    className='border border-gray-300'
                    type='text'
                    name='editTodoInput'
                    defaultValue={todo.todo}
                  />
                </form>
              }
              <div className="flex space-x-2">
                {!todo.isEditing ?
                  <button
                    onClick={() => {
                      todos[index].isEditing = true
                      setTodos([...todos])
                    }}
                    className="text-green-500 hover:text-green-600 transition duration-300">
                    Edit
                  </button> :
                  <button
                    onClick={() => {
                      todo.isEditing = false
                      setTodos([...todos])
                    }}
                  >Cancel</button>
                }
                {!todo.isEditing ? <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-600 transition duration-300">
                  Delete
                </button> :
                  <button>Save</button>
                }

              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer className="bg-gray-50 text-center p-2 rounded-b-lg">
        <p className="text-gray-500">All tasks completed!</p>
      </footer>
    </div>
    {/* <SignupForm /> */}
  </div>
    
  )
}

export default Todos