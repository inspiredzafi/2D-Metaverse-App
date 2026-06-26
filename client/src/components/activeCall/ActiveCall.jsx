import React from 'react'
import './ActiveCall.css'

const ActiveCall = () => {
  return (
    <div id='activeCall'>
        <h2 >Active Call</h2>
        <div id="videoContainer">
            <video id='remoteVideo'></video>
            <video id='localVideo'></video>
        </div>
    </div>
  )
}

export default ActiveCall