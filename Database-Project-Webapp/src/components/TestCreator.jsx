
import { useState, useEffect, useRef } from 'react'
import '../css/TestCreator.css'
import Modal from "./Modal.jsx"
function App() {
let questionId = useRef(0)
const [questionarray, setQuestions] = useState([])
const [modal, setModal] = useState(false)
const [inputid, setInputid] = useState(0)
//initialize first question
  useEffect(() => {
  AddQuestion()
  }, []);

  return (
    <div className='Tests'>  
     {
      modal ? <Modal Modalsettings={{text:"This is a placeholder text", type:"input"}} stateChanger={setModal} textChanger={{Change:QuestionName, id:inputid}}/> : <></>
     }
    <div>
    {questionarray.map(Questions=>(
      <div className='TestContainer' key={Questions.id}>
        <a onClick={()=>{setInputid(Questions.id-1); setModal(!modal)}} className="TestHeader">{Questions.name}</a>
        <input className='TestInput'></input>
        <a className="TestHeader">Model Answer</a>
        <input className='TestInput'></input>
        <button className='TestVerify'>Verify Model Answer</button>
        <button onClick={()=>RemoveQuestion(Questions.id)}>Delete</button>
      </div>
    ))}
    </div>
    <button onClick={AddQuestion}>+</button>  
    <button>Submit</button>
    </div>
  )
//function for adding a question to the question array
function AddQuestion() {
questionId.current = questionId.current +1;
setQuestions([...questionarray, {name: "Question " + (questionarray.length+1), id: questionId.current}])
}
function RemoveQuestion(id){
  setQuestions(questionarray.filter(a => a.id !== id))
}
function QuestionName(id, text){
  console.log(modal)
  const UpdatedName = questionarray.map((c,i) => {
    if (i === id){
      c.name = text
      return c
    } else {
      return c
    }
  })
  setQuestions(UpdatedName)
  
}
}

export default App