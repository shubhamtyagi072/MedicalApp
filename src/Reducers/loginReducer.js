import {
    LOGIN_DATA,
    LOGIN_ERROR,
    LOGIN_ISLODING
} from "../Actions/type";

const INTIAL_STATE = {

    success: "",
    error: false,
    isLoading: false
};

export default (state = INTIAL_STATE, action) => {
    const responce = action.payload;
    switch (action.type) {
        case LOGIN_ISLODING:
            console.log("call", action)
            return {
                ...state,
                isLoading: true,

            };
        case LOGIN_DATA:
            console.log("response register api", action.data);
            return {
                ...state,
                success: action.data,
                isLoading: false,

            };
        case LOGIN_ERROR:

            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        default:
            return state;
    }
}
