import React from 'react'
import Header from './components/header/Header.jsx'
import Playfield from './components/playfield/Playfield.jsx';
import CallArea from './components/callArea/CallArea.jsx';
import { useContext } from 'react';
import SocketContext, { SocketProvider } from './context/SocketContext.jsx';
import { useState } from 'react';
import { PlayerProvider } from './context/PlayersContext.jsx';

import './App.css';

const App = () => {
  const [activeCall, setActiveCall] = useState(null);

  return (
    <>
      <Header />
      <PlayerProvider>

        <div className="container">

          <Playfield activeCall={activeCall} setActiveCall={setActiveCall} />
          <CallArea activeCall={activeCall} setActiveCall={setActiveCall} />

        </div>

      </PlayerProvider>
      
      <button onClick={() => setActiveCall({ myId: '234', remoteId: '123' })}>
        Test Call
      </button>
    </>

  )
}

export default App