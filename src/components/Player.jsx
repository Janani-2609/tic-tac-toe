import { useState } from 'react'
import './player.css'
import '../index.css'

export default function Player({name, symbol, isActive, onChangeName}) {
    const [changeName, setChangedName] = useState(name);
    const [isEditing, setEditing] = useState(false);

    function handleNameChange(event) {
        setChangedName(event.target.value);     
    }

    function handleEditClick() { 

        if(isEditing) {
            onChangeName(symbol, playerName)
        }
        setEditing((editing) => !editing);
    }

    let playerName = <span className="player-name">{changeName}</span>;

    if(isEditing) {
        playerName = (
         <input type="text" className='playername-edit' placeholder='  Player name' value={changeName} onChange={handleNameChange}/>
    );
}
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>  
        </li>
    )
}