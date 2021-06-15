import {applyMiddleware, createStore} from "redux";
import Reducers from "./src/Reducers";
import ReduxThunk from "redux-thunk";

const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));

export default store;
