import React from 'react'
import Header from './components/header/Header.jsx'
import Playfield from './components/playfield/Playfield.jsx';
import CallArea from './components/callArea/CallArea.jsx';
import { useContext } from 'react';
import SocketContext, { SocketProvider } from './context/SocketContext.jsx';
import { useState } from 'react';

import './App.css';

const App = () => {
  const [activeCall, setActiveCall] = useState(null);

  return (
    <SocketProvider>
    <Header/>
    <div className="container">
        <Playfield setActiveCall = {setActiveCall} />
        <CallArea activeCall={activeCall} setActiveCall ={setActiveCall}/>
    </div>
    </SocketProvider>   

  )
}

export default App