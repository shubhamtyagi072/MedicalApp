import { combineReducers } from "redux";
import RegisterReducer from "./registerReducer"
import RegisterDocReducer from "./registerDocReducer"
import LoginReducer from "./loginReducer"
import ioReducer from "./ioReducer"

export default combineReducers({
  Register: RegisterReducer,
  RegisterDoc: RegisterDocReducer,
  Login: LoginReducer,
  io: ioReducer,
});
