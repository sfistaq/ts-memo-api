import { combineReducers } from "redux";
import { memoReducer } from "./memoReducer/memoReducer";

const rootReducer = combineReducers({
  memo: memoReducer || (() => null),
});

export default rootReducer;
