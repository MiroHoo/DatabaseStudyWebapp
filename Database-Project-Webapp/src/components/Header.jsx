
import { useState, useEffect, useRef } from 'react'
import '../css/index.css'
import {NavLink} from "react-router-dom";
//all the options inside the burger menu, this contains the icon, if you need to be authenticated, path and text
const BurgerPathOptions = [
  {
    "name": "Home",
    "path": "/",
    "auth": "/Images/home.svg",
  
  },
  {
   "name": "Login",
   "path": "/login",
   "auth": "/Images/user.svg",

  },
  {
   "name": "Build",
   "path": "/build",
   "auth": "/Images/plus.svg",

  },
  {
   "name": "Manage",
   "path": "/manage",
   "auth": "/Images/database.svg",

  },
  {
    "name": "Arcade",
    "path": "/scores",
    "auth": "/Images/play-circle.svg",
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
          <div className='HeaderName'><NavLink to={"/"}><img className="HeaderGif" src={"/Images/Cool.gif"}></img></NavLink></div>
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
    return <><NavLink key={element.name + "_Option"} onClick={()=>{setBurgerVis(false); setAnimationState(true);}} className='BurgerOption' to={element.path}><img src={"/Images/chevron-up.svg"} className='BurgerImg'/><div className='BurgerCondiment'>{element.name}</div></NavLink></>
    } else if (!Auth){
    return <NavLink key={element.name + "_Option"} onClick={()=>{setBurgerVis(false); setAnimationState(true);}} className='BurgerOption' to={element.path}><img src={"/Images/chevron-up.svg"} className='BurgerImg'/><div className='BurgerCondiment'>{element.name}</div></NavLink>
    }
    } else {
      if(Auth){
        return <NavLink key={element.name + "_Option"} onClick={()=>{setBurgerVis(false); setAnimationState(true);}} className='BurgerOption' to={element.path}><img src={"/Images/chevron-up.svg"} className='BurgerImg'/><div className='BurgerCondiment'>{element.name}</div></NavLink>
      } 
    }
  });
setBurger(Temparray)
}

}

export default Layout