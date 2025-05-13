
import { useState, useEffect, useRef } from 'react'
import '../css/TestCreator.css'
function App() {
let questionId = useRef(0)
const [state, setState] = useState([])
//initialize first question
  useEffect(() => {
  AddQuestion()
  }, []);

  return (
    <div className='Tests'>  
    <div>
    {state.map(Questions=>(
      <div className='TestContainer' key={Questions.id}>
        <h className="TestHeader">{Questions.name}</h>
        <input className='TestInput'></input>
        <h className="TestHeader">Model Answer</h>
        <input className='TestInput'></input>
        <button className='TestVerify'>Verify Model Answer</button>
        <button onClick={()=>RemoveQuestion(Questions.id)}>-</button>
      </div>
    ))}
    </div>
    <button onClick={AddQuestion}>+</button>  
    </div>
  )
//function for adding a question to the question array
function AddQuestion() {
questionId.current = questionId.current +1;
setState([...state, {name: "Question " + (state.length+1), id: questionId.current}])
}
function RemoveQuestion(id){
  setState(state.filter(a => a.id !== id))
}
}

export default App