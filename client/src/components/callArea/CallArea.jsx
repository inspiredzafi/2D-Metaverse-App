import React, { useEffect } from 'react'
import './CallArea.css'
import ActiveCall from '../activeCall/ActiveCall.jsx';
import ActivePlayers from '../activePlayers/ActivePlayers.jsx';
import { useRef } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC.js';

const CallArea = ({activeCall, setActiveCall}) => {

  const remoteVRef = useRef(null);
  const localVRef = useRef(null);
   
    useWebRTC(localVRef, remoteVRef, activeCall, setActiveCall);

  return (
    <div id='call-area'>
        <ActiveCall remoteVRef= {remoteVRef} localVRef = {localVRef}/>
        <ActivePlayers/>
        <button id='endCallBtn'>End Call</button>
    </div>
  )
}

export default CallArea