import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './page/Login'
import Register from './page/Register'
import ArtistDashboard from './page/ArtistDashboard'
import UploadMusic from './page/UploadMusic'
import MusicDetails from './page/MusicDetails'
import {io} from 'socket.io-client'
import { useState,useEffect } from 'react'
function App() {
  const [socket,setSocket]=useState(null);
  useEffect(()=>{
    const newSocket=io("http://localhost:3002",{
      withCredentials:true,
    })
    setSocket(newSocket);
    newSocket.on("play",(data)=>{
      const musicId=data.musicId
      window.location.href=`/music/${musicId}`
    })
},[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/artist/dashboard" element={<ArtistDashboard />} />
        <Route path="/artist/dashboard/upload-music" element={<UploadMusic />} />
        <Route path="/music/:id" element={<MusicDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
