
import { useState, useEffect, useRef } from 'react'
import '../css/TestCreator.css'
import Modal from "./Modal.jsx"

import { useNavigate } from "react-router";


function App() {
let navigate = useNavigate();
//current question
let questionId = useRef(0)
//formatted questions to display
const [questionarray, setQuestions] = useState([])
//modal state on/off
const [modal, setModal] = useState(false)
const [inputid, setInputid] = useState(0)
const [Testname, setTestName] = useState("Testname")
const [ModalSettings, setSettings] = useState({
  "type":"",
  "text":"",
  "function": "",
})
  //scrolls to the modal if called
  useEffect(()=> {
  if(modal){
  window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
  }
  },[modal])

  //initialize first question
  useEffect(() => {
  AddQuestion()
  }, []);
  
  return (
    <div className='Tests'> 
    <div className="TestHeader active" onClick={()=>ChangeTestName()}>{Testname} <img className={"EditIcon"} src={`/images/edit.svg`} alt='Edit'/></div>
    <div>
      {
      modal ? <div id="ModalDiv"><ModalSetter/></div> : <></>
     }
    {questionarray.map(Questions=>(
      <div className='TestContainer' key={Questions.id}>
        <div className="TestHeader">{Questions.name}</div>
        <input autoComplete={"off"} className='TestInput' id={"Question_" + Questions.id}></input>
        <div className="TestHeader">Model Answer</div>
        <input autoComplete={"off"} className='TestInput' id={"ModelAnswer_" + Questions.id}></input>
        <button onClick={()=>VerifyQuestion("ModelAnswer_" + Questions.id)} className='TestVerify'>Verify Answer</button>
        <button className="deleteBtn" onClick={()=>RemoveQuestion(Questions.id)}>Delete</button>
      </div>
    ))}
    </div>
    <button className="addBtn"onClick={AddQuestion}>+</button>  
    <button className="submitBtn" onClick={()=>{QuestionModal("Are you sure you want to submit the test?", Areyousure)}}>Submit</button>
    </div>
  )


  
//function for adding a question to the question array
function AddQuestion() {
questionId.current = questionId.current +1;
setQuestions([...questionarray, {name: "Question " + (questionarray.length+1), id: questionId.current}])
}
//changes the testname
function ChangeTestName(){
  setSettings({
  type: "input",
  text:"Change Test Name",
  function:TestName,
  })
  setModal(!modal);
}
//sets the usestate of testname
function TestName(TestName){
  setTestName(TestName)
}
//Modal for asking the user something
function QuestionModal(text, func, funcvar){
  if(funcvar){
  setSettings({
  type: "question",
  text: text,
  function:func,
  funcvar: funcvar
  })  
  } else {
  setSettings({
  type: "question",
  text: text,
  function:func,
  })  
  }
  setModal(!modal);
}

//modal element init
function ModalSetter(){
  return <Modal Modalsettings={{type:ModalSettings.type, text:ModalSettings.text, function:ModalSettings.function, funcvar:ModalSettings.funcvar}} stateChanger={setModal}/> 
}

//Removes the question with the provided id from the question array
function RemoveQuestion(id){
  setQuestions(questionarray.filter(a => a.id !== id))
}

//Makes sure the user wants the test to be sent
function Areyousure(value){
  if(value){
    Submitquestions()
  }
}

//Sends the test to the database
async function Submitquestions(){
var SubmitArray = []
var index = 1;
var fail = 0;
//formats data
questionarray.forEach(element => {
  var Qid = "Question_" + element.id
  var Aid = "ModelAnswer_" + element.id
  var Question = document.getElementById(Qid).value
  var Answer = document.getElementById(Aid).value
  //checks if anyone of them is empty
  if(Question.length < 2 || Answer.length < 2){
    fail = 1
  }
  SubmitArray.push({"I":index, "Q":Question, "A":Answer})
  index++;
});
if(fail === 1){
setSettings({
      type: "text",
      text: "One of the Question/Answer fields is empty or too short!",
})
setModal(true)
} else {
bulkverify(SubmitArray)
}
}

//redirects to home from site after being called
function Redirect_(){
  navigate("/")
}

function bulkverify(SubmitArray){
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "array" : SubmitArray})
 }
  fetch(import.meta.env.VITE_url + "/build/bulk", options).then(res => res.json()).then(res => {res.OK !== false ? PostRequest(SubmitArray) : bulkverificationmodal(res)}).catch(err => console.log(err))
}

//takes in a query string and runs it inside the database depending on the contents, altering queries will not run!
function VerifyQuestion(Question){
var query = document.getElementById(Question).value
const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "query" : query})
 }

 fetch( import.meta.env.VITE_url + "/build/verify", options)
 .then(response => response.json())
 .then(response => verification(response))

}
//shows user if the query inserted is valid or not.
function verification(res){
  if(res.code === undefined){
    setSettings({
      type: "text",
      text: "Query was successfull!"
    })
    setModal(true)
  } else {
    setSettings({
      type: "text",
      text: "Query has failed!"
    })
    setModal(true)
  }
}
function bulkverificationmodal(res){
   setSettings({
      type: "text",
      text: "Questions "+ res.issues +" answers have failed!"
    })
    setModal(true)
}
//Posts the given questions as a test into the database! and gives a modal to the user if successfull
function PostRequest(PostData){
  var PostFormat = {
    "Name": Testname,
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
 fetch( import.meta.env.VITE_url + '/build/add', options
 )
 .then(response => response.json())
 .then(response => {
  if(!response){
    console.log("error with reaching the backend")
  }  else {
    setSettings({
      type: "text",
      function:Redirect_,
      text: "The Test has been created succesfully!",
    })
    setModal(!modal)

  }
 }).catch(error => {
  console.log("error with reaching the backend")
 })

}
}

export default App