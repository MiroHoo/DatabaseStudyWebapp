import '../css/index.css'
import '../css/start.css'
import gif from '../assets/Cool.gif'
import { useEffect, useState, useRef } from 'react'

import { useNavigate } from "react-router";

const Animation = () => {

    let navigate = useNavigate();
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
                <div className='HeaderText'>
                Database learning app 
                </div>
                <div className='SelectionContainer'>
                <div className='ButtonContainer'>
                <button className='StartSelectButton' onClick={()=>{setState(!state); setAnimationState(true);}}>Select a test!</button>    
                </div>
                { state || AnimationState ?     
                    <>
                    <div ref={animationref} className={`ListofTests ${state ? 'open' : 'closed'}`} >
                        {listoftests.map(test => (<a key={test.TestId} onClick={() => navigate(`/testtaking/${test.TestId}`)} className='StartListItem'>{test.Name}</a>))}
                    </div>
                    </>
                 : null}
                </div>
            </div>
        </>
    )
function formattests(val){
    setListOfTests(val)
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
