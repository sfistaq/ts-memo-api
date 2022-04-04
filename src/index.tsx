import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";

const rootEl = document.getElementById("root") as HTMLDivElement;
const root = rootEl && ReactDOM.createRoot(rootEl);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
