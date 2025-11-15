import React, { useState } from "react";
import "./SlotMachine.css";

function SlotMachine() {
  const symbols = ["🍒", "🍋", "⭐", "🍉", "👑"];
  const [slots, setSlots] = useState(["🍒", "🍋", "⭐"]);
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(10);
  const [message, setMessage] = useState("");

  const spin = () => {
    if (bet <= 0) return setMessage("Bet must be greater than 0.");
    if (bet > balance) return setMessage("Not enough balance!");

    setBalance(balance - bet);

    const newSlots = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];

    setSlots(newSlots);
    calculatePayout(newSlots);
  };

  const calculatePayout = (row) => {
    let payout = 0;

    if (row[0] === row[1] && row[1] === row[2]) {
      payout = getMultiplier(row[0]) * bet;
    } else if (row[0] === row[1] || row[1] === row[2]) {
      payout = getMultiplier(row[1]) * (bet / 2);
    }

    if (payout > 0) {
      setMessage(`You WON $${payout}!`);
      setBalance(balance + payout);
    } else {
      setMessage("You lost this round.");
    }
  };

  const getMultiplier = (symbol) => {
    switch (symbol) {
      case "🍒": return 3;
      case "🍉": return 4;
      case "🍋": return 5;
      case "👑": return 10;
      case "⭐": return 20;
      default: return 0;
    }
  };

  return (
    <div className="slot-container">
      <div className="balance">Balance: ${balance}</div>

      <div className="row">
        {slots.map((symbol, index) => (
          <div key={index} className="slot-box">{symbol}</div>
        ))}
      </div>

      <input
        type="number"
        className="bet-input"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
        min="1"
      />

      <button className="spin-btn" onClick={spin}>SPIN</button>

      <div className="message">{message}</div>
    </div>
  );
}

export default SlotMachine;
