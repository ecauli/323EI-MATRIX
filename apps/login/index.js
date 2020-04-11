import { print, clean } from '../../common.js'
import Terminal from '../terminal/index.js'
export default (message) => {
    if (message === 'init') {
        print('************');
        print('*** LOGIN*****');
        print('************');
        print('para login insira seu usuario e senha na mesma linha');
    } else {
        let user, password;
        [user, password] = message.split(' ');
        if (window.btoa(user) === password) {
            window.userActive = user;
            clean();
            window.appActive = Terminal;
        } else {
            print('Usuário e/ou senha inválido');
        }
    }
};