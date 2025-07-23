import '../css/index.css'
import '../css/start.css'
import gif from '../assets/Cool.gif'
import { useEffect, useState, useRef } from 'react'
import { useParams } from "react-router";


const App = () => {
    let params = useParams();
    const [TestQuestions, setQuestions] = useState({})
    useEffect(() => {
        var url = "http://127.0.0.1:3002/test/id/"+params.testId
        fetch(url).then(response => response.json()).then(response => console.log(response))
    }, []);

    return (
        <div>
            hello
        </div>
    )
    function Questions(){
        
    }
}

export default App