
import { useState, useEffect, useRef } from 'react'
import '../css/Modal.css'

function App({Modalsettings, stateChanger}) {
    const [input, setInput] = useState('Default Value')
     useEffect(() => {
    console.log(Modalsettings)
  }, []);
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
    <dialog id={"Modal"} className="ModalDialog" open={true}><a className={"ModalText"}>{Modalsettings.text}</a> <div className='ModalButtons'><button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); Modalsettings.function(true, Modalsettings.funcvar)}}>Ok</button><button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); }}>Cancel</button></div></dialog>
    : <></>
    }
    </div>
    )

}
function closemodal(){
    const dialog = document.querySelector("dialog");
    dialog.close();
}

function optionalFunc(func){
  if(func !== undefined){
    console.log(func)
    func();
  }
}

export default App;