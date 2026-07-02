import React from 'react'
import './PlayerTile.css'

const PlayerTile = ({player}) => {
  return (
    <div className='playerTile'>
        <div className="avatar" style={{backgroundColor: player.color}}>{player.name[0]} </div>
        <div className="name">{player.name} </div>
        <div className="status"></div>
    </div>
  )
}

export default PlayerTile