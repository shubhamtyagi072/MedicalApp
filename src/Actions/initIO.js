import IO from "socket.io-client";
import {BASE_URL, IO_INIT} from './type';
import { NavigationActions } from 'react-navigation';

const initIO = (data, navigation) => dispatch => {
    let io = IO((BASE_URL || ''));

    console.log('');
    console.log('INIT SOCKET.IO------------------111111');
    console.log('testing the data in the socket',data)
    console.log('');

    io.on('connect', () => {
        io.join(data.id);
        io.emit('register', data);
        console.warn('IO connected');
        dispatch({type: IO_INIT, socket: io});
    });

    io.on('chat', data => {
        console.warn('');
        console.warn('socket io message', data);
        console.warn('');
    });

    io.on('notification', data => {
        console.log('testing the data in socket>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',data)
        console.warn('');
        console.warn('socket io notification', data);
        navigation.navigate('VideoRequest', { type: `${data.roomID}`, data: data.body })
        console.warn('');
    });
};

export default initIO;
