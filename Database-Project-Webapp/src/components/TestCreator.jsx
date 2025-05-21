
import { useState, useEffect, useRef } from 'react'
import '../css/TestCreator.css'
function App() {
let questionId = useRef(0)
const [questionarray, setQuestions] = useState([])
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
function QuestionName(id){
  const UpdatedName = questionarray.map((c,i) => {
    if (i === id){
      c.name = "Clicked"
      return c
    } else {
      return c
    }
  })
  setQuestions(UpdatedName)
}
}

export default App