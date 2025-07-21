import '../css/index.css'
import '../css/start.css'
import gif from '../assets/Cool.gif'
import { useEffect, useState, useRef } from 'react'
const Animation = () => {
    const [listoftests, setListOfTests] = useState([])
    const [state, setState] = useState(false)
    const [AnimationState, setAnimationState] = useState(false)
    const animationref = useRef()
      useEffect(() => {
       fetch('http://127.0.0.1:3002/test/')
        .then(response => response.json())
        .then(response => formattests(response))
        .catch(error => console.log(error))
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
            <div className='StartContainer'>
                <div className='StartGif'>
                <img src={gif} className='StupidGif'></img>
                </div>
                <div className='SelectionContainer'>
                <div className='ButtonContainer'>
                <button className='StartSelectButton' onClick={() => {setState(!state); setAnimationState(true);}}>Select a test!</button>    
                </div>
                { state || AnimationState ?     
                    <>
                    <div ref={animationref} className={`ListofTests ${state ? 'open' : 'closed'}`} >
                        {listoftests.map(test => (<a key={test.TestId} onClick={() => console.log(test.Name)} className='StartListItem'>{test.Name}</a>))}
                    </div>
                    </>
                 : null}
                </div>
            </div>
        </>
    )
    function ListOfAllTest() {
        console.log(listoftests)
   return <>{listoftests}</>
    }
function formattests(val){
    setListOfTests(val)
    console.log(val)
}
}

//For listing all the tests inside the database


export default function App() {
    //Test for trying to get the ref working correctly for animaiting. 
    return (
      <>
          <Animation/>
      </>
    );
  }
