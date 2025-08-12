
import { useState, useEffect, useRef } from 'react'
import '../css/arcade.css'
import { useNavigate } from "react-router";
const Layout = () => {
    const navigate = useNavigate()
    const [Scores, SetScores] = useState({})
    const [Loading, SetLoading] = useState(true)
    //array of jsons for different colors inside the scoreboard
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
    //inits positions to be rendered if not replaced by actual scores
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
    //fetches scores
    useEffect(() => {
       fetch(import.meta.env.VITE_url + "/arcade/scores", {method: 'POST'}).then(res => res.json()).then(res => settingScores(res))
    }, [])
    //sets loading to false after data is precent
    useEffect(() => {
        if (Scores[0]) {
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
            <div className={"Scores"}>
            <div className={"HighScoreHeader"}>Highscores;</div>
            <div className={"ScoreList"}>{Scores.map( (scores,i) =>(<div className={"ScorePageCont " + colors[i].pos}><div className={"ScorePos"}>#{i+1}</div><div className={"ScoreItem"}>{scores.Name}</div><div className={"ScoreItem Number"}>{scores.Score} Points</div></div>))}</div>
            </div>
            <button className={"StartGameButton"} onClick={()=>navigate("/arcade")}>Start Game</button>
            </div>

        }
        </>
    )
    //sets scores and replaces empty ones with the ones from the database
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