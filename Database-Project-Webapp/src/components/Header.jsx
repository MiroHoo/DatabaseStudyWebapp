
import { useState, useEffect, useRef } from 'react'
import '../css/index.css'
import gif from '../assets/Cool.gif'
import home from '../assets/home.svg'
import plus from '../assets/plus.svg'
import db from '../assets/database.svg'
import user from '../assets/user.svg'
import play from '../assets/play-circle.svg'
import {NavLink} from "react-router-dom";
const BurgerPathOptions = [
  {
    "name": "Home",
    "path": "/",
    "auth": false,
    "icon": home
  },
  {
   "name": "Login",
   "path": "/login",
   "auth": false,
   "icon": user
  },
  {
   "name": "Build",
   "path": "/test",
   "auth": true,
   "icon": plus
  },
  {
   "name": "Manage",
   "path": "/manage",
   "auth": true,
   "icon": db
  },
  {
    "name": "Arcade",
    "path": "/scores",
    "auth": false,
    "icon": play
  }
]
//Json array for holding different burgermenu redirect options. 
const Layout = () =>  {
  var [BurgerArray, setBurger] = useState([])
  const [BurgerVis, setBurgerVis] = useState(false)
  const [Animationstate, setAnimationState] = useState(false)
  const [Auth, setAuth] = useState(false)
  const animationref = useRef()
  
   useEffect(() => {
      fetch("http://127.0.0.1:3002/manage/verify", {
         credentials: 'include'
      }).then(response => response.json()).then(response => response.token === 1 ? setAuth(true) : setAuth(false))
  }, []);

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
  useEffect(()=>{
    fetch("http://127.0.0.1:3002/manage/verify", {
         credentials: 'include'
      }).then(response => response.json()).then(response => response.token === 1 ? setAuth(true) : setAuth(false))
  },[BurgerVis])
  useEffect(()=>{
    Burgermaker()
  },[Auth])


  return (
    <>
      <div className='HeaderContainer'>
        <div className='HeaderContent'>
          <div className='HeaderName'><NavLink to={"/"}><img className="HeaderGif" src={gif}></img></NavLink></div>
          <div className='Burgermenu'>
            <a className='BurgerPatties' onClick={() => {setBurgerVis(!BurgerVis); setAnimationState(true);}}>
            <div className='burgerlayer'></div>
            <div className='burgerlayer'></div>
            <div className='burgerlayer'></div>
            </a>
            
          </div> 
        </div>
        <div>
          </div>
          <div className='HeaderDivider'></div>
      </div>
       { BurgerVis || Animationstate ?
      <div ref={animationref} className={`BurgerContainer ${BurgerVis ? 'open' : 'closed'}`}>
      <div className={"BurgerStack"}>{BurgerArray}</div>
      </div>
      : null
      }
    </>
  )
  
function Burgermaker(){
var Temparray = []
  Temparray = BurgerPathOptions.map(element => {
    if(!element.auth){
    if(element.name !== "Login"){
    return <><NavLink key={element.name + "_Option"} onClick={()=>{setBurgerVis(false); setAnimationState(true);}} className='BurgerOption' to={element.path}><img src={element.icon} className='BurgerImg'/><div className='BurgerCondiment'>{element.name}</div></NavLink></>
    } else if (!Auth){
    return <NavLink key={element.name + "_Option"} onClick={()=>{setBurgerVis(false); setAnimationState(true);}} className='BurgerOption' to={element.path}><img src={element.icon} className='BurgerImg'/><div className='BurgerCondiment'>{element.name}</div></NavLink>
    }
    } else {
      if(Auth){
        return <NavLink key={element.name + "_Option"} onClick={()=>{setBurgerVis(false); setAnimationState(true);}} className='BurgerOption' to={element.path}><img src={element.icon} className='BurgerImg'/><div className='BurgerCondiment'>{element.name}</div></NavLink>
      } 
    }
  });
setBurger(Temparray)
}

}

export default Layout