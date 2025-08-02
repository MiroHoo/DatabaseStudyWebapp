import '../css/index.css'
import '../css/start.css'
import '../css/TestTaker.css'
import ErModel from "../assets/Images/ErModel.png"
import Modal from "./Modal.jsx"
import { useEffect, useState, useRef, use } from 'react'
import { useParams } from "react-router";
import {NavLink} from "react-router-dom";

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
    const animationref = useRef()
    //init of settings for modal system.
    const [ModalSettings, setSettings] = useState({
        "type": "",
        "text": "",
        "function": "",
    })

    useEffect(() => {
        var url = "http://127.0.0.1:3002/test/id/" + params.testId
        fetch(url).then(response => response.json()).then(response => Questions(response))
    }, []);

    useEffect(() => {
        if (currentQuestions !== -1) {
            setRender(FormattedQuestions.slice(currentQuestions, currentQuestions + 1))
        }
    }, [currentQuestions]);


    return (
        <div className="Taking">

            {
                modal ? <ModalSetter /> : <></>
            }
            {loading ?
                <>
                    <div className='TakingSelectionContainer'>
                        <div key={"ErModel"} id={"QuestionButton_" + -1}><button className={currentQuestions === -1 ? "SelectedButton" : "SelectionButton"} onClick={() => { setCurrentQuestion(-1); setState("ER")}}>{"ER"}</button></div>
                        {FormattedQuestions.map((question, index) => (<div key={index} id={"QuestionButton_" + index}><button className={currentQuestions === index ? `SelectedButton ${TestState ? question.Correct : ""}` : `SelectionButton ${TestState ? question.Correct : ""}`} onClick={() => { setCurrentQuestion(index); setState("Question"); }}>{index + 1}</button></div>))}
                        <div key={"Finish"} id={"QuestionButton_" + -2}><button className={currentQuestions === -2 ? "SelectedButton" : "SelectionButton"} onClick={() => { SubmitModal() }}>{"FI"}</button></div>
                    </div>
                    {TestState === "Question" ?
                        <>
                            {questionRender.map((question, index) => (
                                <div ref={animationref} id={question.QuestionId} key={question.QuestionId} className={`TakingContainer ${animationState ? 'open' : 'closed'}`} >
                                    <a className="TakingHeader">Question {question.index + 1}</a><a className="TakingQuestion">{question.Question}</a>
                                    <input className={`Answer ${question.Correct === "Neutral" ? 'open' : 'closed'}`} value={question.Answer} onChange={e => changeInput(e.target.value)} id={question.QuestionId + "_input"} readOnly={question.Correct !== "Neutral" ? true : false}></input>
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
                                <img src={ErModel} className='ErModel'></img>
                            </div>
                        </div>
                        : <></>
                    }
                    {TestState === "Finished" ? 
                    <><FinalStatistics/> <div className='FIBtnContainer'><NavLink className={"FIBtn"} to={"/"}>Home</NavLink></div></>                  :   
                    <></>
                    }
                </>
                :
                <></>
            }
        </div>
    )


    function FinalStatistics(){
        console.log(FormattedQuestions)
        const FinalStats = FormattedQuestions.map((c,i) => {
            if(FormattedQuestions[i].Correct === "Neutral"){
                FormattedQuestions[i].Correct = "Incorrect"
            }
            return <div className={`FIContainer ${c.Correct === "Correct" ? "Correct" : "Incorrect"}`} >
                        <div className="FIHeader">Question {c.index + 1}</div>
                        <div className='FIHeader2'>Question: </div>
                        <div className="FIQuestion">{c.Question}</div>
                        <div className="FIHeader2">{"Your Answer: "}</div>
                        <div className={`FIAnswer ${c.Correct === "Correct" ? "Correct" : "Incorrect"}`}>{c.Answer}</div>
                        <div className="FIPoints">Points: {c.Correct === "Correct" ? "1" : `${c.Correct === "Partially" ? "0.5" : "0"}`}</div>
                    </div>
        })
        return FinalStats
    }
    function SubmitModal() {
        const unanswered = document.getElementsByClassName("SelectionButton Neutral")
        const unanswered_selected = document.getElementsByClassName("SelectedButton Neutral")
        const amount = unanswered.length + unanswered_selected.length
        if(amount === 0){
            setState("Finished")
            return
        }
        if (amount > 0) {
            setSettings({
                type: "question",
                text: "Are you sure you want to submit the test? There are " + amount + " unanswered questions!",
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

    function Finalize() {
        setCurrentQuestion(-2);
        setState("Finished")
    }

    function Questions(res) {
        var Arrayofquestions = []
        res.forEach((element, index) => {
            Arrayofquestions.push({ "Question": element.Question, "Answer": "", "QuestionId": element.QuestionId, "Correct": "Neutral", "index": index })
        });
        setFormatted(Arrayofquestions)
        setRender(Arrayofquestions.slice(currentQuestions, currentQuestions + 1))
        setLoading(true)
    }

    function verify(id) {
        var answer = document.getElementById(id + "_input").value
        let nocapsanswer = answer.toLowerCase();
            var url = "http://127.0.0.1:3002/compare/" + id
            var PostFormat = {
                "studentQ": document.getElementById(id + "_input").value
            }
            console.log(PostFormat)
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(PostFormat)
            }

            fetch(url, options).then(response => response.json()).then(response => userinterface(response.outcome))

        
    }

    function userinterface(outcome) {
        outcome = (outcome === "true")
        console.log(outcome)
        if (outcome !== undefined) {
            if (outcome === true) {
                const updatedBtns = FormattedQuestions.map((c, i) => {
                    if (i === currentQuestions) {
                        c.Correct = "Correct"
                        return c
                    } else {
                        return c
                    }
                })
                setFormatted(updatedBtns)
            } else if (outcome === false) {
                const updatedBtns = FormattedQuestions.map((c, i) => {
                    if (i === currentQuestions) {
                        c.Correct = "Incorrect"
                        return c
                    } else {
                        return c
                    }
                })
                setFormatted(updatedBtns)
            } else {
                const updatedBtns = FormattedQuestions.map((c, i) => {
                    if (i === currentQuestions) {
                        c.Correct = "Partially"
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

    function ModalSetter() {
        return <Modal Modalsettings={{ type: ModalSettings.type, text: ModalSettings.text, function: ModalSettings.function }} stateChanger={setModal} />
    }

}

export default App