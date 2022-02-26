import styled from "@mui/styled-engine-sc";
import { MuiTheme } from "./types";
import {
  Container,
  ContainerProps,
  Table as MuiTable,
  TableRow as MuiTableRow,
} from "@mui/material";
import background from "./assets/images/background.jpg";

export const AppWrapper = styled(Container)`
  display: flex;
  align-items: center;
  background-image: url(${background});
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;

  @media (max-width: 499px) {
    padding-top: ${({ theme }: MuiTheme) => theme.spacing(1)};
    align-items: flex-start;
  }
`;

export const TableWrapper = styled(Container)<ContainerProps>`
  border-radius: 15px;
  padding-top: ${({ theme }: MuiTheme) => theme.spacing(2)};
  padding-bottom: ${({ theme }: MuiTheme) => theme.spacing(2)};
  background: ${({ theme }: MuiTheme) => theme.palette.background.transparent};
  @media (max-width: 499px) {
    padding-top: ${({ theme }: MuiTheme) => theme.spacing(1)};
    padding-bottom: ${({ theme }: MuiTheme) => theme.spacing(1)};
  }
`;
export const Table = styled(MuiTable)`
  display: flex;
  flex-direction: column;
`;

export const TableRow = styled(MuiTableRow)`
  display: flex;
  width: 100%;
`;
