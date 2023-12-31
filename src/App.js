import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import React, { useEffect, useState } from "react";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setNumber((prevNumber) => prevNumber + 1);

      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setNumber(0);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {" "}
      {tenzies && <Confetti />} <h1 className="title"> Tenzies </h1>{" "}
      <p className="instructions">
        Roll until all dice are the same.Click each die to freeze it at its
        current value between rolls.{" "}
      </p>{" "}
      <div className="dice-container"> {diceElements} </div>{" "}
      <div>
        <p> Number of rolls: {number} </p>{" "}
      </div>{" "}
      <button className="roll-dice" onClick={rollDice}>
        {" "}
        {tenzies ? "New Game" : "Roll"}{" "}
      </button>{" "}
    </main>
  );
}

export default App;
