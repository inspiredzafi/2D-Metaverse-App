import broadcast, { addUser, removeUser, informAboutOtherPlayers } from "./broadcast.js";

export default function wsHandler(ws){
    ws.on('connection', (socket) => { 
        console.log('A user has connected.');
        addUser(socket);

        socket.on('message', (rawMsg) => { 
            const message = JSON.parse(rawMsg);

            if(message.type === 'auth'){
                
                socket.player = message.player;
                console.log(message)
                
                informAboutOtherPlayers(socket);
                console.log(socket.player)
                broadcast({...message, type: 'join'}, socket);
            }
            else if(message.type === 'move'){
                if(!socket.player) return socket.send(JSON.stringify({type: 'error', message: 'You need to authenticate first.'}) );

                const {id, x, y} = message;
                socket.player = {...socket.player, x, y};

                broadcast({type: 'move', id, x, y}, socket);
            }

         })

        socket.on('close', () => { 
            console.log('The user Disconnected');
            removeUser(socket);
         })

        socket.on('error', (err) => { 
            console.log(err);
         })
     })
}