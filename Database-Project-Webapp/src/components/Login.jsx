import { useState } from "react";
import Modal from "./Modal.jsx"
import '../css/Login.css'
import { useNavigate } from "react-router";

function App() {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [modal, setModal] = useState(false)
    const [ModalSettings, setSettings] = useState({
        "type": "",
        "text": "",
        "function": "",
    })
    const navigate = useNavigate()
    return (
        <div className="LoginContainer"> 
            {
                modal ? <ModalSetter /> : <></>
            }
            <div className="LoginHeader">Username</div>
            <input className={"LoginInput"} onChange={e => setUsername(e.target.value)} value={Username} placeholder="username"></input>
            <div className="LoginHeader" >Password</div>
            <input className={"LoginInput"} onChange={e => setPassword(e.target.value)} placeholder="password" value={Password}>
            </input>
            <button onClick={()=>Loginfetch()}className="LoginButton">Login</button>
            </div>
    )

    function Loginfetch(){
      const url = "http://127.0.0.1:3002/manage/login/"
      const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                credentials: 'include',
                body: JSON.stringify({"username": Username, "Password": Password})
            }
        fetch(url,options).then(response => response.json()).then(reponse => LoginVerify(reponse) )
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
    function LoginMessage(){
        setSettings({
            "type": "question",
            "text": "The Login was succesfull",
            "function": Nav
        })
        setModal(!modal)
    }
    function LoginVerify(res){
        if(res.outcome === "success"){
            LoginMessage()
        } else {    
            MessageModal()
        }
    }
    function Nav(){
        navigate("/")
    }
}

export default App;
