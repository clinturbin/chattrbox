console.log("Make me do things!");

// Create Web Socket Connection
let socket = new WebSocket('ws://localhost:3001');
let $messageContainer = $('.chat-message-list');
let messageInput = document.querySelector("input[data-chat='message-input']");
let sendButton = document.querySelector(".btn-default");
let userName = prompt("What is your username?");

let drawMessage = ({
    user: u,
    timestamp: t,
    message: m
  }) => {
    let $messageRow = $('<li>', {
      'class': 'message-row'
    });
    // if (this is me?) {
    //   $messageRow.addClass('me');
    // }
    let $message = $('<p>');
    $message.append($('<span>', {
      'class': 'message-username',
      text: u
    }));
    $message.append($('<span>', {
      'class': 'timestamp',
      'data-time': t,
      text: t.toString()
    }));
    $message.append($('<span>', {
      'class': 'message-message',
      text: m
    }));
    let $img = $('<img>', {
      src: 'https://avatars3.githubusercontent.com/u/794113?s=64&v=4',
      title: u
    });
    $messageRow.append($img);
    $messageRow.append($message);
    return $messageRow;
  };

let $messageRow = drawMessage({
    user: 'nybblr',
    message: 'Hey there!',
    timestamp: new Date()
});

$messageRow.get(0).scrollIntoView();

// Connection Opened
socket.addEventListener('open', (event) => {
  sendButton.addEventListener("click", () => {
    let message = {
      user: userName,
      message: messageInput.value,
      timestamp: new Date()
    };
    socket.send(JSON.stringify(message));
  });
});

// Listen for messages
socket.addEventListener('message', (event) => {
  $messageContainer.append(drawMessage(JSON.parse(event.data)));
});