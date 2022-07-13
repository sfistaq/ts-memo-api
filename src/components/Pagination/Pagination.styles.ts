import styled from "@mui/styled-engine-sc";
import {
  TablePagination as MuiTablePagination,
  TablePaginationProps,
} from "@mui/material";

export const TablePagination = styled(MuiTablePagination)<TablePaginationProps>`
  background: ${({ theme: { palette } }) => palette.background.main};
  display: flex;
  width: 100%;
  justify-content: center;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: ${({ theme: { palette } }) => palette.primary.main};

  & p {
    font-weight: ${({ theme: { typography } }) => typography.fontWeightBold};
  }

  & select {
    font-weight: ${({ theme: { typography } }) => typography.fontWeightBold};
  }

  ${({ theme: { breakpoints } }) => breakpoints.down("xs")} {
    & p {
      font-size: 12px;
      font-weight: ${({ theme: { typography } }) =>
        typography.fontWeightRegular};
    }

    & select {
      font-size: 12px;
      font-weight: ${({ theme: { typography } }) =>
        typography.fontWeightRegular};
    }

    &.MuiTablePagination-selectRoot {
      margin: ${({ theme: { spacing } }) => spacing(0.01)};
    }

    &.MuiTablePagination-actions {
      margin: ${({ theme: { spacing } }) => spacing(0.01)};
    }
  }
`;
