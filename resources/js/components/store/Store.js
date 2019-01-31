import { createStore } from "redux";
import { singleReducer } from "../reducer/recordReducers";

export const store = createStore(singleReducer);
window.store=store;