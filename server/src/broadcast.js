
const connectedPlayers = [];

export function addUser(user){
    connectedPlayers.push(user);
}

export function removeUser(user){
    connectedPlayers.splice(connectedPlayers.indexOf(user), 1);
}

export function informAboutOtherPlayers(socket){
    connectedPlayers.forEach((cPlayer) => { 
        if(socket !== cPlayer)
            socket.send(JSON.stringify({type: 'join', player: cPlayer.player}));        // cPlayer.player contains the playerId, name, x, y, color;
     })
}

export default function broadcast(message, socket){

    connectedPlayers.forEach((player) => { 
        if(player !== socket){
            player.send(JSON.stringify(message));
        }
     })
}