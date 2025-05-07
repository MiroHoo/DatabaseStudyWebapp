
import { useState } from 'react'
import '../css/index.css'
import {createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import TestPage from './TestCreator'
import StartPage from './Start'
const BurgerPathOptions = [
  {
    "name": "Home",
    "path": "/"
  },
  {
    "name": "Degug",
    "path": "/Test"
  },
  {
   "name": "Login",
   "path": "/Test"
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
const guide = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [{
      path: '/test',
      element: <TestPage/>
    }, {
      path: '/start',
      element: <StartPage/>
    }
  
  ]
  }
])
function Burgermaker(){
  if(BurgerArray.length < 1) {
  console.log("here")
  BurgerPathOptions.forEach(element => {
    BurgerArray.push(<Link key={element.name + "_Option"} className='BurgerOption' to={element.path}>{element.name}</Link>)
  });
}
  return BurgerArray
}

const App = () => {
  return <RouterProvider router={guide}/>
}

export default App