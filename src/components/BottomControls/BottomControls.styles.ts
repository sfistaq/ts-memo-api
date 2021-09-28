import styled from "@mui/styled-engine-sc";
import { MuiTheme } from "../../types/types";
import {
  Button as MuiButton,
  ButtonProps,
  TableRow,
  TableCell,
} from "@mui/material";

export const Container = styled(TableRow)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(245, 245, 245, 0.5);
  padding: ${({ theme }: MuiTheme) => theme.spacing(1.2)};

  ${({ theme }: MuiTheme) => theme.breakpoints.down("md")} {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }

  ${({ theme }: MuiTheme) => theme.breakpoints.down("xs")} {
    padding: ${({ theme }: MuiTheme) => theme.spacing(1)};
  }

  @media (max-width: 450px) {
    padding: ${({ theme }: MuiTheme) => theme.spacing(0.4)};
  }
`;

export const Button = styled(MuiButton)<ButtonProps>`
  min-width: 110px;

  ${({ theme }: MuiTheme) => theme.breakpoints.down("md")} {
    min-width: 180px;
  }

  ${({ theme }: MuiTheme) => theme.breakpoints.down("sm")} {
    font-size: 12px;
    min-width: 130px;
  }
`;

export const Wrapper = styled(TableCell)`
  border: none;
`;
