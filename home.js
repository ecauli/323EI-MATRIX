const DOM = {
    membersCount: document.querySelector('.members-count'),
    membersList: document.querySelector('.members-list'),
    messages: document.querySelector('.messages'),
    input: document.querySelector('.message-form__input'),
    form: document.querySelector('.message-form'),
};
DOM.input.addEventListener('keyup', function (e) {
    var key = e.which || e.keyCode;
    if (key == 13) {
        const value = DOM.input.value;
        DOM.input.value = '';
        params = value.split(' ');
        switch (params[0]) {
            case 'matrix_im':
                if (params[1] !== 'SW1vcnRhaXM') {
                    addLog('Nenhuma sala ativa com esse codigo');
                } else {
                    window.open("im.html?channel=" + params[1]);
                }
                break;
            case 'help':
                addLog('************');
                addLog('***HELP*****');
                addLog('************');
                addLog('Instante Messenger: matrix_im [channel_code]');
                break;
            default:
                addLog('Instabilidade na Matrix não consigo resolver o seu comando');
        }
    }
});

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