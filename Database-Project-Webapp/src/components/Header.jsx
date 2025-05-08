
import { useState } from 'react'
import '../css/index.css'
import {createBrowserRouter, NavLink, Outlet, RouterProvider } from "react-router-dom";
import TestPage from './TestCreator.jsx'
import StartPage from './Start.jsx'
const BurgerPathOptions = [
  {
    "name": "Home",
    "path": "/"
  },
  {
    "name": "Degug",
    "path": "/start"
  },
  {
   "name": "Login",
   "path": "/test"
  },
]
var BurgerArray = []
const Layout = () =>  {
  const [BurgerVis, setBurgerVis] = useState(false)
  //Json array for holding different burgermenu redirect options. 
  return (
    <>
      <div className='HeaderContainer'>
        <div className='HeaderContent'>
          <a className='HeaderName'>Database Learning Webapp</a>
          <a className='Burgermenu' onClick={() => {setBurgerVis(!BurgerVis)}}>
            <div className='burgerlayer'></div>
            <div className='burgerlayer'></div>
            <div className='burgerlayer'></div>
          </a>
        </div>
        <div>
          </div>
      </div>
      <div className={`BurgerContainer ${BurgerVis ? 'open' : ''}`}>
      <Burgermaker/>
      </div>
    </>
  )
}
function Burgermaker(){
  if(BurgerArray.length < 1) {
  console.log("here")
  BurgerPathOptions.forEach(element => {
    BurgerArray.push(<NavLink key={element.name + "_Option"} className='BurgerOption' to={element.path}>{element.name}</NavLink>)
  });
}
  return BurgerArray
}

export default Layout