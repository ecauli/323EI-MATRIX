import Im from '../im/index.js';
import Help from '../help/index.js';
import { print, input } from '../../common.js';
const apps = {
    'matrix_im': Im,
    'help': Help,
    'ajuda': Help
}

export default function Terminal(message) {
    const params = message.split(' ');
    if (apps[params[0]]) {
        apps[params[0]](message);
    } else {
        input(message);
        print("'" + params[0] + "' não parece ser um comando valido da Matrix");
    }
    return true;
}

