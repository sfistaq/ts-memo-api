import styled from "@mui/styled-engine-sc";
import TableRow from "@mui/material/TableRow";

export const Message = styled(TableRow)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  border-bottom: 1px solid black;
  background: ${({ theme: { palette } }) => palette.background.transparent};

  & td {
    border: none;
    text-align: center;
  }

  & p {
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme: { palette } }) => palette.grey[600]};
  }

  ${({ theme: { breakpoints } }) => breakpoints.down("sm")} {
    min-height: 450px;
  }
`;
