// PS! Replace this with your own channel ID
// If you use this channel ID your app will stop working in the future
const CLIENT_ID = 'wy2gdodHybkBRw78';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomID = window.atob(urlParams.get('channel'));
const drone = new ScaleDrone(CLIENT_ID);

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  addLog('Conectado com sucesso a Matrix Network');

  const room = drone.subscribe(roomID, {
    historyCount: 100 // ask for the 5 most recent messages from the room's history
  });
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    addLog("Conectado a sala " + roomID);
    if (roomID === 'Imortais') immortal();
  });
  room.on('history_message', (message) => {
    addLog(message.data);
  });
  room.on('members', m => {
    members = m;
  });

  room.on('member_join', member => {
    members.push(member);
  });

  room.on('member_leave', ({ id }) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
  });

  room.on('data', (text, member) => {
    if (member) {
      addLog(text);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getName() {
  return document.querySelector('.message-form__name').value;
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';
  drone.publish({
    room: roomID,
    message: {
      name: getName(),
      message: value
    },
  });
}

function createMemberElement(name) {
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  return el;
}

function createMessageElement(text) {
  const el = document.createElement('div');
  if (typeof text === 'string') {
    el.appendChild(document.createTextNode(text));
  } else {
    el.appendChild(createMemberElement(text.name));
    el.appendChild(document.createTextNode(text.message));
  }
  el.className = 'message';
  return el;
}

function addLog(text) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}

function sortyBy(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers, 
     * and you may want to customize it to your needs
     */
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

function immortal() {
  addLog('┏━━━┓━━━━━━━━━━━━━━━━━━━━━━┏┓━━━━━━━━━━━━━━━┏━━┓┏━┓┏━┓┏━━━┓┏━━━┓┏━━━━┓┏━━━┓┏┓━━━');
  addLog('┃┏━┓┃━━━━━━━━━━━━━━━━━━━━━━┃┃━━━━━━━━━━━━━━━┗┫┣┛┃┃┗┛┃┃┃┏━┓┃┃┏━┓┃┃┏┓┏┓┃┃┏━┓┃┃┃━━━');
  addLog('┃┃━┃┃━━━━┏━━┓┏┓┏┓┏━━┓━┏━┓┏━┛┃┏┓┏━━┓━┏━━┓━━━━━┃┃━┃┏┓┏┓┃┃┃━┃┃┃┗━┛┃┗┛┃┃┗┛┃┃━┃┃┃┃━━━');
  addLog('┃┗━┛┃━━━━┃┗┛┃┃┗┛┃┃┗┛┗┓┃┃━┃┗┛┃┃┃┃┗┛┗┓┃┗┛┃━━━━┏┫┣┓┃┃┃┃┃┃┃┗━┛┃┃┃┃┗┓━┏┛┗┓━┃┏━┓┃┃┗━┛┃');
  addLog('┗━━━┛━━━━┗━┓┃┗━━┛┗━━━┛┗┛━┗━━┛┗┛┗━━━┛┗━━┛━━━━┗━━┛┗┛┗┛┗┛┗━━━┛┗┛┗━┛━┗━━┛━┗┛━┗┛┗━━━┛');
  addLog('━━━━━━━━━┏━┛┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  addLog('━━━━━━━━━┗━━┛━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}