
import { useState, useEffect, useRef } from 'react'
import '../css/TestManagin.css'
import Modal from "./Modal.jsx"



function App() {
    const [Testdata, setTestdata] = useState({})
    const [ShowData, setShow] = useState(false)
    const [loading, setLoading] = useState(true)
    const [open, setItemsOpen] = useState({})
  useEffect(() => {
       fetch('http://127.0.0.1:3002/test/')
        .then(response => response.json())
        .then(response => InitOpen(response))
        .then(response => setLoading(!loading))
        .catch(error => console.log(error))
        }, []);
        return (
            <>
            { loading ? 
            <></>
            :
            <div className='ManagementContainer'> {Testdata.map((c,i)=><><div className={"ManagementHeader"} onClick={()=>setOpen(i)}>{c.Name}</div>{c.Open ? <ShowTests index={i}/>: <></>}</>)} </div>
            }
            </>
        )

    function ShowTests(props){  
        const TestArray = <div key={Testdata[props.index].TestId} className="ManagementItemCont"><div>{Testdata[props.index].TestId}</div><div>List of testresults</div><div>Average score</div></div>
        return TestArray
    }
    function InitOpen(res){
        const arrayofindexes = res.map((c,i)=> {res[i].Open = false; return res[i]})
        setTestdata(arrayofindexes)
    }
    function setOpen(index){
        if(Testdata[index].Open){
        const updatedarray = Testdata.map((c,i)=>{
                if(i === index){
                Testdata[i].Open = false; return Testdata[i]
                } else {
                    return c
                }
            })
        setTestdata(updatedarray)
        } else {
        const updatedarray = Testdata.map((c,i)=>{
                if(i === index){
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