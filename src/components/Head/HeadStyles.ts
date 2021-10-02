import styled, { css } from "@mui/styled-engine-sc";
import { MuiTheme } from "../../types/types";
import { TableRow, TableCell } from "@mui/material";

const cssHelper = css`
  font-size: 13px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const HeadWrapper = styled(TableRow)`
  display: flex;
  background-color: ${({ theme }: MuiTheme) => theme.palette.background.main};
  border-bottom: 1px solid black;
`;

export const Status = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: start;
  flex: 0.1;
  border: none;

  &:hover {
    color: ${({ theme }: MuiTheme) => theme.palette.primary.main};
  }

  ${({ theme }: MuiTheme) => theme.breakpoints.down("sm")} {
    ${cssHelper}
  }
`;

export const Title = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.55;
  border: none;

  &:hover {
    color: ${({ theme }: MuiTheme) => theme.palette.primary.main};
  }

  ${({ theme }: MuiTheme) => theme.breakpoints.down("sm")} {
    ${cssHelper}
  }
`;

export const Date = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.35;
  border: none;

  &:hover {
    color: ${({ theme }: MuiTheme) => theme.palette.primary.main};
  }

  @media (max-width: 800px) {
    justify-content: flex-start;
  }

  ${({ theme }: MuiTheme) => theme.breakpoints.down("sm")} {
    ${cssHelper}
  }

  ${({ theme }: MuiTheme) => theme.breakpoints.down("xs")} {
    ${cssHelper};
    margin-right: 15px;
  }
`;
