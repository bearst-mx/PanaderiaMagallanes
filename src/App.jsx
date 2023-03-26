import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import{
  Home,
  NotFound,
  Panaderia,
  LogIn,
  Admin,
  Worker,
  Home2
}from "./views"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home2 />} />
      <Route path="/Panaderia" element={<Panaderia />} />
      <Route path="/LogIn" element={<LogIn />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Worker" element={<Worker />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App
