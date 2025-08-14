import '../css/index.css'
import '../css/start.css'
import '../css/TestTaker.css'

import Modal from "./Modal.jsx"
import { useEffect, useState, useRef } from 'react'
import { useParams } from "react-router";
import {NavLink} from "react-router-dom";
import Zoom from './ERZoom.jsx'

const App = () => {
    //url parameter 
    let params = useParams();
    //Modal state, visible or not.
    const [modal, setModal] = useState(false)
    //formatted database questions 
    const [FormattedQuestions, setFormatted] = useState([])
    //bool of if the elements are shown
    const [loading, setLoading] = useState(false)
    //id of current question shown
    const [currentQuestions, setCurrentQuestion] = useState(-1)
    //the question to render
    const [questionRender, setRender] = useState([])
    //the question to render
    const [animationState, setAnimationState] = useState(true)
    //state of test
    const [TestState, setState] = useState("ER")
    //has been sent
    const [Sent, SetSent] = useState(false)

    var testPoints = 0;
    const animationref = useRef()

    const inputref = useRef()
    //init of settings for modal system.
    const [ModalSettings, setSettings] = useState({
        "type": "",
        "text": "",
        "function": "",
    })
    //fetches the questions
    useEffect(() => {
        var url = import.meta.env.VITE_url +"/test/id/" + params.testId
        fetch(url).then(response => response.json()).then(response => Questions(response))
    }, []);
    //on changing the currect questions id rerender with new contents
    useEffect(() => {
        if (currentQuestions !== -1) {
            setRender(FormattedQuestions.slice(currentQuestions, currentQuestions + 1))
        }
    }, [currentQuestions]);

    useEffect(()=>{
        if(TestState !== "ER"){
        console.log("here")
        var index = 0
        FormattedQuestions.forEach(e => {
            if(e.Correct !== "Neutral"){
                index++; 
            }
        })
         if(index === FormattedQuestions.length){
                if(!Sent){
                    SetSent(true)
                    setState("Finished")
                    setCurrentQuestion(-2)
                    Finalize()
                }
        }
        }

    }, [FormattedQuestions])


    return (
        <div className="Taking">

            {
                modal ? <ModalSetter /> : <></>
            }
            {loading ?
                <>
                    <div className='TakingSelectionContainer'>
                        <div key={"ErModel"} id={"QuestionButton_" + -1}><button className={currentQuestions === -1 ? "SelectedButton" : "SelectionButton"} onClick={() => { setCurrentQuestion(-1); setState("ER")}}><img className='ButtonImage' src={"/Images/image.svg"}/></button></div>
                        {FormattedQuestions.map((question, index) => (<div key={index} id={"QuestionButton_" + index} className={"QuestionButtons"}><button className={currentQuestions === index ? `SelectedButton ${TestState ? question.Correct : ""}` : `SelectionButton ${TestState ? question.Correct : ""}`} onClick={() => { setCurrentQuestion(index); setState("Question"); }}>{index + 1}</button></div>))}
                        <div key={"Finish"} id={"QuestionButton_" + -2}><button className={currentQuestions === -2 ? "SelectedButton static" : "SelectionButton static"} onClick={() => { SubmitModal() }}><img className='ButtonImage' src={"/Images/info.svg"}/></button></div>
                    </div>

                    {TestState === "Question" ?
                        <>
                            {questionRender.map((question, index) => (
                                <div ref={animationref} id={question.QuestionId} key={question.QuestionId} className={`TakingContainer ${animationState ? 'open' : 'closed'}`} >
                                    <a className="TakingHeader">Question {question.index + 1}</a><a className="TakingQuestion">{question.Question}</a>
                                    <input ref={inputref} autoComplete={"off"} className={`Answer ${question.Correct === "Neutral" ? 'open' : 'closed'}`} value={question.Answer} onChange={e => changeInput(e.target.value)} id={question.QuestionId + "_input"} onKeyDown={(e) => {enterkeydown(e,question.QuestionId)}}readOnly={question.Correct !== "Neutral" ? true : false}></input>
                                    {question.Correct === "Neutral" ? <button className="SubmitAnswer" onClick={() => verify(question.QuestionId)}>Submit</button>: <></>}
                                </div>
                                ))
                            }
                        </>
                        :
                        <>
                    </>
                    }
                    {TestState === "ER" ? 
                     <div className={`TakingContainer ${animationState ? 'open' : 'closed'}`}>
                            <div className='ErModelCont'>
                                <Zoom/>
                            </div>
                        </div>
                        : <></>
                    }
                    {TestState === "Finished" ? 
                    <div className='FinishContainer'><div className={"ScoreContainer"}><CalcPoints/></div><FinalStatistics/><div className='FIBtnContainer'><NavLink className={"FIBtn"} to={"/"}>Home</NavLink><NavLink className={"FIBtn"} to={"/test/" +  params.testId-1}>Retry</NavLink></div></div>                  :   
                    <></>
                    }
                </>
                :
                <></>
            }
        </div>
    )

    function enterkeydown(e,id){
        if(e.key === 'Enter'){
            verify(id)
        }
    }
    //calculates points to render
    function CalcPoints(){
        var points = 0
        FormattedQuestions.forEach((c,i) =>{
            if(c.Correct === "Correct"){
                points = points + 1
            }
            if(c.Correct === "Partially"){
                points = points + 0.5
            }
        })
        return <div className='FIPoints'>Score: {points}/{FormattedQuestions.length}</div>
    }  
    //makes the final screen with known data 
    function FinalStatistics(){
        const FinalStats = FormattedQuestions.map((c,i) => {
            if(FormattedQuestions[i].Correct === "Neutral"){
                FormattedQuestions[i].Correct = "Incorrect"
            }
            return <div key={"FiKey_" +i} className={`FIContainer ${c.Correct}`} >
                        <div className="FIHeader">Question {c.index + 1}</div>
                        <div className='FIHeader2'>Right Answer: </div>
                        <div className="FIQuestion">{c.CAnswer}</div>
                        <div className="FIHeader2">{"Your Answer: "}</div>
                        <div className={`FIAnswer ${c.Correct}`}>{c.Answer}</div>
                        <div className="FIPoints">Points: {c.Correct === "Correct" ? "1" : `${c.Correct === "Partially" ? "0.5" : "0"}`}/1</div>
                    </div>
        })
        return FinalStats
    }
    //Asks if student/user wants to end test before sending it
    function SubmitModal() {
        const unanswered = document.getElementsByClassName("SelectionButton Neutral")
        const unanswered_selected = document.getElementsByClassName("SelectedButton Neutral")
        const amount = unanswered.length + unanswered_selected.length
        if(amount === 0){
            if(!Sent){
                Finalize()
            } else {
                setState("Finished")
                setCurrentQuestion(-2)
            }
            return
        }
        if (amount > 0) {
            setSettings({
                type: "question",
                text: "Are you sure you want to submit the test? There are " + amount + " unsubmitted questions!",
                function: Finalize
            })
            setModal(!modal);
        } else {
            setSettings({
                type: "question",
                text: "Are you sure you want to submit the test?",
                function: Finalize
            })
            setModal(!modal);
        }
    }
    //saves test data to database
    function Finalize(){
        console.log("Finalize")
        setState("Finished")
        var url =  import.meta.env.VITE_url +"/compare/save/"
        const PostFormat = FormattedQuestions.map((c,i) =>{
            var points = 0
            if(c.Correct === "Correct"){
                points = 1
            }
            if(c.Correct === "Partially"){
                points = 0.5
            }
            return [
                params.testId,
                points, 
                c.Answer
            ]
        })
        const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(PostFormat)
            }
        fetch(url, options).then(res => res.json()).then(res => userinterface(res)).then(res => Calculateavg()).catch(err => console.log(err))
    }
    function Calculateavg(){
        fetch( import.meta.env.VITE_url + "/compare/avg/" + params.testId).then(response => response.json())
    }
    //sets questions gotten from database into formatted questions where currecnt questions are sliced from
    function Questions(res) {
        var Arrayofquestions = []
        res.forEach((element, index) => {
            Arrayofquestions.push({ "Question": element.Question, "Answer": "", "QuestionId": element.QuestionId, "Correct": "Neutral", "index": index, "CAnswer": element.Answer })
        });
        setFormatted(Arrayofquestions)
        setRender(Arrayofquestions.slice(currentQuestions, currentQuestions + 1))
        setLoading(true)
    }
    //verifies answers validity
    function verify(id) {
            var url =  import.meta.env.VITE_url +"/compare/" + id
            var PostFormat = {
                "studentQ": document.getElementById(id + "_input").value
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(PostFormat)
            }

            fetch(url, options).then(response => response.json()).then(response => userinterface(response))
    }
    //Lights up the buttons with colors after finishing the test
    function userinterface(response) {
        if (response.outcome !== undefined) {
            if (response.outcome === true) {
                const updatedBtns = FormattedQuestions.map((c, i) => {
                    if (i === currentQuestions) {
                        c.Correct = "Correct"
                        return c
                    } else {
                        return c
                    }
                })
                setFormatted(updatedBtns)
            } else if (response.half === true) {
                const updatedBtns = FormattedQuestions.map((c, i) => {
                    if (i === currentQuestions) {
                        c.Correct = "Partially"
                        return c
                    } else {
                        return c
                    }
                })
                setFormatted(updatedBtns)
            } else {
                const updatedBtns = FormattedQuestions.map((c, i) => {
                    if (i === currentQuestions) {
                        c.Correct = "Incorrect"
                        return c
                    } else {
                        return c
                    }
                })
                setFormatted(updatedBtns)
            }
        } else {

        }
    }
    //changes the input value of currently selected question
    function changeInput(value) {
        const updatedBtns = FormattedQuestions.map((c, i) => {
            if (i === currentQuestions) {
                c.Answer = value
                return c
            } else {
                return c
            }
        })
        setFormatted(updatedBtns)
    }
    //modal init
    function ModalSetter() {
        return <Modal Modalsettings={{ type: ModalSettings.type, text: ModalSettings.text, function: ModalSettings.function }} stateChanger={setModal} />
    }

}

export default App
