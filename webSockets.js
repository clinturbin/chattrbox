const WS = require('ws');

let webSocket = new WS.Server({port: 3001});

webSocket.on('connection', sender => {
    console.log("Hey there! Someone connected");
    sender.on('message', message => {
        webSocket.clients.forEach(client => {
            client.send(message);
        });
    });
});

// Alternate way to ask for 

// webSocket.on('connection', sender => {
//     console.log("Hey there! Someone connected");
//     sender.send("What is your username");
//     let username;
//     sender.on('message', message => {
//         if (!username) {
//             username = message;
//             webSocket.clients.forEach(client => {
//                 client.send(message + " has joined!");
//             });
//         } else {
//             webSocket.clients.forEach(client => {
//                 client.send(username + ": " + message);
//             });    
//         }
//     });
// });