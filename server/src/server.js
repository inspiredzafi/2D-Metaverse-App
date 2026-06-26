import http from 'http';
import {WebSocketServer} from 'ws';
import wsHandler from './wsHandler.js';

const PORT = 3000;

const server = http.createServer((req, res) => { 
    
    console.log(req.url);

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end('Hello, World');
 })

const ws = new WebSocketServer({server});
wsHandler(ws);

server.listen(PORT, () => { 
    console.log(`Server is listening on http://localhost:${PORT}`) 

})