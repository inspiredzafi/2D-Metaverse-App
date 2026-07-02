import React from 'react'
import { useEffect } from 'react';
import SocketContext from '../context/SocketContext.jsx';
import { useContext } from 'react';
import { useRef } from 'react';


export async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
        'video': true,
        'audio': true
    })

    return stream;
}

export function useWebRTC(localVRef, remoteVRef, activeCall, setActiveCall) {

    const peer = useRef(new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject'
        }
        ]
    }));
    const { wsRef, addListener, removeListener } = useContext(SocketContext);


    useEffect(() => {
        ; (async function () {

            const localVideo = localVRef.current;
            const remoteVideo = remoteVRef.current;

            addListener(handleMessage);


            peer.current.onicecandidate = function (e) {
                if (e.candidate !== null) {
                    wsRef.current.send(JSON.stringify({ type: 'onicecandidate', candidate: e.candidate, remoteId: activeCall.remoteId }))
                }
            }


            peer.current.ontrack = function (e) {

                remoteVideo.srcObject = e.streams[0];
            }

            if (!activeCall) return;



            const stream = await startCamera();

            localVideo.srcObject = stream;


            stream.getTracks().forEach((track) => {
                peer.current.addTrack(track, stream);
            })


            if (activeCall.myId > activeCall.remoteId) {
                const offer = await peer.current.createOffer();
                await peer.current.setLocalDescription(offer);

                wsRef.current.send(JSON.stringify({ type: 'offer', sdp: peer.current.localDescription, senderId: activeCall.myId, remoteId: activeCall.remoteId }))
            }


        })();



        return () => {
            removeListener(handleMessage);
        }


    }, [activeCall]);

    function endCall() {

        localVRef.current.srcObject?.getTracks().forEach((track) => { track.stop() });
        localVRef.current.srcObject = null;
        remoteVRef.current.srcObject = null;

        peer.current.close();
        peer.current = new RTCPeerConnection();
        setActiveCall(null);


        const hangUpMsg = { type: 'hangup', senderId: activeCall.myId, remoteId: activeCall.remoteId };

            wsRef.current.send(JSON.stringify(hangUpMsg));

    }

    return { endCall }

    async function handleMessage(message) {
        if (message.type === 'answer') {
            if (!peer.current.remoteDescription) {

                await peer.current.setRemoteDescription(message.sdp);
            }
            

        }
        else if (message.type === 'offer') {
            let localActiveCall = activeCall;       // Why? Kyunkay state update hogi, neechay code run krnay k bad, jo error day day ga, right, to ye variable use krain gay updated state ki jagah, kyunkay ye information hi store kr rha, so ig uess, yes, we can do this.
            if (!activeCall) {
                localActiveCall = { myId: message.remoteId, remoteId: message.senderId }
                setActiveCall(localActiveCall);

            }

            await peer.current.setRemoteDescription(message.sdp);

            const answer = await peer.current.createAnswer();
            await peer.current.setLocalDescription(answer);

            wsRef.current.send(JSON.stringify({ type: 'answer', sdp: peer.current.localDescription, senderId: localActiveCall.myId, remoteId: localActiveCall.remoteId }
            ));
        }
        else if (message.type === 'onicecandidate') {

            await peer.current.addIceCandidate(message.candidate);
        }

        else if(message.type === 'hangup'){
            endCall();
        }
    }

}

