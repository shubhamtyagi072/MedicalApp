import {
  REGISTER_DATA,
  REGISTER_ERROR,
  REGISTER_ISLODING
} from "../Actions/type";

const INTIAL_STATE = {

  success: "",
  error: false,
  isLoading: false
};

export default (state = INTIAL_STATE, action) => {
  const responce = action.payload;
  switch (action.type) {
    case REGISTER_ISLODING:
      return {
        ...state,
        isLoading: true,

      };
    case REGISTER_DATA:
      console.log("response register api", action.data);
      return {
        ...state,
        success: action.data,
        isLoading: false,

      };
    case REGISTER_ERROR:

      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
}
