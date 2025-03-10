import { useState } from 'react'
import "./App.css"
import Navbar from './components/navbar'
import Homepage from './pages/homepage'
import GameDetailsPage from './pages/gameDetailsPage'
import { Route, Routes } from 'react-router-dom'
import CreateGamePage from './pages/CreateGamePage'
import UpdateGamePage from './pages/UpdateGamePage'
import RequestGamePage from './pages/RequestGamePage'



function App() {
  

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element= {<Homepage />}/>
        <Route path="/gameslist/:gameId" element= {<GameDetailsPage/>}/>
        <Route path="/myprofile/addgame" element = {<CreateGamePage/>}/>
        <Route path="/myprofile/:gameId/update" element = {<UpdateGamePage/>}/>
        <Route path="/gameslist/:gameId/request" element = {<RequestGamePage/>}/>
      </Routes>
    </>
  )
}

export default App
