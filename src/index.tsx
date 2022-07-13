import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./styles";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

const rootEl = document.getElementById("root") as HTMLDivElement;
const root = rootEl && ReactDOM.createRoot(rootEl);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer role="alert" newestOnTop />
    </ThemeProvider>
  </React.StrictMode>
);
