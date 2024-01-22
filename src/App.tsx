import { useState, useEffect } from "react";
import "./App.css";
import Tile from "./Tile";
import Scoreboard from "./Scoreboard";

function App() {
   const [player, setPlayer] = useState("X");
   const [winner, setWinner] = useState("");
   const [score, setScore] = useState({ X: 0, Y: 0 });

   const clickHandle = (index: number) => {
      if (tileArray[index] !== "") {
         return;
      } else {
         const updatedArray = [...tileArray];
         updatedArray[index] = player;
         setTileArray(updatedArray);
         setPlayer(player == "O" ? "X" : "O");
      }
   };

   const [tileArray, setTileArray] = useState(
      Array.from({ length: 9 }, () => "")
   );

   const tiles = tileArray.map((text, index) => (
      <Tile
         key={index}
         onclick={() => {
            clickHandle(index);
         }}
         text={text}
      />
   ));
   const checkwin = () => {
      const wins = [
         [tileArray[0], tileArray[4], tileArray[8]],
         [tileArray[2], tileArray[4], tileArray[6]],
         [tileArray[0], tileArray[1], tileArray[2]],
         [tileArray[3], tileArray[4], tileArray[5]],
         [tileArray[6], tileArray[7], tileArray[8]],
         [tileArray[0], tileArray[3], tileArray[6]],
         [tileArray[1], tileArray[4], tileArray[7]],
         [tileArray[2], tileArray[5], tileArray[8]],
      ];
      const { X, Y } = score;
      const full = tileArray.every((val) => val !== "");

      if (full) {
         setWinner("T");
      }

      wins.forEach((combination) => {
         if (combination.every((combi) => combi === "X")) {
            console.log(combination);
            const newScore = { X: X + 1, Y };
            setScore(newScore);
            setWinner("X");
         } else if (combination.every((combi) => combi === "O")) {
            console.log(combination);
            const newScore = { X: X, Y: Y + 1 };
            setScore(newScore);
            setWinner("O");
         }
      });
   };

   useEffect(() => {
      console.log(tileArray);
      checkwin();
   }, [tileArray]);

   const resetGame = () => {
      setTileArray(Array.from({ length: 9 }, () => ""));
      setPlayer("X");
      setWinner("");
   };

   const newGame = () => {
      setTileArray(Array.from({ length: 9 },() => ""));
      setPlayer("X");
      setWinner("");
      setScore({ X: 0, Y: 0 });
   };
   return (
      <>
         <div className="upper">
            <div className="container">
               {tiles.map((tile) => {
                  return tile;
               })}
            </div>
            <div className="score-holder">
               <Scoreboard title="Player 1 (X)" score={score.X} />
               <Scoreboard title="Player 2 (Y)" score={score.Y} />
            </div>
         </div>
         <button className="new-game" onClick={newGame}>
            Start New Game
         </button>
         {(winner === "X" || winner === "O") && (
            <div className="game-over-overlay">
               <h1>{winner} Wins!</h1>
               <button className="reset" onClick={resetGame}>
                  Reset Game
               </button>
            </div>
         )}
         {winner === "T" && (
            <div className="game-over-overlay">
               <h1>It's a TIE</h1>
               <button className="reset" onClick={resetGame}>
                  Reset Game
               </button>
            </div>
         )}
      </>
   );
}

export default App;
