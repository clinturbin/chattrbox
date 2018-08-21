const WS = require('ws');

let webSocket = new WS.Server({port: 3001});

webSocket.on('connection', sender => {
    console.log("Hey there! Someone connected");
    sender.on('message', message => {
        // Broadcast to everyone else
        webSocket.clients.forEach(client => {
            if (client !== sender && client.readyState === WS.OPEN) {
                client.send(message);
            }
        });
    });
});