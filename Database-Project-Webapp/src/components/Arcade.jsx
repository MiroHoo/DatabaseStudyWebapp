
import { useState, useEffect, useRef } from 'react'
import '../css/arcade.css'
import reroll from '../assets/rotate-cw.svg'
import Modal from "./Modal.jsx"
import hp from '../assets/shield.svg'
import { useNavigate } from "react-router";
const Layout = () => {
    let navigate = useNavigate();
    
    const [Loading, SetLoading] = useState(true)
    //minimum and maximum database ids 
    const [MinMax, setMinMax] = useState({})
    //question to be rendered
    const [Question, setQuestion] = useState({})
    //question database id 
    const [DbId, setId] = useState(0)
    //animation states
    const [ArcadeState, setArcadeState] = useState("")

    const [AnimationState, setAnimation] = useState(false)

    const [Input, setInput] = useState("")
    //health
    const [Shields, setShields] = useState(3)
    //rerolls
    const [rerolls, setRerolls] = useState(3)

    const [points, setPoints] = useState(0)
    const [showScores, setShowScores] =  useState(true)
    const [disabled, setDisabled] = useState(false)
    const animationref = useRef()
    const [modal, setModal] = useState(false)

    const [ModalSettings, setSettings] = useState({
        "type": "",
        "text": "",
        "function": "",
    })
    //sets questions and minimum and maximum
    useEffect(() => {
        fetch(import.meta.env.VITE_url +"/arcade/").then(res => res.json()).then(res => { setMinMax(res); getQuestion(res) })
    }, [])
    //depending on the state of the arcade get new questions and disable buttons with times set to the animation lenghts
    useEffect(() => {
        if (ArcadeState !== "") {
            setTimeout(() => {
                setTimeout(()=> {
                    setInput("")
                    getQuestion(MinMax)
                    setDisabled(false)
                }, "1000")
                setAnimation(true)
                setArcadeState("")
            }, "1000");
        }
    }, [ArcadeState])
    
    useEffect(() => {
        if (animationref.current !== undefined) {
            animationref.current.addEventListener("animationcancel", () => {
                setAnimation(false);
            });
            animationref.current.addEventListener("animationend", () => {
                setAnimation(false);
            });
        }
    }, [animationref.current]);
    //if theres data, render
    useEffect(() => {
        if (Question[0]) {
            SetLoading(false)
        }
    }, [Question])
    return (
        <>
        <>
            {
                modal ? <ModalSetter /> : <></>
            }
            {
                Loading ? <></> : <><div><div className={"UiPoints"}>Score: {points}</div></div><div ref={animationref} className={`ArcadeContainer ${AnimationState ? 'open' : 'closed'}`}><div className={"ArcadeQuestHeader"}>Question: </div><div className={"ArcadeHeader"}>{Question[0].Question}</div><input autoComplete={"off"} placeholder={"Think carefully"} name="QuestionInput" className={"ArcadeInput " + ArcadeState} value={Input} onChange={(e) => { setInput(e.target.value) }}></input></div></>
            }
            <div className='iconContainer'>
                <div className='StatContainer'>
                    <button disabled={disabled || rerolls === 0} className='Stats Reroll' onClick={() => { Roll()}}>
                        <>Rerolls</>
                        <img className={"IconClass"} src={reroll} /><>{rerolls}/3</>
                    </button>
                </div>
                <button className={`SubmitBtn`} disabled={Shields === 0 || disabled} onClick={() => { verifyAnswer(); setDisabled(true) }}>Submit</button>
                <div className='StatContainer'>
                    <div className='Stats'><>Attempts</>
                        <img className={"IconClass"} src={hp} /><>{Shields}/3</>
                    </div>
                </div>
            </div>
        </>
    </>
    )
    //reroll the question
    function Roll(){
        if(rerolls > 0 ){
        setDisabled(true)
        setRerolls(rerolls - 1);
        setArcadeState("Neutral")
        } else {
           
        }
    }

    function ModalSetter() {
        return <Modal Modalsettings={{ type: ModalSettings.type, text: ModalSettings.text, function: ModalSettings.function }} stateChanger={setModal} />
    }
    //gets question
    async function getQuestion(res) {
        var notVerified = true
        while(notVerified === true){
            var QuestionID = Math.round(Math.random() * (res[0].MaxId - res[0].MinId) + res[0].MinId)
            setId(QuestionID)
            await fetch(import.meta.env.VITE_url +"/arcade/verifyid/" + QuestionID).then(res => res.json()).then(res => res[0].Question !== undefined ? notVerified=false : notVerified=true)
        }
        fetch(import.meta.env.VITE_url +"/arcade/" + QuestionID).then(res => res.json()).then(res => setQuestion(res))
    }
    //verifies answer and updates ui 
    function verifyAnswer() {
        var url = import.meta.env.VITE_url +"/compare/" + DbId
        var PostFormat = {
            "studentQ": Input
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(PostFormat)
        }

        fetch(url, options).then(response => response.json()).then(response => updateui(response)).catch(err => updateui({outcome: false}))
    }
    //redirects after sending score
    function RedirectPage(name){
        var PostFormat = {
            "Name": name,
            "Score": points
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(PostFormat)
        }
        fetch(import.meta.env.VITE_url +"/arcade/insert",options).then(navigate("/scores"))
    }
    //updates ui
    function updateui(res) {
        if (res.outcome === true) {
            setPoints(points + 1);
            setArcadeState("Success")
        } else {
            if (Shields === 1) {
                setShields(Shields - 1)
                setSettings({
            "type": "input",
            "text": "You scored " + points + ", What's your name for the leaderboards?",
            "function": RedirectPage
            })
            setModal(!modal)

            } else {
                setShields(Shields - 1)
            }
            setArcadeState("Failure")
        }
    }
}

export default Layout