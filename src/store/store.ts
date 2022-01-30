import {
  AnyAction,
  applyMiddleware,
  compose,
  createStore,
  Dispatch,
  Middleware,
} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middleware: Middleware<{}, any, Dispatch<AnyAction>>[] = [thunk];

let composeEnhancers = compose;

if (process.env.NODE_ENV === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;
}
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
