//------------- DOM STUFF

const DOM = {
    messages: document.querySelector('.messages'),
    input: document.querySelector('.message-form__input'),
    form: document.querySelector('.message-form'),
};

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

function createUserElement(name) {
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
        el.appendChild(createUserElement(text.name));
        el.appendChild(document.createTextNode(text.message));
    }
    el.className = 'message';
    return el;
}

export function print(message) {
    const el = DOM.messages;
    const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
    el.appendChild(createMessageElement(message));
    if (wasTop) {
        el.scrollTop = el.scrollHeight - el.clientHeight;
    }
}


export function input(message) {
    print({
        name: window.userActive,
        message
    })
}

export function onText(callback) {
    DOM.input.addEventListener('keyup', e => {
        var key = e.which || e.keyCode;
        if (key == 13) {
            const value = DOM.input.value;
            DOM.input.value = '';
            callback(value);
        }
    });
}

export function clean() {
    DOM.messages.innerHTML = "";
} 