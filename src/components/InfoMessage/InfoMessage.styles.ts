import styled from "@mui/styled-engine-sc";
import { MuiTheme } from "../../types/types";
import TableRow from "@mui/material/TableRow";

export const Message = styled(TableRow)<MuiTheme>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  border-bottom: 1px solid black;
  background-color: rgba(245, 245, 245, 0.2);

  & td {
    border: none;
    text-align: center;
  }

  & p {
    font-size: 24px;
    font-weight: 500;
    color: ${(props: MuiTheme) => props.theme.palette.grey[600]};
  }

  ${(props: MuiTheme) => props.theme.breakpoints.down("sm")} {
    min-height: 450px;
  }
`;
