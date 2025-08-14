
import { useState, useEffect, useRef } from 'react'
import '../css/index.css'
import gif from '../Images/Cool.gif'
import home from '../Images/home.svg'
import plus from '../Images/plus.svg'
import db from '../Images/database.svg'
import user from '../Images/user.svg'
import play from '../Images/play-circle.svg'
import {NavLink} from "react-router-dom";
//all the options inside the burger menu, this contains the icon, if you need to be authenticated, path and text
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
   "path": "/build",
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
  const [BurgerDis, SetBurgerDIs] = useState(false)
  const animationref = useRef()
  //fetches and sets auth depending of token was set "theres no token inside the frontend, it's only inside the headers"
   useEffect(() => {
      fetch( import.meta.env.VITE_url +"/manage/verify", {
         credentials: 'include'
      }).then(response => response.json()).then(response => response.token === 1 ? setAuth(true) : setAuth(false))
  }, []);
  //keeps up with the animations
  useEffect(() => {
    if(animationref.current !== undefined) {
        animationref.current.addEventListener("animationcancel", () => {
            setAnimationState(false);
          });
        animationref.current.addEventListener("animationend", () => {
            setAnimationState(false);
          });
        }
  }, [animationref.current]);
  //updates burger if needs
  useEffect(()=>{
    fetch( import.meta.env.VITE_url + "/manage/verify", {
         credentials: 'include'
      }).then(response => response.json()).then(response => response.token === 1 ? setAuth(true) : setAuth(false))
  },[BurgerVis])
  //if auth changes rerender burger
  useEffect(()=>{
    Burgermaker()
  },[Auth])


  return (
    <>
      <div className='HeaderContainer'>
        <div className='HeaderContent'>
          <div className='HeaderName'><NavLink to={"/"}><img className="HeaderGif" src={gif}></img></NavLink></div>
          <div className='Burgermenu'>
            <a className='BurgerPatties' onClick={() => {setBurgerVis(!BurgerVis); SetBurgerDIs(true); setAnimationState(true);}}>
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
      <div ref={animationref} className={`BurgerContainer ${BurgerVis ? 'open' : 'closed'} ${BurgerDis ? 'shown' : 'hidden'}`}>
      <div className={"BurgerStack"}>{BurgerArray}</div>
      </div>
      : null
      }
    </>
  )
  
//renders burger
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