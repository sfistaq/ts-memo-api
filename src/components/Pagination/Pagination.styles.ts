import styled from "@mui/styled-engine-sc";
import { MuiTheme } from "../../types/types";
import {
  TablePagination as MuiTablePagination,
  TablePaginationProps,
} from "@mui/material";

export const TablePagination = styled(MuiTablePagination)<TablePaginationProps>`
  background: ${({ theme }: MuiTheme) => theme.palette.background.main};
  display: flex;
  width: 100%;
  justify-content: center;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: ${({ theme }: MuiTheme) => theme.palette.primary.main};

  & p {
    font-weight: ${({ theme }: MuiTheme) => theme.typography.fontWeightBold};
  }

  & select {
    font-weight: ${({ theme }: MuiTheme) => theme.typography.fontWeightBold};
  }

  ${({ theme }: MuiTheme) => theme.breakpoints.down("xs")} {
    & p {
      font-size: 12px;
      font-weight: ${({ theme }: MuiTheme) =>
        theme.typography.fontWeightRegular};
    }

    & select {
      font-size: 12px;
      font-weight: ${({ theme }: MuiTheme) =>
        theme.typography.fontWeightRegular};
    }

    &.MuiTablePagination-selectRoot {
      margin: ${({ theme }: MuiTheme) => theme.spacing(0.01)};
    }

    &.MuiTablePagination-actions {
      margin: ${({ theme }: MuiTheme) => theme.spacing(0.01)};
    }
  }
`;
