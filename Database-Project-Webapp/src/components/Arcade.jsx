
import { useState, useEffect, useRef } from 'react'
import '../css/arcade.css'
import reroll from '../assets/rotate-cw.svg'
import Modal from "./Modal.jsx"
import hp from '../assets/shield.svg'
import { useNavigate } from "react-router";
const Layout = () => {
    let navigate = useNavigate();
    const [Loading, SetLoading] = useState(true)
    const [MinMax, setMinMax] = useState({})
    const [Question, setQuestion] = useState({})
    const [DbId, setId] = useState(0)
    const [ArcadeState, setArcadeState] = useState("")
    const [AnimationState, setAnimation] = useState(false)
    const [Input, setInput] = useState("")
    const [Shields, setShields] = useState(3)
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
    useEffect(() => {
        var QuestionID = Math.random() * (MinMax.MaxId - MinMax.MinId) + MinMax.MinId
        fetch("http://127.0.0.1:3002/arcade/").then(res => res.json()).then(res => { setMinMax(res); getQuestion(res) })
    }, [])

    useEffect(() => {
        if (ArcadeState !== "") {
            setTimeout(() => {
                setTimeout(()=> {
                    getQuestion(MinMax)
                    setDisabled(false)
                }, "1000")
                setAnimation(true)
                setArcadeState("")
            }, "2000");
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
                Loading ? <></> : <div ref={animationref} className={`ArcadeContainer ${AnimationState ? 'open' : 'closed'}`}><div className={"ArcadeQuestHeader"}>Question: </div><div className={"ArcadeHeader"}>{Question[0].Question}</div><input placeholder={"Think carefully"} name="QuestionInput" className={"ArcadeInput " + ArcadeState} value={Input} onChange={(e) => { setInput(e.target.value) }}></input></div>
            }
            <div className='iconContainer'>
                <div className='StatContainer'>
                    <button disabled={disabled || rerolls === 0} className='Stats Reroll' onClick={() => { Roll()}}>
                        <>Rerolls</>
                        <img className={"IconClass"} src={reroll} /><>{rerolls}/3</>
                    </button>
                </div>
                <button className={`SubmitBtn`} disabled={Shields !== 0 || disabled ? false : true} onClick={() => { verifyAnswer() }}>Submit</button>
                <div className='StatContainer'>
                    <div className='Stats'><>Health</>
                        <img className={"IconClass"} src={hp} /><>{Shields}/3</>
                    </div>
                </div>
            </div>
        </>
    </>
    )
    
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
    function getQuestion(res) {
        var QuestionID = Math.round(Math.random() * (res[0].MaxId - res[0].MinId) + res[0].MinId)
        setId(QuestionID)
        fetch("http://127.0.0.1:3002/arcade/" + QuestionID).then(res => res.json()).then(res => setQuestion(res))
    }
    function verifyAnswer() {
        var url = "http://127.0.0.1:3002/compare/" + DbId
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

        fetch(url, options).then(response => response.json()).then(response => updateui(response))
    }
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
        fetch("http://127.0.0.1:3002/arcade/insert",options)    
        navigate("/scores")
    }
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