import {IO_LOGOUT} from './type';
import store from '../../store';

const ioDisconnect = () => dispatch => {
    console.warn("IO disconnected");
    store.getState().io && store.getState().io.disconnect();
    dispatch({type: IO_LOGOUT});
};

export default ioDisconnect;
