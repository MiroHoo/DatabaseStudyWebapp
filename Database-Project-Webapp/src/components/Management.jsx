
import { useState, useEffect, useRef } from 'react'
import '../css/TestManagin.css'
import Modal from "./Modal.jsx"
import up from "../Images/chevron-up.svg"
import down from "../Images/chevron-down.svg"
import edit from "../Images/edit.svg"


function App() {
    const [Testdata, setTestdata] = useState({})
    //render boolean
    const [ShowData, setShow] = useState(false)
    //loading boolean
    const [loading, setLoading] = useState(true)
    
    const [modal, setModal] = useState(false)
    //current tests answers
    const [TestAnswer, setAnswer] = useState([])
    //average score
    const [Average, setAverage] = useState([])

    const [Questions, setQuestions] = useState([])

    const [Attemptvis, setAttemptvis] = useState(false)

    const [Questionvis, setQuestionvis] = useState(false)

    const [selection, SetSelection] = useState("")

    const [ModalSettings, setSettings] = useState({
        "type": "",
        "text": "",
        "function": "",
    })
    var amountoftests = 0;
    //fetches tests
    useEffect(() => {
         fetch(import.meta.env.VITE_url +'/test/')
            .then(response => response.json())
            .then(response => {InitOpen(response); initAnswers(response); initQuestions(response); amountoftests = response.length})
            .then(response => setLoading(!loading))
            .catch(error => console.log(error))
    }, []);
    //checks if data is there and allows the element to be rendered
    useEffect(()=> {
       if(Questions.length === amountoftests && ShowData !== true){
             
             setShow(true)
       }
    },[TestAnswer])

    return (
        <>
            {
                modal ? <div id="ModalDiv"><ModalSetter /></div> : <></>
            }
            {loading ?
                <></>
                :
                <div className='ManagementContainer'> {Testdata.map((c, i) => <div key={i + "_key"} className='ManagementContainer'>
                    <div key={c.TestId} className={`ManagementHeader active ${c.TestId === selection ? 'open' : 'closed'}`} id={c.TestId} onClick={() => c.Open === false ? FetchAnswers(c.TestId, i) : closed()}>{c.Name} 
                        <div>
                            <img className={`openImage ${c.Open ? 'open' : 'closed'}`}src={c.Open === false ? up : down}/>
                        </div>
                    </div>
                    {c.Open ? <ShowTests index={i} /> : <></>}
                    </div>)}             
                </div>
            }
        </>
    )
    //renders test
    function ShowTests(props) {
        const TestArray = <div key={Testdata[props.index].TestId} className="ManagementItemCont">
            <div className={"ManagementContent active"} onClick={() => { InputModal(Testdata[props.index].Name, Testdata[props.index].TestId, props.index);}}>{Testdata[props.index].Name}<img className='EditIcon' src={edit}/></div>
            <button className={"ShowAnswers"} onClick={() => {setAttemptvis(!Attemptvis)}}>Show Attempts<img className={`openImage`}src={Attemptvis === false ? up : down}/></button>
            {ShowData ? 
            <>
            {Attemptvis ? <TestSetter/> : <></>}
            </>
            :
            <></>
            }
             <button className={"ShowAnswers"} onClick={() => {setQuestionvis(!Questionvis)}}>Show Questions<img className={`openImage`}src={Questionvis === false ? up : down}/></button>
            {ShowData ? 
                <>
                {Questionvis ? <ShowQuestions index={props.index}/> : <></>}
                </>
                :
                <>
                </>
            }
            <div className={"ManagementContent"}>Average score: {Math.round(Testdata[props.index].Average_score*100) + "%"}</div>
            <button className="DeleteTest" onClick={() => { QuestionModal(Testdata[props.index].Name, Testdata[props.index].TestId, props.index); }}>Delete</button></div>
        return TestArray
    }
    function ShowQuestions(props){
        if(Testdata[props.index].Question.length !== 0){
        const QuestionArray = <>{
            ShowData ? 
            <div className='QuestionEditContainer'>
            {Testdata[props.index].Question.map((c,i)=>
            {
            return <div className={"FlexDiv"} key={"FlexKey_" + i} onClick={()=>{ChangeQuestionInput("Question " + (i+1), c.QuestionId, props.index, i)}}><div>Question {i+1} :</div> {c.Question === "" ? "No question text " : c.Question}<img className='QuestionEditImg' src={edit}/></div>
            }
            )
            }
            </div>
            : 
            <div></div>
            }
            </>
        return QuestionArray    
        } else {
            return <div className='FlexDiv'>No questions</div>
        }
        
    }
    function fetchQuestions(Testid,i){
        fetch(import.meta.env.VITE_url +"/test/id/"+Testid).then(res => res.json()).then(res => QuestionSetter(i,res)).then(setOpen(i))
    }
    //gets answers from backend
    function FetchAnswers(TestId,i){
       setAttemptvis(false)
       setQuestionvis(false)
       fetch(import.meta.env.VITE_url +"/manage/fetchscores/"+TestId).then(res => res.json()).then(res => {setAnswers(i,res)}).then(fetchQuestions(TestId,i))
    }
     function initAnswers(res) {
        const arrayofindexes = res.map((c, i) => { res[i].Answer = []; return res[i] })
        setTestdata(arrayofindexes)
    }
    function QuestionSetter(index,res){
        if(Testdata[index].Question.length === 0){
            const updatedarray = Testdata.map((c, i) => {
                if (i === index) {
                    Testdata[i].Question = res; return Testdata[i]
                } else {
                    return c
                }
            })
            setTestdata(updatedarray)
            setQuestions(res)
        } else{
            setQuestions(Testdata[index].Question)
        }
    }
    function setAnswers(index,res){
            if(Testdata[index].Answer.length === 0){
            const updatedarray = Testdata.map((c, i) => {
                if (i === index) {
                    Testdata[i].Answer = res; return Testdata[i]
                } else {
                    return c
                }
            })
            setTestdata(updatedarray)
            setAnswer(res)
            } else {
            setAnswer(Testdata[index].Answer)
        }
    }
    function initQuestions(res){
        const arrayofindexes = res.map((c, i) => { res[i].Question = []; return res[i] })
        setTestdata(arrayofindexes)
    }
    //sets the open variable inside the testdata to be used to open/close tests in the frontend
    function InitOpen(res) {
        const arrayofindexes = res.map((c, i) => { res[i].Open = false; return res[i] })
        setTestdata(arrayofindexes)
    }
    //modal init
    function ModalSetter() {
        return <Modal Modalsettings={{ type: ModalSettings.type, text: ModalSettings.text, function: ModalSettings.function, funcvar: ModalSettings.funcvar }} stateChanger={setModal} />
    }
    //quite the long function, but it groups, tags and renders the stundet queries from the database based on the attempt of the test they were inside
    function TestSetter(){
    var index = 0;
    var temparray = []
    var elemarray = []
    if(TestAnswer.length !== 0){
    var attemptid = TestAnswer[0].Attempt_id
    //group based on attempt id
    TestAnswer.forEach((c,i)=>{
        if(c.Attempt_id !== attemptid){
            elemarray.push(temparray)
            attemptid = c.Attempt_id
            index=0;
            temparray=[]
        }
        temparray.push(c)
        index++;  
    })
    elemarray.push(temparray)
    temparray = []
    //give right class based on if the answer was correct
    const array = elemarray.map((cont,i)=>{
    if(i < 10){
        var pusharray = []
        var Class = ""
        cont.forEach((c,i)=>{
            if(c.Score === "1"){
                Class = "Sucessful"
            } else if (c.Score === "0"){
                Class = "Failure"
            } else {
                Class = "Partial"
            }
            if(c.Answer.length < 2 ){
              pusharray.push(<div key={"Answer" + i +"_key"} className={"AnswerCont " + Class}><div className='AnswerText'>No Answer</div><div className='AnswerText'>{c.Score}/1</div></div>)  
            } else {
                if(c.Answer.length < 50){
                    pusharray.push(<div className={"AnswerCont " + Class} key={"Answer" + i +"_key"}><div className='AnswerText query'>{c.Answer}</div><div className='AnswerText'>{c.Score}/1</div></div>)
                } else {
                    pusharray.push(<div className={"AnswerCont " + Class} key={"Answer" + i +"_key"}><div className='AnswerText long'>{c.Answer}</div><div className='AnswerText'>{c.Score}/1</div></div>)
                }
            }
        })
        return <div className='AttemptClass' key={"Attempt_key_" + i}><div className='AttemptHeader'>Attempt {i+1}</div><div className='AttemptClass'>{pusharray}</div><div className='AttemptDivider'></div></div>
    } else {
        return; 
    }
    })
    return array
    }  else {
        return <div className={"AnswerCont"}>No Attempts</div>
    } 

    }
    //asks if user wants to delete question
    function QuestionModal(Name, id, index) {
        setSettings({
            type: "question",
            text: "Delete Question: " + Name + "?",
            function: DeleteQuestion,
            funcvar: { "id": id, "i": index }
        })
        setModal(!modal);
    }
    //asks for new name
    function InputModal(name, id, index) {
        setSettings({
            type: "input",
            text: "Change " + name + "'s name",
            function: ChangeName,
            funcvar: { "id": id, "index": index}
        })
        setModal(!modal);
    }

    function ChangeQuestionInput(Name, id, index, Qindex){
        setSettings({
            type: "input",
            text: "Edit " + Name + "'s question?",
            function: ChangeQuestionName,
            funcvar: { "id": id, "index": index, "QuestionI": Qindex}
        })
        setModal(!modal);
    }
    function ChangeQuestionName(input, funcvar){
        const url = import.meta.env.VITE_url + "/manage/question/" + funcvar.id
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ "name" : input })
        }
        fetch(url, options).then(response => response.json()).then(UpdateQuestion(input, funcvar.index,funcvar.QuestionI))
    }
    //Changes name inside the backend
    function ChangeName(input,funcvar) {
        const url = import.meta.env.VITE_url + "/manage/update/" + funcvar.id
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ "name" : input })
        }
        fetch(url, options).then(response => response.json()).then(UpdateElement(input, funcvar.index))
    }
    //removes element inside frontend
    function RemoveElement(index) {
        setTestdata(Testdata.filter((c, i) => i !== index))
    }
    function UpdateQuestion(name, index,QIndex){
        const array = Testdata.map((c,i)=> {
            if(i === index){
                Testdata[i].Question[QIndex].Question = name; return Testdata[i]
            } else {
                return c
            }
        })
        setTestdata(array)
    }
    //sets name inside frontend
    function UpdateElement(name, index){
        const array = Testdata.map((c,i)=> {
            if(i === index){
                Testdata[i].Name = name; return Testdata[i]
            } else {
                return c
            }
        })
        setTestdata(array)
    }
    //deletes question where button was pressed
    function DeleteQuestion(id, funcvar) {
        fetch( import.meta.env.VITE_url + "/manage/delete/" + funcvar.id, { credentials:'include'}).then(response => response.json()).then(RemoveElement(funcvar.i))
    }
    //opens selected question
    function setOpen(index) {
        closed()
        if (Testdata[index].Open) {
            const updatedarray = Testdata.map((c, i) => {
                if (i === index) {
                    Testdata[i].Open = false; return Testdata[i]
                } else {
                    return c
                }
            })
            setTestdata(updatedarray)
        } else {
            const updatedarray = Testdata.map((c, i) => {
                if (i === index) {
                    Testdata[i].Open = true; return Testdata[i]
                } else {
                    return c
                }
            })
            setTestdata(updatedarray)
        }
    }
    //closes all the elements except the one currently active
    function closed() {
            const updatedarray = Testdata.map((c, i) => {
                Testdata[i].Open = false; return Testdata[i]
            })
            setTestdata(updatedarray)
    }

}

export default App