import {Routes, Route, Navigate} from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import  SettingPage from "./pages/SettingPage.jsx"
import  ProfilePage from "./pages/ProfilePage.jsx"
import   SignupPage      from "./pages/SignPage.jsx"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import mitrachatlogo from "../public/logo.png"
import {Toaster} from "react-hot-toast"

function App() {

  const {CheckAuth, authUser , isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    CheckAuth();
  },[CheckAuth])

  console.log({authUser});

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <img src={mitrachatlogo} alt="" srcset=""className="size-24 animate-pulse" />

    </div>
  )
    
  
  

  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/" element= {authUser ? <HomePage/> : <Navigate to="/login"/>} />
      <Route path="/signup" element={!authUser ?<SignupPage/>: <Navigate to= "/" />} />
      <Route path="/login" element={!authUser ?<LoginPage/>: <Navigate to= "/" />} />
      <Route path="/setting" element={<SettingPage/>} />
      <Route path="/profile" element={authUser ? <ProfilePage/>: <Navigate  to="/login"/>} />

      </Routes>

      <Toaster />
    </>
  )
}

export default App
