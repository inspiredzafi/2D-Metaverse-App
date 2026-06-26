import React from 'react'
import './CallArea.css'
import ActiveCall from '../activeCall/ActiveCall.jsx';
import ActivePlayers from '../activePlayers/ActivePlayers.jsx';

const CallArea = () => {
  return (
    <div id='call-area'>
        <ActiveCall/>
        <ActivePlayers/>
        <button id='endCallBtn'>End Call</button>
    </div>
  )
}

export default CallArea