
const connectedPlayers = [];

export function addUser(user){
    connectedPlayers.push(user);
}

export function removeUser(user){
    connectedPlayers.splice(connectedPlayers.indexOf(user), 1);
}

export function informAboutOtherPlayers(socket){
    // if(connectedPlayers.length <= 2) return;        // 2 because right now, the app is running in strict mode, so har cheeze do baar hoti hy, to socket object bhi 2 bar bna, and 2 bar server pay push hua and is bug nay mera 1hour kha lia. This fuckup should be documented.

    connectedPlayers.forEach((cPlayer) => { 
 
        if(socket !== cPlayer)
            socket.send(JSON.stringify({type: 'join', player: cPlayer.player}));        // cPlayer.player contains the playerId, name, x, y, color;
     })
}

export function sendToUser(message){
    const user = connectedPlayers.find((cPlayer) => { return message.remoteId === cPlayer.player.id })

    user.send(JSON.stringify(message));
}

export default function broadcast(message, socket){

    connectedPlayers.forEach((player) => { 
        if(player !== socket){
            player.send(JSON.stringify(message));
        }
     })
}