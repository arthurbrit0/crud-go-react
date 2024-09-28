import React from 'react'
import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import List from './users/List'
import ViewUser from './users/ViewUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route index element={<List />}></Route>
        <Route path="/profile/:id" element={<ViewUser />}></Route>
      </Routes>
    </Router>
  )
}

export default App
