import '../css/index.css'
import '../css/start.css'
import gif from '../assets/Cool.gif'
import { useEffect, useState, useRef } from 'react'
const Animation = () => {
    const [state, setState] = useState(false)
    const [AnimationState, setAnimationState] = useState(false)
    //const animationref = useRef<HTMLDivElement>(null)
    /*useEffect(() => {
        animationref.current?.addEventListener("animationcancel", () => {
            setAnimationState(false)
          })
          animationref.current?.addEventListener("animationend", () => {
            setAnimationState(false)
          })
    }, [animationref.current]);*/

    return (
        <>
            <div className='StartContainer'>
                <div className='StartGif'>
                <img src={gif} className='StupidGif'></img>
                </div>
                <div className='SelectionContainer'>
                <div className='ButtonContainer'>
                <button className='StartSelectButton' onClick={() => {setState(!state); setAnimationState(true)}}>Select a test!</button>    
                </div>
                { state || AnimationState ? (    
                    <>
                    <div className={`ListofTests ${state ? '' : 'open'}`} >
                        <ListOfAllTest/>
                    </div>
                    </>
                ) : <></>}
                </div>
            </div>
        </>
    )
}

//For listing all the tests inside the database
function ListOfAllTest() {
    var listofTests = [];
    var siteElement = []; 
    for(var i = 0; i<3; i++){
        listofTests[i] = "Test " + i
    }
    listofTests.forEach(element => {
        siteElement.push(<a key={element} onClick={() => console.log(element)} className='StartListItem'>{element}</a>)
    });
    return siteElement
}

export default function App() {
    //Test for trying to get the ref working correctly for animaiting. 
    return (
      <>
          <Animation/>
      </>
    );
  }
