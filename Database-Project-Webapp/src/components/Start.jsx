import '../css/index.css'
import '../css/start.css'
import { useEffect, useState, useRef } from 'react'
import Modal from "./Modal.jsx"
import { redirect, useNavigate } from "react-router";
import Zoom from "./ERZoom.jsx"
const Animation = () => {
    let navigate = useNavigate();
    const [modal, setModal] = useState(false)
    const [ModalSettings, setSettings] = useState({
        "type": "",
        "text": "",
        "function": "",
    })
    //list of all tests 
    const [listoftests, setListOfTests] = useState([])
    //search filter list
    const [searchList, setSearch] = useState([])
    //if list is open
    const [TestListState, setState] = useState(false)
    //if animation is playing
    const [AnimationState, setAnimationState] = useState(false)
    //input usestate
    const [input, setInput] = useState("")
    const animationref = useRef()
    //fetches tests
      useEffect(() => {
       fetch( import.meta.env.VITE_url +'/test/')
        .then(response => response.json())
        .then(response => formattests(response))
        .catch(error => console.log(error))
        }, []);
    //keeps up with animations and makes sure they are in sync even after anomalies like quick clicking
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

    return (
        <>
            <div className='StartContainer'>
                <div className='HeaderText'>
                <img className="LogoImage" src={"/Images/Databaselearningapp.png"}/>
                </div>
                <div className='SelectionContainer'>
                    {
                modal ? <ModalSetter /> : <></>
                    }
                <div className='ButtonContainer'>
                <button className='StartSelectButton' onClick={()=>{setState(!TestListState); setAnimationState(true);}}>SELECT A TEST</button>    
                </div>
                { TestListState || AnimationState ?     
                    <>
                    <div ref={animationref} className={`ListofTests ${TestListState ? 'open' : 'closed'}`} >
                        <input name={"Search"} autoComplete={"off"} id={"Search"} className={"SearchFunc"} onChange={(e)=> {setInput(e.target.value), SearchFilter(e.target.value)}} value={input} placeholder='Search'/>
                        <div className='StartListCont'>
                        { searchList.length > 0 ?
                        <>{searchList.map(test => (<a key={test.TestId} onClick={() => StartTest(test.Name, test.TestId)} className='StartListItem'>{test.Name}</a>))}</> :<div className='NoTestsFound'>None Found</div>
                        }   
                        </div>
                    </div>
                    </>
                 : null}
                </div>
            </div>
        </>
    )
//sets tests into a list and initializes search fucntion
function formattests(val){
    setSearch(val)
    setListOfTests(val)
}
//search function called upon the search input being changed
function SearchFilter(text){
    setSearch(listoftests.filter((tests) => tests.Name.toLowerCase().includes(text.toLowerCase())))
}
//ask user if they want to start the tests
function StartTest(name, id){
  setSettings({
  type: "question",
  text:"Do you want to start " + name +"?",
  function:direct,
  funcvar:id
  })
  setModal(!modal);
}
//redirects to test
function direct(ok, id){
    redirect(navigate(`/test/${id}`))
}
//Modal init
  function ModalSetter() {
        return <Modal Modalsettings={{ type: ModalSettings.type, text: ModalSettings.text, function: ModalSettings.function, funcvar: ModalSettings.funcvar }} stateChanger={setModal} />
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
