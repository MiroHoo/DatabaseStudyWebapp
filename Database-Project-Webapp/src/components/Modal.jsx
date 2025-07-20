
import { useState, useEffect, useRef } from 'react'
import '../css/Modal.css'

function App({Modalsettings, stateChanger, textChanger}) {
    const [input, setInput] = useState('Default Value')
    return (
    <div className="ModalContainer">
    { Modalsettings.type === "text" ? 
    <dialog id={"Modal"} className="ModalDialog" open={true}><a>{Modalsettings.text}</a><button onClick={()=>{closemodal(); stateChanger(false); }}>Close</button></dialog>
    : <></>
    }
    { Modalsettings.type === "input" ? 
    <dialog id={"Modal"} className="ModalDialog" open={true}>
        <input className='ModalInput' onChange={e => setInput(e.target.value)} placeholder='...'></input>
        <div className='ModalButtons'>
        <button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); textChanger.Change(textChanger.id,input)}}>Submit</button>
        <button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false);}}>Cancel</button>
        </div>
    </dialog>
    : <></>
    }
    { Modalsettings.type === "question" ? 
    <dialog id={"Modal"} className="ModalDialog" open={true}><a>{Modalsettings.text}</a> <div className='ModalButtons'><button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); Modalsettings.inputfunction(true, Modalsettings.function, Modalsettings.funcvar)}}>Ok</button><button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); }}>Cancel</button></div></dialog>
    : <></>
    }
    </div>
    )

}
function closemodal(){
    const dialog = document.querySelector("dialog");
    dialog.close();
}

function changeText(){
    setText("changed text")
}

export default App;