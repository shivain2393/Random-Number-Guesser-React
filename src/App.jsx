import { useState } from 'react'
import Game from './components/Game'
import './App.css'

function App() {
  const [startButton, setStartButton] = useState(false);

  return (
    <>
      <div className="container">
        <h1>Random Number Guesser</h1>
        {!startButton &&
        <button className='start-button' onClick={() => {setStartButton(true)}}>Start</button>
        }
          {startButton && <Game/>}
      </div>
    </>
  )
}

export default App
