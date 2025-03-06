import { useState } from 'react'
import "./App.css"
import Navbar from './components/navbar'
import Homepage from './pages/homepage'
import { Route, Routes } from 'react-router-dom'



function App() {
  

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element= {<Homepage />}/>
      </Routes>
    </>
  )
}

export default App
