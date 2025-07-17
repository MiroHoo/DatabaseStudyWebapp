
import { useState, useEffect, useRef } from 'react'
function App() {
//initialize first question
  useEffect(() => {
  AddQuestion()
  }, []);

  return (
    <div className='Tests'>  
    <div>
    {questionarray.map(Questions=>(
      <div className='TestContainer' key={Questions.id}>
        <a onClick={()=>{QuestionName(Questions.id-1)}} className="TestHeader">{Questions.name}</a>
        <input className='TestInput'></input>
        <a className="TestHeader">Model Answer</a>
        <input className='TestInput'></input>
        <button className='TestVerify'>Verify Model Answer</button>
        <button onClick={()=>RemoveQuestion(Questions.id)}>Delete</button>
      </div>
    ))}
    </div>
    <button onClick={AddQuestion}>+</button>  
    <button >Submit</button>
    </div>
  )
}

export default App