
import { useState, useEffect, useRef } from 'react'
import '../css/Modal.css'
import ErModel from "../Images/ErModel.png"
import Zoom from './ERZoom'
function App({Modalsettings, stateChanger}) {
    //modal input value
    const [input, setInput] = useState('Default Value')
    //this returns the right modal depending on the value inside the "modalsettings" variable found inside every component code. I will rewrite this if I get around to it. Not my best code.
    return (
    <div className="ModalContainer">
    { Modalsettings.type === "text" ? 
    <dialog id={"Modal"} className="ModalDialog" open={true}><a className={"ModalText"}>{Modalsettings.text}</a><button onClick={()=>{optionalFunc(Modalsettings.function); closemodal(); stateChanger(false);}}  className="ModalButton">Close</button></dialog>
    : <></>
    }
    { Modalsettings.type === "input" ? 
    <dialog id={"Modal"} className="ModalDialog" open={true}>
        <input className='ModalInput' onChange={e => setInput(e.target.value)} placeholder={Modalsettings.text}></input>
        <div className='ModalButtons'>
        <button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); Modalsettings.function(input,Modalsettings.funcvar)}}>Submit</button>
        <button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false);}}>Cancel</button>
        </div>
    </dialog>
    : <></>
    }
    { Modalsettings.type === "question" ? 
    <dialog id={"Modal"} className="ModalDialog" open={true}><a className={"ModalText"}>{Modalsettings.text}</a> <div className='ModalButtons'><button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); Modalsettings.function(true, Modalsettings.funcvar)}}>Ok</button><button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); Modalsettings.cancelfunc}}>Cancel</button></div></dialog>
    : <></>
    }
    { Modalsettings.type === "ER" ? 
      <dialog id={"Modal"} className="ModalDialog" open={true}><Zoom/><button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); Modalsettings.cancelfunc}}>Close</button></dialog>
    : <></>
    }
    </div>
    )

}
//closes modal
function closemodal(){
    const dialog = document.querySelector("dialog");
    dialog.close();
}
//takes in function to be used
function optionalFunc(func){
  if(func !== undefined){
    func();
  }
}

export default App;