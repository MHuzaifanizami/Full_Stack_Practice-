import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import SignupForm from './Components/signUp';
import LoginForm from './Components/logIn';
import Todos from './Components/todos';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignupForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/todos' element={<Todos />} />
      </Routes>
    </Router>
  )

}

export default App
