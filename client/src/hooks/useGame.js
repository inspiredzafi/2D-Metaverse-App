import { useContext, useEffect, useReducer, useRef } from "react";
import SocketContext from "../context/SocketContext.jsx";


function renderPlayer(player, ctx, avatarR) {

    ctx.beginPath();
    ctx.arc(player.x, player.y, avatarR, 0, Math.PI * 2);

    ctx.fillStyle = player.color;
    ctx.strokeStyle = 'tranparent';


    ctx.fill();

    ctx.font = `${avatarR}px Arial`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";


    ctx.fillText(player.name[0], player.x, player.y);

    ctx.closePath();

    ctx.beginPath();

    ctx.setLineDash([10, 2])

    ctx.fillStyle = 'transparent';
    ctx.strokeStyle = player.color;

    ctx.arc(player.x, player.y, 100, 0, Math.PI * 2)
    ctx.stroke();

    ctx.closePath();

    ctx.beginPath();
    ctx.font = `${13}px Sans-serif`;
    ctx.fillStyle = player.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(player.name, player.x + avatarR + 5, player.y - 5 - avatarR);

    ctx.closePath();
}



export function useGame(canvasRef, setActiveCall) {

    const myPlayer = useRef({ id: crypto.randomUUID(), name: localStorage.getItem('name'), x: 30, y: 30, color: '#87CEEB' });
    const moveStep = 3;
    const avatarR = 25;
    const boundary = 100;
    const keys = {};
    const playersInSpace = useRef({});
    const { wsRef, addListener, removeListener } = useContext(SocketContext);
    let testBool = true;
    // const ws = new WebSocket('ws://localhost:3000');



    useEffect(() => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        addListener(handleMessage);


        wsRef.current.onopen = function () {
            let name = localStorage.getItem('name');

            if (!name) {
                name = prompt('What should we call you?');
            }

            localStorage.setItem('name', name);

            const x = Math.floor(Math.random() * (canvas.width - avatarR + 1) + avatarR);
            const y = Math.floor(Math.random() * (canvas.height - avatarR + 1) + avatarR);

            myPlayer.current.x = x; myPlayer.current.y = y;
            myPlayer.current.color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');

            wsRef.current.send(JSON.stringify({ type: 'auth', player: myPlayer.current }));

        }


        function handleKeyDown(e) {
            keys[e.key] = true;
        }

        function handleKeyUp(e) {
            keys[e.key] = false;
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        function handleMessage(message) {
            if (message.type === 'join') {
                const newPlayer = message.player;
                console.log(message);
                playersInSpace.current = { ...playersInSpace.current, [newPlayer.id]: newPlayer }
            }

            else if (message.type === 'move') {
                const { id, x, y } = message;
                playersInSpace.current = {
                    ...playersInSpace.current,
                    [id]: {
                        ...playersInSpace.current[id],
                        x: x,
                        y: y
                    }
                }
            }

            else if (message.type === 'leave') {
                const { id } = message;
                delete playersInSpace.current[id];
            }
        }

        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            (() => {

                if (keys['ArrowUp'] || keys['w']) {
                    if (myPlayer.current.y - moveStep < avatarR) return;
                    myPlayer.current.y -= moveStep;
                    wsRef.current.send(JSON.stringify({ type: 'move', id: myPlayer.current.id, x: myPlayer.current.x, y: myPlayer.current.y }));
                }
                else if (keys['ArrowDown'] || keys['s']) {
                    if (myPlayer.current.y + moveStep > canvas.height - avatarR) return;
                    myPlayer.current.y += moveStep;
                    wsRef.current.send(JSON.stringify({ type: 'move', id: myPlayer.current.id, x: myPlayer.current.x, y: myPlayer.current.y }));

                }
                else if (keys['ArrowRight'] || keys['d']) {
                    if (myPlayer.current.x + moveStep > canvas.width - avatarR) return;
                    myPlayer.current.x += moveStep;
                    wsRef.current.send(JSON.stringify({ type: 'move', id: myPlayer.current.id, x: myPlayer.current.x, y: myPlayer.current.y }));

                }
                else if (keys['ArrowLeft'] || keys['a']) {
                    if (myPlayer.current.x - moveStep < avatarR) return;
                    myPlayer.current.x -= moveStep;
                    wsRef.current.send(JSON.stringify({ type: 'move', id: myPlayer.current.id, x: myPlayer.current.x, y: myPlayer.current.y }));

                }

            })();

            renderPlayer(myPlayer.current, ctx, avatarR);

            Object.values(playersInSpace.current).forEach((player) => {
                // 
                renderPlayer(player, ctx, avatarR);

            });


            requestAnimationFrame(gameLoop);
        }

        requestAnimationFrame(gameLoop);

        return () =>{
            removeListener(handleMessage);
        }
    }, []);


}