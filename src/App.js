import React, { useState } from "react";
import "./App.css";

function App() {
  const symbols = ["🍒", "🍋", "🍉", "👑", "⭐"];

  const payouts = {
    "🍒": { three: 3, two: 2 },
    "🍋": { three: 5, two: 4 },
    "🍉": { three: 4, two: 3 },
    "👑": { three: 10, two: 5 },
    "⭐": { three: 20, two: 10 },
  };

  const [slots, setSlots] = useState(["🍒", "🍒", "🍒"]);
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState("");
  const [message, setMessage] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (isSpinning) return;

    const betAmount = Number(bet);

    if (betAmount <= 0 || isNaN(betAmount)) {
      setMessage("Enter a valid bet amount!");
      return;
    }
    if (betAmount > balance) {
      setMessage("Insufficient balance!");
      return;
    }

    setBalance(balance - betAmount);
    setIsSpinning(true);
    setMessage("");

    setTimeout(() => {
      const newSlots = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];

      setSlots(newSlots);
      setIsSpinning(false);

      const payout = calculatePayout(newSlots, betAmount);

      if (payout > 0) {
        setBalance((prev) => prev + payout);
        setMessage(`🎉 You Won $${payout}!`);
      } else {
        setMessage("❌ You lost this round!");
      }
    }, 700);
  };

  const calculatePayout = (row, bet) => {
    const [a, b, c] = row;

    if (a === b && b === c) {
      return bet * payouts[a].three;
    }
    if (a === b || b === c) {
      const winSymbol = a === b ? a : b;
      return bet * payouts[winSymbol].two;
    }
    return 0;
  };

  return (
    <div className="container">
      <h1>🎰 Slot Machine</h1>

      <h2>Balance: ${balance}</h2>

      <input
        type="number"
        placeholder="Enter bet"
        value={bet}
        onChange={(e) => setBet(e.target.value)}
      />

      <div className="slots">
        <div className={`slot ${isSpinning ? "spin" : ""}`}>{slots[0]}</div>
        <div className={`slot ${isSpinning ? "spin" : ""}`}>{slots[1]}</div>
        <div className={`slot ${isSpinning ? "spin" : ""}`}>{slots[2]}</div>
      </div>

      <button onClick={spin} disabled={isSpinning}>
        {isSpinning ? "Spinning..." : "Spin"}
      </button>

      <p className="message">{message}</p>
    </div>
  );
}

export default App;
