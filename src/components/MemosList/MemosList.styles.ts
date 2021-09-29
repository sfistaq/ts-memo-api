import styled from "@mui/styled-engine-sc";
import { MuiTheme } from "../../types/types";
import { TableBody as MuiTableBody } from "@mui/material";

export const TableBody = styled(MuiTableBody)`
  display: flex;
  flex-direction: column;
  min-height: 500px;
  background: ${({ theme }: MuiTheme) => theme.palette.background.transparent};

  ${({ theme }: MuiTheme) => theme.breakpoints.down("sm")} {
    min-height: 450px;
  }
`;
