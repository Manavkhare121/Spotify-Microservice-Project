import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './page/Login'
import Register from './page/Register'
import ArtistDashboard from './page/ArtistDashboard'
import UploadMusic from './page/UploadMusic'
import MusicDetails from './page/MusicDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
