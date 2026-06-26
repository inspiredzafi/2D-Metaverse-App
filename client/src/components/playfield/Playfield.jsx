import React, { useRef } from 'react'
import { useGame } from '../../hooks/useGame.js'
import './Playfield.css'

const Playfield = () => {
  const ref = useRef(null);
  useGame(ref);

  return (

    <canvas id="playfield" height={600} width={1100} ref={ref}></canvas>
  )
}

export default Playfield