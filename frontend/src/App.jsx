import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
// import Home from "../Home"

const App = () => {
  return (
    <div>
      <Navbar />

      {/* <div>
        <Routes>
          <Route path='/' element={ <Home /> } />
        </Routes>
      </div> */}
    </div>
  )
}

export default App
