
import { useState, useEffect } from 'react'
import '../css/TestCreator.css'
function App() {
let questionId = 1
const [state, setState] = useState([
  <div className='TestContainer' key={"Question_" + questionId++}>
  <h className="TestHeader">Question</h>
  <input></input>
  <h className="TestHeader">Model Answer</h>
  <input></input>
  <button>Verify Model Answer</button>
  </div>
  ])
  return (
    <>  
          <div>{state}</div>
          <button onClick={AddQuestion}>+</button>
    </>
  )

function AddQuestion() {
  var QuestionArray = [
    <div className='TestContainer' key={"Question_" + questionId++}>
    <h className="TestHeader">Question</h>
    <input></input>
    <h className="TestHeader">Model Answer</h>
    <input></input>
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