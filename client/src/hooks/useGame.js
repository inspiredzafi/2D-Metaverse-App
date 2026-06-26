import { useEffect, useReducer, useRef} from "react";


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

    ctx.fillText(player.name, player.x + avatarR + 5, player.y -5 -  avatarR);

    ctx.closePath();
}   



export function useGame(canvasRef) {

    const myPlayer = { id: crypto.randomUUID(), name: localStorage.getItem('name'), x: 30, y: 30, color: '#87CEEB' };
    const moveStep = 3;
    const avatarR = 25;
    const boundary = 100;
    const keys = {};
    const playersInSpace = useRef({});

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        function handleKeyDown(e) {
            keys[e.key] = true;
        }

        function handleKeyUp(e) {
            keys[e.key] = false;
        }

        // function movePlayer(e) {
        //     switch (e.key) {
        //         case 'ArrowUp':
        //         case 'w':
        //         case 'W':
        //             if(myPlayer.y - moveStep < avatarR + 5) return ;
        //             myPlayer.y -= moveStep;
        //             break;

        //         case 'ArrowDown':
        //         case 's':
        //         case 'S':
        //             if(myPlayer.y + moveStep < canvas.height - avatarR )
        //             myPlayer.y += moveStep;
        //             break;

        //         case 'ArrowRight':
        //         case 'd':
        //         case 'D':
        //             if(myPlayer.x + moveStep < canvas.width - avatarR )
        //             myPlayer.x += moveStep;
        //             break;

        //         case 'ArrowLeft':
        //         case 'a':
        //         case 'A':
        //             if(myPlayer.x - moveStep < avatarR + 5) return ;
        //             myPlayer.x -= moveStep;
        //             break;
        //     }
        // }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp)

        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            (() => {

                if (keys['ArrowUp'] || keys['w']) {
                    if(myPlayer.y - moveStep < avatarR) return;
                    myPlayer.y -= moveStep;
                }
                else if (keys['ArrowDown'] || keys['s']) {
                    if(myPlayer.y + moveStep > canvas.height - avatarR) return;
                    myPlayer.y += moveStep;
                }
                else if (keys['ArrowRight'] || keys['d']) {
                    if(myPlayer.x + moveStep > canvas.width - avatarR) return ;
                    myPlayer.x += moveStep;
                }
                else if (keys['ArrowLeft'] || keys['a']) {
                    if (myPlayer.x - moveStep < avatarR) return;
                        myPlayer.x -= moveStep;
                }

            })();

            renderPlayer(myPlayer, ctx, avatarR);

                Object.values(playersInSpace.current).forEach((player) => {
                    // 
                    renderPlayer(player, ctx, avatarR);
                    
                });
            

            requestAnimationFrame(gameLoop);
        }

        requestAnimationFrame(gameLoop);
    }, []);


}