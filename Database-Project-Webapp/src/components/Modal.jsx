
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
    <dialog id={"Modal"} className="ModalDialog" open={true}><a>{Modalsettings.text}</a><button onClick={()=>{console.log(textChanger.Change); optionalFunc(textChanger.Change); closemodal(); stateChanger(false);}}>Close</button></dialog>
    : <></>
    }
    { Modalsettings.type === "input" ? 
    <dialog id={"Modal"} className="ModalDialog" open={true}>
        <input className='ModalInput' onChange={e => setInput(e.target.value)} placeholder={Modalsettings.text}></input>
        <div className='ModalButtons'>
        <button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); Modalsettings.function(Modalsettings.id,input)}}>Submit</button>
        <button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false);}}>Cancel</button>
        </div>
    </dialog>
    : <></>
    }
    { Modalsettings.type === "question" ? 
    <dialog id={"Modal"} className="ModalDialog" open={true}><a>{Modalsettings.text}</a> <div className='ModalButtons'><button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); textChanger.function(true, Modalsettings.function, Modalsettings.funcvar)}}>Ok</button><button className="ModalButton" onClick={()=>{closemodal(); stateChanger(false); }}>Cancel</button></div></dialog>
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
    console.log(func)
  if(func !== undefined){
    func();
  }
}

export default App;