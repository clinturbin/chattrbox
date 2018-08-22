console.log("Make me do things!");

let socket = new WebSocket('ws://localhost:3001');
let $messageContainer = $('.chat-message-list');
let messageInput = document.querySelector("input[data-chat='message-input']");
let sendButton = document.querySelector(".btn-default");
let userList = document.querySelector('.user-list');

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

let askForUserName = () => {
  let $messageRow = $('<li>');
  let $message = $('<p>');
  $message.append($('<span>', {
    'class': 'message-message',
    text: 'What is your user name?'
  }));
  $messageRow.append($message);
  $messageContainer.append($messageRow);
}

let addUserToParticipants = (message) => {
  let userRow = document.createElement("li");
  userRow.setAttribute('data-user', message.user);
  userRow.textContent = message.user;
  userList.appendChild(userRow);
};

let join = (message) => {
  addUserToParticipants(message);
};

let leave = (message) => {
  let userRow = document.querySelector(`[data-user="${message.user}`);
  userList.removeChild(userRow);
};

let message = (message) => {
  let messageObject = {
    user: message.user,
    message: message.body,
    timestamp: new Date()
  };
  $messageContainer.append(drawMessage(messageObject));
};

let routes = {join, leave, message};

// Connection Opened
socket.addEventListener('open', (event) => {
  askForUserName();
  sendButton.addEventListener("click", () => {
    socket.send(messageInput.value);
  });
});

// Listen for messages
socket.addEventListener('message', (event) => {
  let message = JSON.parse(event.data);
  console.log(message);
  routes[message.type](message);
});