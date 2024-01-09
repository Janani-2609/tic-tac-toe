import './gameover.css'

export default function GameOver({ winner, onRematch }) {
    return (
        <div id="game-over">
            <h1>Game Over!</h1>
            {winner && <p className='winner-text'>Winner is...</p>}
            {winner && <p>{winner}</p>}
            {!winner && <p>Match Draw!</p>}
            <button onClick={onRematch}>REMATCH</button>
        </div>
    )
}