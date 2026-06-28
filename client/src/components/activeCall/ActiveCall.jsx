import React from 'react'
import './ActiveCall.css'

const ActiveCall = ({localVRef, remoteVRef}) => {
  return (
    <div id='activeCall'>
        <h2 >Active Call</h2>
        <div id="videoContainer">
            <video id='remoteVideo' ref={remoteVRef} autoPlay playsInline></video>
            <video id='localVideo' ref={localVRef} autoPlay playsInline muted ></video>
        </div>
    </div>
  )
}

export default ActiveCall