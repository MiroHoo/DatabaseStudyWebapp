
import { useState, useEffect } from 'react'
import '../css/TestCreator.css'
function App() {
let questionId = 1
const [state, setState] = useState([])
//initialize first question
useEffect(()=>{AddQuestion()}, [])
  return (
    <div className='Tests'>  
          <div>{state}</div>
          <button onClick={AddQuestion}>+</button>
    </div>
  )
//function for adding a question to the question array
function AddQuestion() {
  const arraypos = state.length
  console.log(state)
  var QuestionArray = [
    <div className='TestContainer' key={"Question_" + questionId++}>
    <h className="TestHeader">Question {arraypos}</h>
    <input className='TestInput'></input>
    <h className="TestHeader">Model Answer</h>
    <div className='Testinputcontainer'><input className='TestInput'></input></div>
    <button className='TestVerify'>Verify Model Answer</button>
    <button onClick={()=>DeleteQuestion(arraypos+1)}>Delete</button>
    </div>
    ]
    setState([
      ...state,
      [QuestionArray]
    ]);
}
function DeleteQuestion(deletepos) {
  console.log(deletepos)
  var newstate = state
  var splice = newstate.splice(deletepos-1,0)
  console.log(newstate)
  console.log(splice)
  setState(newstate)
}
}



export default App