import { combineReducers } from "redux";
import memoReducer from "./memoReducer/memoReducer";

const rootReducer = combineReducers({
  memo: memoReducer,
});

export default rootReducer;
