import {
    REGISTERDOC_DATA,
    REGISTERDOC_ERROR,
    REGISTERDOC_ISLODING
} from "../Actions/type";

const INTIAL_STATE = {

    success: "",
    error: false,
    isLoading: false
};

export default (state = INTIAL_STATE, action) => {
    const responce = action.payload;
    switch (action.type) {
        case REGISTERDOC_ISLODING:
            return {
                ...state,
                isLoading: true,

            };
        case REGISTERDOC_DATA:
            console.log("response register api", action.data);
            return {
                ...state,
                success: action.data,
                isLoading: false,

            };
        case REGISTERDOC_ERROR:

            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        default:
            return state;
    }
}
