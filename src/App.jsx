import { useState } from 'react'
import "./App.css"
import Navbar from './components/navbar'
import Homepage from './pages/homepage'
import GameDetailsPage from './pages/gameDetailsPage'
import { Route, Routes } from 'react-router-dom'
import CreateGamePage from './pages/CreateGamePage'



function App() {
  

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element= {<Homepage />}/>
        <Route path="/gameslist/:gameId" element= {<GameDetailsPage/>}/>
        <Route path="/myprofile/addgame" element = {<CreateGamePage/>}/>
      </Routes>
    </>
  )
}

export default App
