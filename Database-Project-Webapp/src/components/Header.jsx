
import { useState, useEffect, useRef } from 'react'
import '../css/index.css'
import {NavLink} from "react-router-dom";
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
   {
   "name": "Test",
   "path": "/testtaking"
  },
]
//Json array for holding different burgermenu redirect options. 
var BurgerArray = []
const Layout = () =>  {
  const [BurgerVis, setBurgerVis] = useState(false)
  const [Animationstate, setAnimationState] = useState(false)
  const animationref = useRef()
  
  useEffect(() => {
    if(animationref.current !== undefined) {
        animationref.current.addEventListener("animationcancel", () => {
            console.log("cancel")
            setAnimationState(false);
          });
        animationref.current.addEventListener("animationend", () => {
            console.log("End")
            setAnimationState(false);
          });
        }
  }, [animationref.current]);

  return (
    <>
      <div className='HeaderContainer'>
        <div className='HeaderContent'>
          <a className='HeaderName'>Database Learning Webapp</a>
          <a className='Burgermenu' onClick={() => {setBurgerVis(!BurgerVis); setAnimationState(true);}}>
            <div className='burgerlayer'></div>
            <div className='burgerlayer'></div>
            <div className='burgerlayer'></div>
          </a> 
        </div>
        <div>
          </div>
      </div>
      { BurgerVis || Animationstate ?
      <div ref={animationref} className={`BurgerContainer ${BurgerVis ? 'open' : 'closed'}`}>
      <Burgermaker/>
      </div>
      : null
      }
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