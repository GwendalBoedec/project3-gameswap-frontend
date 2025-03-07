import { useState } from 'react'
import "./App.css"
import Navbar from './components/navbar'
import Homepage from './pages/homepage'
import GameDetailsPage from './pages/gameDetailsPage'
import { Route, Routes } from 'react-router-dom'



function App() {
  

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element= {<Homepage />}/>
        <Route path="/gameslist/:gameId" element= {<GameDetailsPage/>}/>
      </Routes>
    </>
  )
}

export default App
