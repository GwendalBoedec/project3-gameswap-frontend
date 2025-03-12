import { useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import GameDetailsPage from './pages/GameDetailsPage'
import { Route, Routes } from 'react-router-dom'
import CreateGamePage from './pages/CreateGamePage'
import UpdateGamePage from './pages/UpdateGamePage'
import RequestGamePage from './pages/RequestGamePage'
import RequestListPage from './pages/RequestsListPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import MyProfile from './pages/MyProfile'




function App() {


  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gameslist/:gameId" element={<GameDetailsPage />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/myprofile/addgame" element={<CreateGamePage />} />
        <Route path="/myprofile/:gameId/update" element={<UpdateGamePage />} />
        <Route path="/gameslist/:gameId/request" element={<RequestGamePage />} />
        <Route path="/myprofile/requests" element={<RequestListPage />} />
      </Routes>
    </>
  )
}

export default App
