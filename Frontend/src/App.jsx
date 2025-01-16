import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get('/api/jokes')
      .then((res) => {
        setJokes(res.data)
      })
      .catch((error)=>{
        console.log("error", error);

      })
  }, [])
console.log("jokes" , jokes);

  return (
    <>
      <h1>Hello world</h1>
      <h1>JOkes : {jokes.length}</h1>


      {
        jokes.map((joke) => (
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.description}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
