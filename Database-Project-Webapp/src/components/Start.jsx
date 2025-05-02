import '../css/index.css'
import '../css/start.css'
import gif from '../assets/Cool.gif'
function App() {
    return (
        <>
            <div className='StartContainer'>
                <img src={gif}></img>
                <div className='SelectionContainer'>
                    <div className='StartList'>
                      <ListOfAllTest/>
                    </div>
                    <button>Start</button>
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
        siteElement.push(<a className='StartListItem'>{element}</a>)
    });
    return siteElement
}