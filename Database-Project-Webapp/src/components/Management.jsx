
import { useState, useEffect, useRef } from 'react'
import '../css/TestManagin.css'
import Modal from "./Modal.jsx"



function App() {
    const [Testdata, setTestdata] = useState({})
    const [ShowData, setShow] = useState(false)
    const [loading, setLoading] = useState(true)
    const [open, setItemsOpen] = useState({})
    const [modal, setModal] = useState(false)
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
    return (
        <>
            {
                modal ? <div id="ModalDiv"><ModalSetter /></div> : <></>
            }
            {loading ?
                <></>
                :
                <div className='ManagementContainer'> {Testdata.map((c, i) => <><div className={"ManagementHeader"} onClick={() => setOpen(i)}>{c.Name}</div>{c.Open ? <ShowTests index={i} /> : <></>}</>)} </div>
            }
        </>
    )

    function ShowTests(props) {
        const TestArray = <div key={Testdata[props.index].TestId} className="ManagementItemCont"><div onClick={() => { InputModal(Testdata[props.index].Name, Testdata[props.index].TestId, props.index);  console.log(Testdata) }}>{Testdata[props.index].Name}</div><div>{Testdata[props.index].TestId}</div><div>List of testresults</div><div>Average score</div><button className="DeleteTest" onClick={() => { QuestionModal(Testdata[props.index].Name, Testdata[props.index].TestId, props.index); }}>Delete</button></div>
        return TestArray
    }
    function InitOpen(res) {
        const arrayofindexes = res.map((c, i) => { res[i].Open = false; return res[i] })
        setTestdata(arrayofindexes)
    }
    function ModalSetter() {
        return <Modal Modalsettings={{ type: ModalSettings.type, text: ModalSettings.text, function: ModalSettings.function, funcvar: ModalSettings.funcvar }} stateChanger={setModal} />
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
         console.log(Testdata)
        setSettings({
            type: "input",
            text: "Change " + name + "'s name",
            function: ChangeName,
            funcvar: { "id": id, "index": index}
        })
        setModal(!modal);
    }

    function ChangeName(id ,input,funcvar) {
        const url = "http://127.0.0.1:3002/manage/update/" + funcvar.id
        console.log(url)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name" : input })
        }
        fetch(url, options).then(response => response.json()).then(response => console.log(response)).then(UpdateElement(input, funcvar.index))
    }

    function RemoveElement(index) {
        setTestdata(Testdata.filter((c, i) => i !== index))
    }

    function UpdateElement(name, index){
        console.log(name)
        console.log(Testdata)
        const array = Testdata.map((c,i)=> {
            if(i === index){
                Testdata[i].Name = name; return Testdata[i]
            } else {
                return c
            }
        })
        console.log(array)
        setTestdata(array)
    }

    function DeleteQuestion(id, funcvar) {
        fetch("http://127.0.0.1:3002/manage/delete/" + funcvar.id).then(response => response.json()).then(response => console.log(response)).then(RemoveElement(funcvar.i))
    }
    function setOpen(index) {
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

}

export default App