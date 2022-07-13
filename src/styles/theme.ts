import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    text: {
      hint: "rgba(0, 0, 0, 0.38)",
    },
    background: {
      main: "rgba(245, 245, 245, 0.5)",
      memo: "rgba(245, 245, 245, 0.8)",
      transparent: "rgba(245, 245, 245, 0.2)",
      dialog: "rgba(0, 0, 0, 0.5)",
    },
  },
}) as any;
