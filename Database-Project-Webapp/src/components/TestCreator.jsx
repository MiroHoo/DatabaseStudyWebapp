
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
  var QuestionArray = [
    <div className='TestContainer' key={"Question_" + questionId++}>
    <h className="TestHeader">Question</h>
    <input className='TestInput'></input>
    <h className="TestHeader">Model Answer</h>
    <input className='TestInput'></input>
    <button>Verify Model Answer</button>
    </div>
    ]
    setState([
      ...state,
      [QuestionArray]
    ]);

}

}



export default App