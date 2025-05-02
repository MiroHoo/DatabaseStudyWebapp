import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from './components/Header.jsx'
import Start from './components/Start.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Index/>  
    <Start/>
  </StrictMode>,
)
