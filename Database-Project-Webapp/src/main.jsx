import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx'
import Start from './components/Start.jsx'
import TestCreator from './components/TestCreator.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Start/>}/>
      <Route path="/test" element={<TestCreator/>}/>
    </Routes>
  </BrowserRouter>
)