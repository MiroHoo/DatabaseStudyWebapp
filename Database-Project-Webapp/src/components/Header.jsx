
import { useState, useEffect, useRef } from 'react'
import '../css/index.css'
import gif from '../assets/Cool.gif'
import {NavLink} from "react-router-dom";
const BurgerPathOptions = [
  {
    "name": "Home",
    "path": "/",
    "auth": false
  },
  {
   "name": "Login",
   "path": "/login",
   "auth": false
  },
  {
   "name": "Build",
   "path": "/test",
   "auth": true
  },
  {
   "name": "Manage",
   "path": "/manage",
   "auth": true
  },
]
//Json array for holding different burgermenu redirect options. 
var BurgerArray = []
const Layout = () =>  {
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
      <Burgermaker auth={Auth}/>
      </div>
      : null
      }
    </>
  )
  
}

function Burgermaker(props){
  if(BurgerArray.length < 1) {
  console.log("here")
  BurgerPathOptions.forEach(element => {
    if(!element.auth){
    BurgerArray.push(<NavLink key={element.name + "_Option"} onClick={()=>{setBurgerVis(!BurgerVis); setAnimationState(true);}} className='BurgerOption' to={element.path}>{element.name}</NavLink>)
    } else {
      if(props.auth){
        BurgerArray.push(<NavLink key={element.name + "_Option"} onClick={()=>{setBurgerVis(!BurgerVis); setAnimationState(true);}} className='BurgerOption' to={element.path}>{element.name}</NavLink>)
      } 
    }
  });
}
  return BurgerArray
}

export default Layout