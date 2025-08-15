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
            <input autoComplete={"off"} className={"LoginInput"} onChange={e => setUsername(e.target.value)} value={Username} placeholder="Username"></input>
            <div className="LoginHeader" >Password</div>
            <input autoComplete={"off"} type={"password"} className={"LoginInput"} onChange={e => setPassword(e.target.value)} placeholder="Password" value={Password}>
            </input>
            <button onClick={()=>Loginfetch()}className="LoginButton">Login</button>
            </div>
    )
    //sends login data to be verified
    function Loginfetch(){
        if(Username.length > 3 && Password.length > 3){
        const url =  import.meta.env.VITE_url + "/manage/login/"
        const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                credentials: 'include',
                body: JSON.stringify({"username": Username, "Password": Password})
            }
        fetch(url,options).then(response => response.json()).then(reponse => LoginVerify(reponse) )
        } else {
            setSettings({
            "type": "text",
            "text": "One or both of the inputs is empty"
        })
        setModal(!modal)
        }
    }
    //modal init
    function ModalSetter() {
        return <Modal Modalsettings={{ type: ModalSettings.type, text: ModalSettings.text, function: ModalSettings.function }} stateChanger={setModal} />
    }
    //message to tell the user the login failed
    function MessageModal(){
        setSettings({
            "type": "text",
            "text": "The login was unsuccessful"
        })
        setModal(!modal)
    }
    //message to tell the user they've logged in and redirects them
    function LoginMessage(){
        setSettings({
            "type": "question",
            "text": "The login was succesfull",
            "function": Nav
        })
        setModal(!modal)
    }
    //verifies if the login was succesfull depending on the response
    function LoginVerify(res){
        if(res.outcome === "success"){
            LoginMessage()
        } else {    
            MessageModal()
        }
    }
    //redirects to home
    function Nav(){
        navigate("/")
    }
}

export default App;
