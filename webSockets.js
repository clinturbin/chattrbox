const WS = require('ws');

let webSocket = new WS.Server({port: 3001});


let sendAll = (message) => {
    webSocket.clients.forEach(client => {
        client.send(message);
    });
};

let joinNotification = (user) => ({type: 'join', user});
let leaveNotification = (user) => ({type: 'leave', user});
let messageNotification = (user, body) => ({type: 'message', user, body});

let activeUsers = new Set();

webSocket.on('connection', client => {
    console.log("Hey there! Someone connected");
    activeUsers.forEach(user => {
        client.send(JSON.stringify(joinNotification(user)));
    });
    let userName;
    client.on('close', () => {
        sendAll(JSON.stringify(leaveNotification(userName)));
        activeUsers.delete(userName);
    });
    client.on('message', message => {
        if (!userName) {
            userName = message;
            sendAll(JSON.stringify(joinNotification(userName)));
            activeUsers.add(userName);
        } else {
            sendAll(JSON.stringify(messageNotification(userName, message)));
        }
    });
});