import { useState } from "react";
import Modal from "./Modal.jsx"
import '../css/Login.css'

function App() {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [modal, setModal] = useState(false)
    const [ModalSettings, setSettings] = useState({
        "type": "",
        "text": "",
        "function": "",
    })
    return (
        <div className="LoginContainer"> 
            {
                modal ? <ModalSetter /> : <></>
            }
            <h className="LoginHeader">Username</h>
            <input className={"LoginInput"} onChange={e => setUsername(e.target.value)} value={Username} placeholder="username"></input>
            <h className="LoginHeader" >Password</h>
            <input className={"LoginInput"} onChange={e => setPassword(e.target.value)} placeholder="password" value={Password}>
            </input>
            <button className="LoginButton">Login</button>
            </div>
    )

    function Loginfetch(){

      const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: Username, password: Password})
            }
        fetch(url,options).then(response => response.json()).then(reponse => LoginVerify(res) )
    }
    function ModalSetter() {
        return <Modal Modalsettings={{ type: ModalSettings.type, text: ModalSettings.text, function: ModalSettings.function }} stateChanger={setModal} />
    }
    function MessageModal(){
        setSettings({
            "type": "text",
            "text": "The Login was unsuccessful"
        })
        setModal(!modal)
    }
    function LoginVerify(res){
        if(res.outcome === true){
            //set cookies
        } else {    
            MessageModal()
        }
    }
}

export default App;
