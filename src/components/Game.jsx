import React from 'react'
import { useState, useEffect, useRef } from 'react';

const Game = () => {

const getRandomNumber = () => {
    return Math.floor(Math.random() * maxNum) + 1
}

const inputRef = useRef(null);
const maxNum = 20;
const [isGuessed, setIsGuessed] = useState(false);   
const [chances, setChances] = useState(5);
const [disableInput, setDisableInput] = useState(false);
const [randomNum, setRandomNum] = useState(getRandomNumber());
const [guess, setGuess] = useState('');
const [submitBtn, setSubmitBtn] = useState(true);
const [showMsg, setShowMsg] = useState(false);
const [msg, setMsg] = useState('');

useEffect(() => {
    inputRef.current.focus();
},[])


const resetGame = () => {
    setIsGuessed(false);
    setChances(5);
    setRandomNum(getRandomNumber());
    setGuess('');
    setShowMsg(false);
    setDisableInput(false);
    setSubmitBtn(true);
    inputRef.current.value = '';
    setTimeout(() => {
        inputRef.current.focus();
    }, 0);
}

const handleInput = (event) => {
    const inputValue = parseInt(event.target.value)
    if(isNaN(inputValue) || inputValue < 1 || inputValue > maxNum){
        setSubmitBtn(true);
    }
    else{
        setSubmitBtn(false);
    }
    setGuess(inputValue);
}

const handleSubmit = () => {
    setSubmitBtn(true);
    if (randomNum === guess) {
        setIsGuessed(true);
        setMsg(`Congratulations! You guessed the random number '${randomNum}' correctly!`);
        setDisableInput(true);
    } else {
        setChances(prevChances => prevChances - 1);
        if (randomNum - guess >= 5) {
            setMsg(`Your guess '${guess}' is too low!`);
        } else if (guess - randomNum >= 5) {
            setMsg(`Your guess '${guess}' is too high!`);
        } else {
            setMsg(`Your guess '${guess}' is close`);
        }
        setShowMsg(true);

        if (chances - 1 === 0) {
            setMsg(`You lose. The random number was '${randomNum}'`);
            setDisableInput(true);
        }
    }
    inputRef.current.value = '';
    inputRef.current.focus();
}

const handleEnter = (event) => {
    if(event.key === 'Enter'){
        handleSubmit();
    }
}

  return (
    <>
            {chances === 5 && <div>Random Number has been generated!</div>}
            {!isGuessed &&
            <>
            <div>Guess the random number!</div>
            <div>You have {chances} chances left</div>
            </> 
            }
            <div>Enter any number between 1 - {maxNum}</div>

            <div className="guess">
                <label htmlFor='num'>Enter your guess : </label>
                <input onKeyDown={handleEnter} ref={inputRef} disabled={disableInput} onInput={handleInput} className='number-input' type="number" name='num' inputMode='numeric' requried='true' />
                <button className='submit-btn' disabled={submitBtn} onClick={handleSubmit}>Submit Guess</button>
            </div>

            {showMsg && <div className='font'>{msg}</div>}

            <button className='play-again-btn' onClick={resetGame}>Play again</button>
    </>
  )
}

export default Game
