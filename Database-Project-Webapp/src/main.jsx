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
      <Route path="/" element={<Start/>}/>
      <Route path="/test" element={<TestCreator/>}/>
      <Route path="/testtaking/:testId" element={<TestTaker/>}/>
      <Route path="/manage" element={<Manage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/arcade" element={<Arcade/>}/>
      <Route path="/scores" element={<ArcadeScores/>}/>
    </Routes>
  </BrowserRouter>
)