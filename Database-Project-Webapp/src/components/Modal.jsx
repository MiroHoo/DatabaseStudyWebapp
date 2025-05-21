
import { useState, useEffect, useRef } from 'react'
import '../css/Modal.css'

function App({Modalsettings, stateChanger, textChanger}) {

    const [input, setInput] = useState('')

    return (
    <>
    { Modalsettings.type === "text" ? 
    <dialog id={"Modal"} open={true}><a>{Modalsettings.text}</a><button onClick={()=>{closemodal(); stateChanger(false); }}>Close</button></dialog>
    : <></>
    }
    { Modalsettings.type === "input" ? 
    <dialog id={"Modal"} open={true}><input onChange={e => setInput(e.target.value)}placeholder='...'></input><button onClick={()=>{closemodal(); stateChanger(false); textChanger.Change(textChanger.id,input)}}>Close</button></dialog>
    : <></>
    }
    </>
    )
}

function closemodal(){
    const dialog = document.querySelector("dialog");
    dialog.close();
}

export default App;