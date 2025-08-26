import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/Signup'
import Expenses from './pages/Expenses'
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className=" m-auto ">
          <Routes>
            <Route path="/expenses" element={!user ? <Login /> : <Expenses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  )
}

export default App
