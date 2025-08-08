import '../css/index.css'
import '../css/start.css'
import gif from '../assets/Cool.gif'
import logo from '../assets/Databaselearningapp.png'
import { useEffect, useState, useRef } from 'react'
import Modal from "./Modal.jsx"
import { redirect, useNavigate } from "react-router";

const Animation = () => {

    let navigate = useNavigate();
    const [modal, setModal] = useState(false)
    const [ModalSettings, setSettings] = useState({
        "type": "",
        "text": "",
        "function": "",
    })
    const [listoftests, setListOfTests] = useState([])
    const [searchList, setSearch] = useState([])
    const [state, setState] = useState(false)
    const [AnimationState, setAnimationState] = useState(false)
    const [input, setInput] = useState("")
    const animationref = useRef()
      useEffect(() => {
       fetch('http://127.0.0.1:3002/test/')
        .then(response => response.json())
        .then(response => formattests(response))
        .then(response => console.log(response))
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
                <img className="LogoImage" src={logo}/>
                </div>
                <div className='SelectionContainer'>
                    {
                modal ? <ModalSetter /> : <></>
                    }
                <div className='ButtonContainer'>
                <button className='StartSelectButton' onClick={()=>{setState(!state); setAnimationState(true);}}>SELECT A TEST</button>    
                </div>
                { state || AnimationState ?     
                    <>
                    <div ref={animationref} className={`ListofTests ${state ? 'open' : 'closed'}`} >
                        <input name={"Search"} id={"Search"} className={"SearchFunc"} onChange={(e)=> {setInput(e.target.value), SearchFilter(e.target.value)}} value={input} placeholder='Search'/>
                        <div className='StartListCont'>
                        {searchList.map(test => (<a key={test.TestId} onClick={() => StartTest(test.Name, test.TestId)} className='StartListItem'>{test.Name}</a>))}
                        </div>
                    </div>
                    </>
                 : null}
                </div>
            </div>
        </>
    )
function formattests(val){
    setSearch(val)
    setListOfTests(val)
}

function SearchFilter(text){
    setSearch(listoftests.filter((tests) => tests.Name.toLowerCase().includes(text.toLowerCase())))
}

function StartTest(name, id){
  setSettings({
  type: "question",
  text:"Do you want to start " + name +"?",
  function:direct,
  funcvar:id
  })
  setModal(!modal);
}
function direct(ok, id){
    redirect(navigate(`/testtaking/${id}`))
}
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
