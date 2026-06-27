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

export function useWebRTC({ localVRef, remoteVRef, activeCall, setActiveCall }) {

    const peer = useRef(new RTCPeerConnection());
    const { wsRef, addListener, removeListener } = useContext(SocketContext);


    useEffect(() => {
        ; (async function () {
            addListener(handleMessage);

            console.log('activeCall', activeCall);

            peer.current.onicecandidate = function (e) {
                if (e.candidate !== null) {
                    wsRef.current.send(JSON.stringify({ type: 'onicecandidate', candidate: e.candidate, receiverId: activeCall.remoteId }))
                }
            }


            peer.current.ontrack = function (e) {
                remoteVideo.srcObject = e.streams[0];
            }

            if (!activeCall) return;

            const localVideo = localVRef.current;
            const remoteVideo = remoteVRef.current;

            const stream = await startCamera();

            localVideo.srcObject = stream;


            stream.getTracks().forEach((track) => {
                peer.current.addTrack(track, stream);
            })


            if (activeCall.myId > activeCall.remoteId) {
                const offer = await peer.current.createOffer();
                await peer.current.setLocalDescription(offer);

                wsRef.current.send(JSON.stringify({ type: 'offer', sdp: peer.current.localDescription, senderId: activeCall.myId, receiverId: activeCall.remoteId }))
            }


        })();

        return () => {
            removeListener(handleMessage);
        }


    }, [activeCall]);

    async function handleMessage(message) {
        if (message.type === 'answer') {
            await peer.current.setRemoteDescription(message.sdp);

        }
        else if (message.type === 'offer') {
            if (!activeCall) {
                setActiveCall({ myId: message.receiverId, remoteId: message.senderId });

            }

            await peer.current.setRemoteDescription(message.sdp);

            const answer = await peer.current.createAnswer();
            await peer.current.setLocalDescription(answer);

            const message = { type: 'answer', sdp: peer.current.localDescription, senderId: activeCall.myId, receiverId: activeCall.remoteId };
            ws.current.send(JSON.stringify(message));
        }
        else if (message.type === 'onicecandidate') {
            await peer.current.addIceCandidate(message.candidate);
        }
    }

}

