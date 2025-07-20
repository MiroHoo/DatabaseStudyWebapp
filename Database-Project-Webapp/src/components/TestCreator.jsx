
import { useState, useEffect, useRef } from 'react'
import '../css/TestCreator.css'
import Modal from "./Modal.jsx"
function App() {
let questionId = useRef(0)
const [questionarray, setQuestions] = useState([])
const [modal, setModal] = useState(false)
const [modal2, setModal2] = useState(false)
const [inputid, setInputid] = useState(0)
//initialize first question
  useEffect(() => {
  AddQuestion()
  }, []);

  return (
    <div className='Tests'>  
     {
      modal ? <Modal Modalsettings={{type:"input"}} stateChanger={setModal} textChanger={{Change:QuestionName, id:inputid}}/> : <></>
     }
     {
      modal2 ? <Modal Modalsettings={{type:"question", text:"Do you want to submit the test?"}} stateChanger={setModal2} textChanger={{Change:Areyousure, id:inputid}}/> : <></>
     }
    <div>
    {questionarray.map(Questions=>(
      <div className='TestContainer' key={Questions.id}>
        <a onClick={()=>{setInputid(Questions.id-1); setModal(!modal);}} className="TestHeader">{Questions.name}</a>
        <input className='TestInput' id={"Question_" + Questions.id}></input>
        <a className="TestHeader">Model Answer</a>
        <input className='TestInput' id={"ModelAnswer_" + Questions.id}></input>
        <button onClick={()=>VerifyQuestion("ModelAnswer_" + Questions.id)}className='TestVerify'>Verify Model Answer</button>
        <button onClick={()=>RemoveQuestion(Questions.id)}>Delete</button>
      </div>
    ))}
    </div>
    <button onClick={AddQuestion}>+</button>  
    <button onClick={()=>{setModal2(!modal)}}>Submit</button>
    </div>
  )

//function for adding a question to the question array
function AddQuestion() {
questionId.current = questionId.current +1;
console.log(questionId)
setQuestions([...questionarray, {name: "Question " + (questionarray.length+1), id: questionId.current}])
}

//Removes the question with the provided id from the question array
function RemoveQuestion(id){
  questionId.current = questionId.current -1 ;
  setQuestions(questionarray.filter(a => a.id !== id))
}

//Question Header changer
function QuestionName(id, text){
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

function Areyousure(value){
  if(value){
    Submitquestions()
  }
}

function Submitquestions(){
var SubmitArray = []
var index = 1;
questionarray.forEach(element => {
  var Qid = "Question_" + element.id
  var Aid = "ModelAnswer_" + element.id
  var Question = document.getElementById(Qid).value
  var Answer = document.getElementById(Aid).value
  SubmitArray.push({"I":index, "Q":Question, "A":Answer})
  index++;
});
console.log(SubmitArray)
PostRequest(SubmitArray)
}

function VerifyQuestion(Question){
var query = document.getElementById(Question).value
const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "query" : query})
 }

 fetch("http://127.0.0.1:3002/test/verify", options)
 .then(response => response.json())
 .then(response => console.log(response))
}

function PostRequest(PostData){
  var PostFormat = {
    "Name": "Test2",
    "MaxPoints": 20,
    "Questions": PostData  
  }
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify( PostFormat )
  }
 fetch('http://127.0.0.1:3002/test/add', options
 )
 .then(response => response.json())
 .then(response => {
  if(!response){
    console.log("error")
  }
 }).catch(error => {
  console.log(error)
 })

}
}

export default App