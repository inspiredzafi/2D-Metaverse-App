import React from 'react'
import './ActiveCall.css'

const ActiveCall = ({remoteVRef, localVRef}) => {
  return (
    <div id='activeCall'>
        <h2 >Active Call</h2>
        <div id="videoContainer">
            <video id='remoteVideo' ref={remoteVRef}></video>
            <video id='localVideo' ref={localVRef}></video>
        </div>
    </div>
  )
}

export default ActiveCall