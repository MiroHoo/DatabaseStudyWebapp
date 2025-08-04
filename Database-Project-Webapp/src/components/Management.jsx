
import { useState, useEffect, useRef } from 'react'
import '../css/TestManagin.css'
import Modal from "./Modal.jsx"



function App() {
    const [Testdata, setTestdata] = useState({})
    const [ShowData, setShow] = useState(false)
    const [loading, setLoading] = useState(true)
  useEffect(() => {
       fetch('http://127.0.0.1:3002/test/')
        .then(response => response.json())
        .then(response => setTestdata(response))
        .then(response => setLoading(!loading))
        .catch(error => console.log(error))
        }, []);
        return (
            <>
            { loading ? 
            <></>
            :
            <div className='ManagementContainer'> {Testdata.map((c,i)=><><div className={"ManagementHeader"} onClick={()=>setShow(!ShowData)}>{c.Name}</div><ShowTests index={i}/></>)} </div>
            }
            </>
        )

    function ShowTests(props){  
        const TestArray = <div key={Testdata[props.index].TestId} className="ManagementItemCont"><div>{Testdata[props.index].Name}</div><div>{Testdata[props.index].TestId}</div></div>
        return TestArray
    }
}

export default App