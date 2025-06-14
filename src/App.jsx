import {useState} from "react";
import Die from "./Die.jsx"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import { useRef, useEffect } from "react";



export default function App() {

  function generateAllNewDice() {
    const newArr = []
    for(let i=0; i<10; i++) {
      newArr.push({
        id: nanoid(),
        value : Math.floor(Math.random() * (6 - 1 + 1)) + 1, 
        isHeld : false})
    }
    return newArr
} 



const [numbers, setNumbers] = useState(generateAllNewDice)

const buttonRef = useRef(null)


function hold(id) {
  setNumbers(oldNumbers => oldNumbers.map(item =>
    item.id === id
    ? {...item, isHeld : !item.isHeld}
    : item
  ))
}

  const diceElements = numbers.map((item) => (
    <Die 
      key={item.id} 
      value={item.value} 
      isHeld={item.isHeld} 
      hold={() => hold(item.id)}
    />
  ))



function rollDice() {
  if(gameWon === true) {
    setNumbers(generateAllNewDice)
  } else {
    setNumbers(oldNumbers => 
      oldNumbers.map(item =>
        item.isHeld === false ?
        {...item, value : Math.floor(Math.random() * (6-1+1))+1} :
        item
      )
    )  
  }
}


const valuesSame = numbers.every(item => item.value === numbers[0].value);
const allHeld = numbers.every(item => item.isHeld === true);

const gameWon = valuesSame && allHeld

useEffect(() => {
  if(gameWon && buttonRef.current) {
    buttonRef.current.focus()
  }
}, [gameWon])

  return (
    <main className="main">
      {gameWon && <Confetti />}
      <h1 className="header">Tenzies</h1>
      <p className="paragraph">Click each die to freeze at its current value between the roll.
        Roll until all dice are the same.
      </p>
      <div className="dice-container">
        {diceElements}
      </div>
      
      <button 
        ref={buttonRef} 
        className="roll-btn" 
        onClick={rollDice}>{gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}