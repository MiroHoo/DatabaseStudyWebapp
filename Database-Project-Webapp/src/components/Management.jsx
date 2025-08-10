
import { useState, useEffect, useRef } from 'react'
import '../css/TestManagin.css'
import Modal from "./Modal.jsx"
import up from "../assets/chevron-up.svg"
import down from "../assets/chevron-down.svg"


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

    const [selection, SetSelection] = useState("")

    const [ModalSettings, setSettings] = useState({
        "type": "",
        "text": "",
        "function": "",
    })
    //fetches tests
    useEffect(() => {
         fetch('http://127.0.0.1:3002/test/')
            .then(response => response.json())
            .then(response => InitOpen(response))
            .then(response => setLoading(!loading))
            .catch(error => console.log(error))
    }, []);
    //checks if data is there and allows the element to be rendered
    useEffect(()=> {
       if(TestAnswer[0] !== undefined && ShowData !== true){
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
                <div className='ManagementContainer'> {Testdata.map((c, i) => <><div className={`ManagementHeader ${c.TestId === selection ? 'open' : 'closed'}`} id={c.TestId} onClick={() => c.Open === false ? FetchAnswers(c.TestId, i) : closed()}>{c.Name} <div><img className={`openImage ${c.Open ? 'open' : 'closed'}`}src={c.Open === false ? up : down}/></div></div>{c.Open ? <ShowTests index={i} /> : <></>}</>)} </div>
            }
        </>
    )
    //renders test
    function ShowTests(props) {
        SetSelection(Testdata[props.index].TestId)
        const TestArray = <div key={Testdata[props.index].TestId} className="ManagementItemCont">
            <div className={"ManagementContent"} onClick={() => { InputModal(Testdata[props.index].Name, Testdata[props.index].TestId, props.index);}}>{Testdata[props.index].Name}</div>
            <div><buttton>here</buttton></div>
            {ShowData ? 
            <>
          <TestSetter/>
            </>
            :
            <></>
            }
            <div className={"ManagementContent"}>Average score: </div>
            <button className="DeleteTest" onClick={() => { QuestionModal(Testdata[props.index].Name, Testdata[props.index].TestId, props.index); }}>Delete</button></div>
        return TestArray
    }
    //gets answers from backend
    function FetchAnswers(TestId,i){
       fetch("http://localhost:3002/manage/fetchscores/"+TestId).then(res => res.json()).then(res => setAnswer(res)).then(setOpen(i))
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
    console.log(TestAnswer[0])
    var index = 0;
    var temparray = []
    var elemarray = []
    if(TestAnswer[0] !== undefined){
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
    if(i < 5){
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
              pusharray.push(<div className={"AnswerCont " + Class}><div className='AnswerText'>No Answer</div><div className='AnswerText'>{c.Score}/1</div></div>)  
            } else {
                if(c.Answer.length < 50){
                    pusharray.push(<div className={"AnswerCont " + Class} ><div className='AnswerText query'>{c.Answer}</div><div className='AnswerText'>{c.Score}/1</div></div>)
                } else {
                    pusharray.push(<div className={"AnswerCont " + Class}><div className='AnswerText long'>{c.Answer}</div><div className='AnswerText'>{c.Score}/1</div></div>)
                }
            }
        })
        return <><div className='AttemptClass'><div className='AttemptHeader'>Attempt {i+1}</div>{pusharray}</div><div className='AttemptDivider'></div></>
    } else {
        return; 
    }
    })
    return array
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
    //Changes name inside the backend
    function ChangeName(input,funcvar) {
        const url = "http://127.0.0.1:3002/manage/update/" + funcvar.id
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ "name" : input })
        }
        fetch(url, options).then(response => response.json()).then(response => console.log(response)).then(UpdateElement(input, funcvar.index))
    }
    //removes element inside frontend
    function RemoveElement(index) {
        setTestdata(Testdata.filter((c, i) => i !== index))
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
        fetch("http://127.0.0.1:3002/manage/delete/" + funcvar.id, { credentials:'include'}).then(response => response.json()).then(RemoveElement(funcvar.i))
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