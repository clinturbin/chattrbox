const WS = require('ws');

let webSocket = new WS.Server({port: 3001});

webSocket.on('connection', ws => {
    console.log("Hey there! Someone connected");
    ws.on('message', message => {
        // Broadcast to everyone else
        webSocket.clients.forEach(client => {
            if (client !== ws && client.readyState === WS.OPEN) {
                client.send(message);
            }
        });
    });
});