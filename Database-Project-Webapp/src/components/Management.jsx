
import { useState, useEffect, useRef } from 'react'
import '../css/TestManagin.css'
import Modal from "./Modal.jsx"



function App() {
    const [Testdata, setTestdata] = useState({})
    const [ShowData, setShow] = useState(false)
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(false)
    const [TestAnswer, setAnswer] = useState([])
    const [Average, setAverage] = useState([])
    const [selection, SetSelection] = useState("")
    const [ModalSettings, setSettings] = useState({
        "type": "",
        "text": "",
        "function": "",
    })
    useEffect(() => {
         fetch('http://127.0.0.1:3002/test/')
            .then(response => response.json())
            .then(response => InitOpen(response))
            .then(response => setLoading(!loading))
            .catch(error => console.log(error))
    }, []);
    useEffect(()=> {
       if(TestAnswer[0] !== undefined){
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
                <div className='ManagementContainer'> {Testdata.map((c, i) => <><div className={`ManagementHeader ${c.TestId === selection ? 'open' : 'closed'}`} id={c.TestId} onClick={() => FetchAnswers(c.TestId, i)}>{c.Name}</div>{c.Open ? <ShowTests index={i} /> : <></>}</>)} </div>
            }
        </>
    )

    function ShowTests(props) {
        SetSelection(Testdata[props.index].TestId)
        const TestArray = <div key={Testdata[props.index].TestId} className="ManagementItemCont">
            <div className={"ManagementContent"}onClick={() => { InputModal(Testdata[props.index].Name, Testdata[props.index].TestId, props.index);}}>{Testdata[props.index].Name}</div>
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

    function FetchAnswers(TestId,i){
       fetch("http://localhost:3002/manage/fetchscores/"+TestId).then(res => res.json()).then(res => setAnswer(res)).then(setOpen(i))
    }

    function InitOpen(res) {
        const arrayofindexes = res.map((c, i) => { res[i].Open = false; return res[i] })
        setTestdata(arrayofindexes)
    }

    function ModalSetter() {
        return <Modal Modalsettings={{ type: ModalSettings.type, text: ModalSettings.text, function: ModalSettings.function, funcvar: ModalSettings.funcvar }} stateChanger={setModal} />
    }
    function TestSetter(){
    var attemptid = TestAnswer[0].Attempt_id
    var index = 0;
    var temparray = []
    var elemarray = []
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
    const array = elemarray.map((cont,i)=>{
    if(i < 5){
        var pusharray = []
        var Class = ""
        cont.forEach((c,i)=>{
            console.log(c.Score)
            if(c.Score === "1"){
                Class = "Sucessful"
            } else if (c.Score === "0"){
                Class = "Failure"
            } else {
                Class = "Partial"
            }
            console.log(Class)
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
    function QuestionModal(Name, id, index) {
        setSettings({
            type: "question",
            text: "Delete Question: " + Name + "?",
            function: DeleteQuestion,
            funcvar: { "id": id, "i": index }
        })
        setModal(!modal);
    }
    function InputModal(name, id, index) {
        setSettings({
            type: "input",
            text: "Change " + name + "'s name",
            function: ChangeName,
            funcvar: { "id": id, "index": index}
        })
        setModal(!modal);
    }

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

    function RemoveElement(index) {
        setTestdata(Testdata.filter((c, i) => i !== index))
    }

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

    function DeleteQuestion(id, funcvar) {
        fetch("http://127.0.0.1:3002/manage/delete/" + funcvar.id, { credentials:'include'}).then(response => response.json()).then(RemoveElement(funcvar.i))
    }
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
    function closed() {
       
            const updatedarray = Testdata.map((c, i) => {
                Testdata[i].Open = false; return Testdata[i]
            })
            setTestdata(updatedarray)
    }

}

export default App