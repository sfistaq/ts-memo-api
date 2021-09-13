import React, { memo } from "react";

import TablePagination from "@material-ui/core/TablePagination";
import useStyles from "./Pagination.styles";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  itemCounter: number;
}

const Pagination: React.FC<Props> = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  itemCounter,
}) => {
  const classes = useStyles();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TablePagination
      labelRowsPerPage="Memos per page"
      className={classes.pagination}
      rowsPerPageOptions={[5, 10, 20]}
      count={itemCounter}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      SelectProps={{
        inputProps: { "aria-label": "rows per page" },
        native: true,
      }}
    />
  );
};

export default memo(Pagination);
