import React, { useRef } from 'react'
import { useGame } from '../../hooks/useGame.js'
import './Playfield.css'

const Playfield = ({setActiveCall}) => {
  const ref = useRef(null);
  useGame(ref, setActiveCall);

  return (

    <canvas id="playfield" height={600} width={1100} ref={ref}></canvas>
  )
}

export default Playfield