
import { useState, useEffect, useRef } from 'react'
import '../css/arcade.css'
import { useNavigate } from "react-router";
const Layout = () => {
    const navigate = useNavigate()
    const [Scores, SetScores] = useState({})
    const [Loading, SetLoading] = useState(true)
    const colors = [
        {
            pos:"first"
        },
        {
            pos:"second"
        },
        {
            pos:"third"
        },
        {
            pos:""
        },
        {
            pos:""
        }
    ]
    const positions = [
        {
            Name:"unclaimed",
            Score:0
            
        },
        {
            Name:"unclaimed",
            Score:0
        },
        {
            Name:"unclaimed",
            Score:0
        },
        {
            Name:"unclaimed",
            Score:0
        },
        {
            Name:"unclaimed",
            Score:0
        }
    ]
    useEffect(() => {
       fetch("http://127.0.0.1:3002/arcade/scores", {method: 'POST'}).then(res => res.json()).then(res => settingScores(res))
    }, [])
    useEffect(() => {
        if (Scores[0]) {
            console.log(Scores)
            SetLoading(false)
        }
    }, [Scores])
    return (
        <>  
        {
            Loading ? 
            <></>
            : 
            <div className={"HighScoreCont"}>
            <div className={"HighScoreHeader"}>Highscores</div>
            <div className={"ScoreList"}>{Scores.map( (scores,i) =>(<div className={"ScorePageCont " + colors[i].pos}><div className={"ScorePos"}>#{i+1}</div><div className={"ScoreItem"}>{scores.Name}</div><div className={"ScoreItem Number"}>{scores.Score}</div></div>))}</div>
            <button className={"StartGameButton"} onClick={()=>navigate("/arcade")}>Start Game</button>
            </div>

        }
        </>
    )
    function settingScores(res){
        if(res.length !== undefined){
            for(let i = 0; i<res.length; i++){
                positions[i] = res[i]
            }
        }
        SetScores(positions)
    }
}

export default Layout