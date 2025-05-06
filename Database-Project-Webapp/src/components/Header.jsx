
import { useState } from 'react'
import '../css/index.css'

function App() {

  const [BurgerVis, setBurgerVis] = useState(false)

  return (
    <>
      <div className='HeaderContainer'>
        <div className='HeaderContent'>
          <a className='HeaderName'>Database Learning Webapp</a>
          <a className='Burgermenu' onClick={() => {setBurgerVis(!BurgerVis)}}>
            <div className='burgerlayer'></div>
            <div className='burgerlayer'></div>
            <div className='burgerlayer'></div>
          </a>
        </div>
        <div>
          </div>
      </div>
      <div className={`BurgerContainer ${BurgerVis ? 'open' : ''}`}>
      <a className='BurgerOption'>Option 1</a> 
      <a className='BurgerOption'>Option 2</a>
      <a className='BurgerOption'>Option 3</a>
      <a className='BurgerOption'>Option 4</a>
      </div>
    </>
  )
}

export default App