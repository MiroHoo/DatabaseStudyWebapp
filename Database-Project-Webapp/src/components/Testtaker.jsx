import '../css/index.css'
import '../css/start.css'
import '../css/TestTaker.css'
import gif from '../assets/Cool.gif'
import Modal from "./Modal.jsx"
import { useEffect, useState, useRef } from 'react'
import { useParams } from "react-router";


const App = () => {
    
    let params = useParams();
    const [modal, setModal] = useState(false)
    const [TestQuestions, setQuestions] = useState([])
    
const [ModalSettings, setSettings] = useState({
  "type":"",
  "text":"",
  "function": "",
})
    useEffect(() => {
        var url = "http://127.0.0.1:3002/test/id/"+params.testId
        fetch(url).then(response => response.json()).then(response => Questions(response))
    }, []);

    return (
        <div className="Taking"> 
            {
                modal ? <ModalSetter/> : <></>
            }  
            {TestQuestions.map(question => (<div id={question.QuestionId} key={question.QuestionId}  className='TakingContainer'><a className="TakingHeader">{question.Question}</a><input className='Answer' id={question.QuestionId + "_input"}></input><button className="SubmitAnswer"onClick={()=>verify(question.QuestionId)}>Submit</button></div>))}
        </div>
    )

    function Questions(res){
        setQuestions(res)
    }

    function verify(id){
            var answer = document.getElementById(id+"_input").value
            let nocapsanswer = answer.toLowerCase();
            if(nocapsanswer.includes("delete")){
                setSettings({
                    type: "text",
                    text: "Answer cannot include `delete` for obivious reasons! ",
                })
                setModal(!modal)
            } else {
                 setSettings({
                    type: "text",
                    text: "The Answer has been sent",
                })
                setModal(!modal)
            }
    }

    function ModalSetter(){
        return <Modal Modalsettings={{type:ModalSettings.type, text:ModalSettings.text}} stateChanger={setModal} textChanger={{Change:ModalSettings.function}}/> 
    }

    function  wronganswer(id) {

    }
}

export default App