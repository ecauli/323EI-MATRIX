
import { print, clean, input } from '../../common.js'
let channel = '';

const CLIENT_ID = 'wy2gdodHybkBRw78';

let drone;
let roomID;
let room;
const setupChannel = channel => {
    roomID = window.atob(channel);
    drone = new ScaleDrone(CLIENT_ID);
    drone.on('open', error => {
        if (error) {
            return console.error(error);
        }
        clean();
        print("Conectado a sala " + roomID);
        if (roomID === 'Imortais') immortal();

        room = drone.subscribe(roomID, {
            historyCount: 100
        });
        room.on('open', error => {
            if (error) {
                return console.error(error);
            }
        });

        room.on('history_message', (message) => {
            print(message.data);
        });

        room.on('data', (text, member) => {
            if (text.name) {
                print(text);
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
}

const Im = message => {
    if (message === '') {
        return;
    }
    drone.publish({
        room: roomID,
        message: {
            name: window.userActive,
            message: message
        },
    });
}

const validChannels = [
    'UmF0b3MgZGUgY2lyY3VpdG8=',
    'SW1vcnRhaXM',
    'YWRtaW4='
]

const firewall = {
    'UmF0b3MgZGUgY2lyY3VpdG8=': ['Vadash']
}

export default message => {
    const params = message.split(' ');
    input(message);
    if (validChannels.includes(params[1])) {
        channel = params[1];
        print('Ativando comunicador');
        if (firewall[channel] && firewall[channel].includes(window.userActive)) {
            print('Você foi banido desse canal');
        } else {
            window.appActive = Im;
            setupChannel(channel);
        }
    } else {
        print('Nenhuma sala ativa com esse codigo')
    }
    return true;
};

function immortal() {
    print('┏━━━┓━━━━━━━━━━━━━━━━━━━━━━┏┓━━━━━━━━━━━━━━━┏━━┓┏━┓┏━┓┏━━━┓┏━━━┓┏━━━━┓┏━━━┓┏┓━━━');
    print('┃┏━┓┃━━━━━━━━━━━━━━━━━━━━━━┃┃━━━━━━━━━━━━━━━┗┫┣┛┃┃┗┛┃┃┃┏━┓┃┃┏━┓┃┃┏┓┏┓┃┃┏━┓┃┃┃━━━');
    print('┃┃━┃┃━━━━┏━━┓┏┓┏┓┏━━┓━┏━┓┏━┛┃┏┓┏━━┓━┏━━┓━━━━━┃┃━┃┏┓┏┓┃┃┃━┃┃┃┗━┛┃┗┛┃┃┗┛┃┃━┃┃┃┃━━━');
    print('┃┗━┛┃━━━━┃┗┛┃┃┗┛┃┃┗┛┗┓┃┃━┃┗┛┃┃┃┃┗┛┗┓┃┗┛┃━━━━┏┫┣┓┃┃┃┃┃┃┃┗━┛┃┃┃┃┗┓━┏┛┗┓━┃┏━┓┃┃┗━┛┃');
    print('┗━━━┛━━━━┗━┓┃┗━━┛┗━━━┛┗┛━┗━━┛┗┛┗━━━┛┗━━┛━━━━┗━━┛┗┛┗┛┗┛┗━━━┛┗┛┗━┛━┗━━┛━┗┛━┗┛┗━━━┛');
    print('━━━━━━━━━┏━┛┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    print('━━━━━━━━━┗━━┛━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}