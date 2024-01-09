import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import home from './home-icon.png'
import { WINNING_POSSIBILITIES } from './winning-possibilities'
import './index.css'
import GameOver from './components/GameOver'
import HomePage from './HomePage'

const initialGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [showHome, setShowHome] = useState(true);
  const handleStartGame = () => {
    setShowHome(false);
  };
  const handleGoHome = () => {
    setShowHome(true);
  };

  const [playerName, setPlayerName] = useState({
    X: 'Player 1',
    O: 'Player 2',
  })

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGame.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const possibilities of WINNING_POSSIBILITIES) {
    const firstBoxSymbol = gameBoard[possibilities[0].row][possibilities[0].col];
    const secondBoxSymbol = gameBoard[possibilities[1].row][possibilities[1].col];
    const thirdBoxSymbol = gameBoard[possibilities[2].row][possibilities[2].col];

    if (
      firstBoxSymbol &&
      firstBoxSymbol === secondBoxSymbol &&
      firstBoxSymbol === thirdBoxSymbol
    ) {
      winner = playerName[firstBoxSymbol];
    }
  }

  const matchDraw = gameTurns.length === 9 && !winner;

  function handleGame(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
    setPlayerName({
      X: 'Player 1',
      O: 'Player 2',
    });
  }

  function handlePlayerName(symbol, newName) {
    setPlayerName(prevName => {
      return {
        ...prevName,
        [symbol]: newName
      };
    });
  }

  return (
    <div>
      {showHome ? (
        <HomePage onStartGame={handleStartGame} />
        
      ) : (
        <center>
          <img src={home} alt="" onClick={handleGoHome} />
          <div className="game-container">
            <ol id="players" className='player-highlight'>
              <Player
                name="PLAYER 1"
                symbol="X"
                isActive={activePlayer === 'X'}
                onChangeName={handlePlayerName}
              /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Player
                name="PLAYER 2"
                symbol="O"
                isActive={activePlayer === 'O'}
                onChangeName={handlePlayerName}
              />
            </ol>
            {(winner || matchDraw) && (
              <GameOver winner={winner} onRematch={handleRematch} />
            )}
            <GameBoard
              onSelectBox={handleGame}
              board={gameBoard}
            />
          </div>
          <p className='copyrights-text'>Tic Tac Toe | Copyrights &#169; 2024 Janani, All rights received.</p>

        </center>

      )}
    </div>
  )
}

export default App