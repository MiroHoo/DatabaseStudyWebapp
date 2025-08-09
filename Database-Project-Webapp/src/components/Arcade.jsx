
import { useState, useEffect, useRef } from 'react'
import '../css/arcade.css'
import reroll from '../assets/rotate-cw.svg'
import hp from '../assets/shield.svg'

const Layout = () =>  {
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
    const animationref = useRef()
    useEffect(()=>{
        var QuestionID = Math.random() * (MinMax.MaxId - MinMax.MinId) + MinMax.MinId
        fetch("http://127.0.0.1:3002/arcade/").then(res => res.json()).then(res => {setMinMax(res); getQuestion(res)})
    },[])

    useEffect(()=>{
        if(ArcadeState !== ""){
             setTimeout(() => {
                    setArcadeState("")
                    getQuestion(MinMax);
                    setAnimation(true)
            }, "3000");
        } 
    },[ArcadeState])

     useEffect(() => {
        if(animationref.current !== undefined) {
            animationref.current.addEventListener("animationcancel", () => {
                setAnimation(false);
              });
            animationref.current.addEventListener("animationend", () => {
                setAnimation(false);
              });
            }
    }, [animationref.current]);

    useEffect(()=>{
        if(Question[0]){
            SetLoading(false)
        }
    },[Question])
    return (
        <>
        {
             Loading ? <></> : <div ref={animationref} className={`ArcadeContainer ${AnimationState ? 'open' : 'closed'}`}><div className={"ArcadeQuestHeader"}>Question: </div><div className={"ArcadeHeader"}>{Question[0].Question}</div><input placeholder={"Think carefully"} name="QuestionInput" className={"ArcadeInput " + ArcadeState} value={Input} onChange={(e)=>{setInput(e.target.value)}}></input></div>
        }
          <div className='iconContainer'><div><div className='Stats' onClick={()=>{getQuestion(MinMax); setRerolls(rerolls-1)}}><>Rerolls</><img className={"IconClass"} src={reroll}/><>{rerolls}/3</></div></div><button onClick={()=>{verifyAnswer()}}>Submit</button><div><div className='Stats'><>Health</><img className={"IconClass"} src={hp}/><>{Shields}/3</></div></div></div>
        </>
    )
    function getQuestion(res){
        var QuestionID = Math.round(Math.random() * (res[0].MaxId - res[0].MinId) + res[0].MinId)
        console.log(QuestionID , "  " , DbId)
        setId(QuestionID)
        console.log(res)
        fetch("http://127.0.0.1:3002/arcade/"+QuestionID).then(res => res.json()).then(res => setQuestion(res))
    }
    function verifyAnswer(){
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
    function updateui(res){
        if(res.outcome === true){
            setPoints(points+1);
            setArcadeState("Success")
        } else if (res.half === true) {
            setShields(Shields-1);
            setArcadeState("Partiall")
        } else {    
            setShields(Shields-1)
            setArcadeState("Failure")
        }
    }   
}

export default Layout