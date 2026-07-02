import React, { useContext } from 'react'
import './ActivePlayers.css';
import PlayersContext from '../../context/PlayersContext';
import PlayerTile from '../playerTile/PlayerTile';


const ActivePlayers = () => {
  const {playersList} = useContext(PlayersContext);

  return (
    <>
    <h3>In this Space</h3>
    <div className="activePlayersList">
      {
      playersList.map((player) => 
        <PlayerTile key={player.id} player={player} />
        )
        }
    </div>
      </>
    
  )
}

export default ActivePlayers