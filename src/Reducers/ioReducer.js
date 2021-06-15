import {
    IO_INIT, IO_LOGOUT,
} from "../Actions/type";

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case IO_INIT:
            return action.socket;
        case IO_LOGOUT:
            return null;
        default:
            return state;
    }
}
