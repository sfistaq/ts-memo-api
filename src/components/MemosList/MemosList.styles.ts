import styled from "@mui/styled-engine-sc";
import { MuiTheme } from "../../types/types";
import { TableBody as MuiTableBody } from "@mui/material";

export const TableBody = styled(MuiTableBody)`
  display: flex;
  flex-direction: column;
  min-height: 500px;
  background-color: rgba(245, 245, 245, 0.2);

  ${({ theme }: MuiTheme) => theme.breakpoints.down("xs")} {
    min-height: 450px;
  }
`;
