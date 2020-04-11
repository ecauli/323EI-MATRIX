import { print, input } from '../../common.js'
export default (message) => {
    input(message);
    print('************');
    print('***HELP*****');
    print('************');
    print('Ajuda: help or ajuda');
    print('Instante Messenger: matrix_im [channel_code]');
};