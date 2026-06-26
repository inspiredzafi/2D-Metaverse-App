import React from 'react'
import Header from './components/header/Header.jsx'
import Playfield from './components/playfield/Playfield.jsx';
import CallArea from './components/callArea/CallArea.jsx';
import { useContext } from 'react';
import SocketContext, { SocketProvider } from './context/SocketContext.jsx';

import './App.css';

const App = () => {
  return (
    <SocketProvider>
    <Header/>
    <div className="container">
        <Playfield/>
        <CallArea/>
    </div>
    </SocketProvider>   

  )
}

export default App