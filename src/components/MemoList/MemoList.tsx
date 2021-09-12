import React, { useState } from "react";

//TYPES
import { MemosData } from "../../types/types";
import { FilterType } from "../../types/enums";

//REDUX
import { RootStateOrAny, useSelector } from "react-redux";

//MUI
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import useStyles from "./MemoList.styles";

//MUI ICONS
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";
import FindReplaceIcon from "@material-ui/icons/FindReplace";

//COMPONENTS
import SearchBar from "../SearchBar/SearchBar";
import Create from "../Create/Create";
import Head from "../Head/Head";
import MemoItem from "../MemoItem/MemoItem";
import BottomControls from "../BottomControls/BottomControls";
import Pagination from "../Pagination/Pagination";

//UTILS
import { sortArrayOfObj } from "../../utils/sort";
import { filterMemoByStatus } from "../../utils/filter";

const TodosList: React.FC = () => {
  //FITLER BY MEMO TYPE
  const [filterByStatus, setFilterByStatus] = useState<FilterType>(1);

  //SEARCH
  const [searchInput, setSearchInput] = useState<string>("");

  //SORT
  const [sortByProperty, setSortByProperty] =
    useState<keyof MemosData>("due_on");
  const [sortDirection, setSortDirection] = useState<boolean>(false);

  //PAGINATION
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  //CREATE MEMO MODAL OPEN
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const classes = useStyles();

  const loading = useSelector((state: RootStateOrAny) => state.loading);
  const memos = useSelector((state: RootStateOrAny) => state.memos);
  const error = useSelector((state: RootStateOrAny) => state.error);

  // SORTED MEMOS
  const sortedMemo: MemosData[] =
    memos && sortArrayOfObj(memos, sortByProperty, sortDirection);

  // ITEM COUNTER FOR PAGINATION
  const itemCounter: number = filterMemoByStatus(
    sortedMemo,
    filterByStatus,
    searchInput
  ).length;

  const infoMessage = (message: string, icon: JSX.Element) => {
    return (
      <TableRow className={classes.message}>
        <TableCell>
          {icon}
          <Typography>{message}</Typography>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <TableContainer>
        {/* SEARCH BAR */}
        <SearchBar
          setSearchInput={setSearchInput}
          searchInput={searchInput}
          createButtonDisabled={memos.length === 20}
          createModalOpen={createModalOpen}
          setCreateModalOpen={setCreateModalOpen}
        />
        {/* CREATE MODAL */}
        {createModalOpen && (
          <Create open={createModalOpen} setOpen={setCreateModalOpen} />
        )}

        <Table className={classes.table}>
          {/* TABLE HEAD */}
          <Head
            sortByProperty={sortByProperty}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            setSortByProperty={setSortByProperty}
          />

          {/* // MEMO ITEMS */}
          <TableBody className={classes.tableBody}>
            {sortedMemo.length > 0 && itemCounter > 0 && !loading && !error
              ? filterMemoByStatus(sortedMemo, filterByStatus, searchInput) // FILTER BY STATUS
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // PAGINATION
                  .map((item: MemosData, i: number) => (
                    <MemoItem {...item} key={i} />
                  ))
              : loading && !error
              ? //prettier-ignore
                infoMessage("Loading...", <CircularProgress color="secondary" />)
              : sortedMemo.length === 0 && itemCounter === 0 && !error
              ? //prettier-ignore
                infoMessage(`Add memo note by click "Create" button`, <InfoIcon style={{color: 'rgba(0, 0, 0, 0.38)'}}/>)
              : sortedMemo.length > 0 && itemCounter === 0 && !error
              ? //prettier-ignore
                infoMessage("Memo not found...", <FindReplaceIcon style={{color: 'rgba(0, 0, 0, 0.38)'}} />)
              : error
              ? //prettier-ignore
                infoMessage(`Request failed: "${error}"`, <WarningIcon color="secondary" />)
              : null}
          </TableBody>
          {/* BOTTOM CONTROLS */}
          <TableBody>
            <BottomControls
              filterByStatus={filterByStatus}
              setFilterByStatus={setFilterByStatus}
              memos={memos}
            />
          </TableBody>
          {/* PAGNIATION */}
          <TableFooter>
            <TableRow className={classes.pagination}>
              <Pagination
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                itemCounter={itemCounter}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TodosList;
