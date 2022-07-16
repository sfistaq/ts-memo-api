import { ReactNode } from "react";
import { Provider } from "react-redux";
import { render, RenderResult } from "@testing-library/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { store } from "../store";
import { theme } from "../styles";
import { ToastContainer } from "react-toastify";

export const renderWithAllProviders = (children: ReactNode) =>
  render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>{children}</Provider>
      <ToastContainer role="alert" newestOnTop />
    </ThemeProvider>
  ) as RenderResult;
