import '../css/index.css'
import '../css/start.css'
import gif from '../assets/Cool.gif'
import { useState } from 'react'

function App() {
    const [state, setState] = useState(0)
    return (
        <>
            <div className='StartContainer'>
                <img src={gif}></img>
                <div className='SelectionContainer'>
                    <div className='ButtonContainer'>
                    <button className='StartSelectButton' onClick={() => setState(!state)}>Select a test!</button>    
                    </div>
                    <div className= {`ListofTests ${state ? 'open' : ''}`}>
                        <ListOfAllTest/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App

function ListOfAllTest() {
    var listofTests = [];
    var siteElement = []; 
    for(var i = 0; i<3; i++){
        listofTests[i] = "Test" + i
    }
    listofTests.forEach(element => {
        siteElement.push(<a key={element} className='StartListItem'>{element}</a>)
    });
    return siteElement
}