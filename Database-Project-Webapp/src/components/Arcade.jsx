
import { useState, useEffect, useRef } from 'react'
import '../css/arcade.css'
import reroll from '../assets/rotate-cw.svg'
import hp from '../assets/shield.svg'

const Layout = () =>  {
    const [Loading, SetLoading] = useState(true)
    const [MinMax, setMinMax] = useState({})
    const [Question, setQuestion] = useState({})
    const [Input, setInput] = useState("")
    const [Shields, setShields] = useState(3)
    const [rerolls, setRerolls] = useState(3)
    useEffect(()=>{
        var QuestionID = Math.random() * (MinMax.MaxId - MinMax.MinId) + MinMax.MinId
        fetch("http://127.0.0.1:3002/arcade/").then(res => res.json()).then(res => {setMinMax(res); getQuestion(res)})
    },[])
    useEffect(()=>{
        if(Question[0]){
            SetLoading(false)
        }
    },[Question])
    return (
        <>
        <div className='iconContainer'><div><img className={"IconClass"} src={reroll}/><>{rerolls}/3</></div><div><>{Shields}/3</><img className={"IconClass"} src={hp}/></div></div>
        {
             Loading ? <></> : <div className={"ArcadeContainer"}><div className={"ArcadeQuestHeader"}>Question: </div><div className={"ArcadeHeader"}>{Question[0].Question}</div><input placeholder={"Think carefully"} name="QuestionInput" className={"ArcadeInput"} value={Input} onChange={(e)=>{setInput(e.target.value)}}></input></div>
        }
        </>
    )
    async function getQuestion(res){
        var QuestionID = Math.round(Math.random() * (res[0].MaxId - res[0].MinId) + res[0].MinId)
        console.log(QuestionID)
        fetch("http://127.0.0.1:3002/arcade/"+QuestionID).then(res => res.json()).then(res => setQuestion(res))
    }
}

export default Layout