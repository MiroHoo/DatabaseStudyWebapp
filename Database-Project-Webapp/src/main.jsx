import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from "react";
import { BrowserRouter, createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx'
import Start from './components/Start.jsx'
import TestCreator from './components/TestCreator.jsx'
import TestTaker from './components/TestTaker.jsx'
import Manage from './components/Management.jsx'
import Login from './components/Login.jsx'
import Arcade from './components/Arcade.jsx'
import ArcadeScores from './components/ArcadeScores.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<h1>Start Page</h1>}/>
      <Route path="/build" element={<h1>build Page</h1>}/>
      <Route path="/test/:testId" element={<h1>test Page</h1>}/>
      <Route path="/manage" element={<h1>manage Page</h1>}/>
      <Route path="/login" element={<h1>login Page</h1>}/>
      <Route path="/arcade" element={<h1>arcade Page</h1>}/>
      <Route path="/scores" element={<h1>scores Page</h1>}/>
    </Routes>
  </BrowserRouter>
)