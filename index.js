import { onText, clean, print } from './common.js';
import Terminal from './apps/terminal/index.js'
import Login from './apps/login/index.js'
window.appActive = Login
window.userActive = 'root';
print('Conectando a Matrix....');
print('seja bem vindo a Matrix');
window.appActive('init');
onText((message) => {
    const params = message.split(' ');
    if (params[0] === 'exit') {
        clean();
        if ((window.appActive === Terminal) || (window.appActive === Terminal)) {
            window.appActive = Login;
            window.appActive('init');
        } else {
            window.appActive = Terminal;
        }
    } else {
        window.appActive(message)
    }
});