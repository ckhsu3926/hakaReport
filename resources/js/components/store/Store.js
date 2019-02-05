import { createStore,applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { singleReducer } from "../reducer/recordReducers";
import { fetchList } from "../action/record";

export const store = createStore(singleReducer,applyMiddleware(thunkMiddleware));
store.dispatch(fetchList());

window.store = store;