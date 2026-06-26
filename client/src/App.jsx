import React from 'react'
import Header from './components/header/Header.jsx'
import Playfield from './components/playfield/Playfield.jsx';
import CallArea from './components/callArea/CallArea.jsx';

import './App.css';

const App = () => {
  return (
    <>
    <Header/>
    <div className="container">
        <Playfield/>
        <CallArea/>
    </div>
    </>
  )
}

export default App