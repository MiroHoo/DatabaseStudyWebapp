
import { useState, useEffect, useRef } from 'react'
import '../css/TestCreator.css'
import Modal from "./Modal.jsx"



function App() {
    const [Testdata, setTestdata] = useState({})
    const [ShowData, setShow] = useState(false)
    const [loading, setLoading] = useState(true)
  useEffect(() => {
       fetch('http://127.0.0.1:3002/test/')
        .then(response => response.json())
        .then(response => setTestdata(response))
        .then(response => console.log(response))
        .then(setLoading(false))
        .catch(error => console.log(error))
        }, []);

        return (
            <>
            { loading ? 
            <><div className={"TestDataHeader"} onClick={()=>setShow(!ShowData)}>Tests</div> { ShowData ? <ShowTests/> : <></> }</>
            : 
            <></>
            }
            </>
        )

    function ShowTests(){
        
        const TestArray = Testdata.map((c,i) => {
            return <a key={c.TestId} onClick={() => navigate(`/testtaking/${c.TestId}`)} className='StartListItem'>{c.Name}</a>
        })
        
        return TestArray
    }
}

export default App