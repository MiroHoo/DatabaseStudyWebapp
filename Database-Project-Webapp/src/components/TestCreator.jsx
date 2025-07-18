
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
        <a onClick={()=>{setInputid(Questions.id-1); setModal(!modal); console.log(Questions.id-1)}} className="TestHeader">{Questions.name}</a>
        <input className='TestInput'></input>
        <a className="TestHeader">Model Answer</a>
        <input className='TestInput' id={"ModelAnswer_" + Questions.id}></input>
        <button onClick={()=>VerifyQuestion("ModelAnswer_" + Questions.id)}className='TestVerify'>Verify Model Answer</button>
        <button onClick={()=>RemoveQuestion(Questions.id)}>Delete</button>
      </div>
    ))}
    </div>
    <button onClick={AddQuestion}>+</button>  
    <button onClick={Submitquestions}>Submit</button>
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
const options = {
    method: 'POST',
    body: { "query" : Question}
 }
 fetch( '127.0.0.1:3001/test/verify/', options
 ).then(response => response.json())
 .then(response => console.log(response))
}

function PostRequest(PostData){
  console.log("Post")
  const options = {
    method: 'POST',
    body: JSON.stringify( PostData )
  }
 fetch( 'https://localhost:3001', options
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