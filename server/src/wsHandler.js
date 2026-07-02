import broadcast, { addUser, removeUser, informAboutOtherPlayers, sendToUser } from "./broadcast.js";

export default function wsHandler(ws){
    ws.on('connection', (socket) => { 
        console.log('A user has connected.');
        addUser(socket);

        socket.on('message', (rawMsg) => { 
            const message = JSON.parse(rawMsg);

            if(message.type === 'auth'){
                
                socket.player = message.player;
                
                informAboutOtherPlayers(socket);

                broadcast({...message, type: 'join'}, socket);
            }

            else if(message.type === 'move'){
                if(!socket.player) return socket.send(JSON.stringify({type: 'error', message: 'You need to authenticate first.'}) );

                const {id, x, y} = message;
                socket.player = {...socket.player, x, y};

                broadcast({type: 'move', id, x, y}, socket);
            }
            else if(message.type === 'hangup'){
                sendToUser(message)
            }

            else if(message.type === 'offer'){
                sendToUser(message);
            }

            else if(message.type === 'answer'){
                sendToUser(message);
            }

            else if(message.type === 'onicecandidate'){
                sendToUser(message);
            }

         })

        socket.on('close', () => { 
            console.log('The user Disconnected');
            if(socket.player){

                broadcast({type: 'leave', id: socket.player.id}, socket);
            }
            removeUser(socket);
         })

        socket.on('error', (err) => { 
            console.log(err);
         })
     })
}