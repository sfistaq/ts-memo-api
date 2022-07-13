import styled from "@mui/styled-engine-sc";
import { TableBody as MuiTableBody } from "@mui/material";

export const TableBody = styled(MuiTableBody)`
  display: flex;
  flex-direction: column;
  min-height: 500px;
  background: ${({ theme: { palette } }) => palette.background.transparent};

  ${({ theme: { breakpoints } }) => breakpoints.down("sm")} {
    min-height: 450px;
  }
`;
