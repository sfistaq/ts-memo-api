import styled from "@mui/styled-engine-sc";
import { MuiTheme } from "../../types/types";
import {
  TablePagination as MuiTablePagination,
  TablePaginationProps,
} from "@mui/material";

export const TablePagination = styled(MuiTablePagination)<TablePaginationProps>`
  background-color: rgba(245, 245, 245, 0.5);
  display: flex;
  width: 100%;
  justify-content: center;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: ${(props: MuiTheme) => props.theme.palette.primary.main};

  & p {
    font-weight: ${(props: MuiTheme) => props.theme.typography.fontWeightBold};
  }

  & select {
    font-weight: ${(props: MuiTheme) => props.theme.typography.fontWeightBold};
  }

  ${(props: MuiTheme) => props.theme.breakpoints.down("xs")} {
    & p {
      font-size: 12px;
      font-weight: ${(props: MuiTheme) =>
        props.theme.typography.fontWeightRegular};
    }

    & select {
      font-size: 12px;
      font-weight: ${(props: MuiTheme) =>
        props.theme.typography.fontWeightRegular};
    }

    &.MuiTablePagination-selectRoot {
      margin: ${(props: MuiTheme) => props.theme.spacing(0.01)};
    }

    &.MuiTablePagination-actions {
      margin: ${(props: MuiTheme) => props.theme.spacing(0.01)};
    }
  }
`;
