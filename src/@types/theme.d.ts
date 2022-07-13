import type { Theme } from "@mui/material";
import { theme } from "../styles";

type CustomTheme = typeof theme;

declare module "@mui/material/styles" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
  interface Palette extends CustomTheme {}
  interface PaletteOptions extends CustomTheme {}
  interface TypeBackground extends CustomTheme {}
  interface TypeText extends CustomTheme {}
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
