import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx'
import Start from './components/Start.jsx'
import TestCreator from './components/TestCreator.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <Start />
  </StrictMode>,
)
