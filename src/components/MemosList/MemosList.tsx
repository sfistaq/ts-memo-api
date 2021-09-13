import React, { useState } from "react";

import { MemosData } from "../../types/types";
import { FilterType } from "../../types/enums";

import { RootStateOrAny, useSelector } from "react-redux";

import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./MemosList.styles";

import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import FindReplaceIcon from "@material-ui/icons/FindReplace";

import SearchBar from "../SearchBar/SearchBar";
import Create from "../Create/Create";
import Head from "../Head/Head";
import MemoItem from "../MemoItem/MemoItem";
import BottomControls from "../BottomControls/BottomControls";
import Pagination from "../Pagination/Pagination";

import { sortArrayOfObj } from "../../utils/sort";
import { filterMemoByStatus } from "../../utils/filter";

const MemosList: React.FC = () => {
  //prettier-ignore
  const [sortByProperty, setSortByProperty] = useState<keyof MemosData>("due_on");
  const [sortDirection, setSortDirection] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filterByStatus, setFilterByStatus] = useState<FilterType>(1);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const classes = useStyles();

  const memos = useSelector((state: RootStateOrAny) => state.memos);
  const loading = useSelector((state: RootStateOrAny) => state.loading);
  const error = useSelector((state: RootStateOrAny) => state.error);

  const sortedMemo: MemosData[] =
    memos && sortArrayOfObj(memos, sortByProperty, sortDirection);

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
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          createModalOpen={createModalOpen}
          setCreateModalOpen={setCreateModalOpen}
          createButtonDisabled={memos.length === 20}
        />
        {createModalOpen && (
          <Create open={createModalOpen} setOpen={setCreateModalOpen} />
        )}
        <Table className={classes.table}>
          <Head
            sortByProperty={sortByProperty}
            setSortByProperty={setSortByProperty}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
          <TableBody className={classes.tableBody}>
            {sortedMemo.length > 0 && itemCounter > 0 && !loading && !error
              ? filterMemoByStatus(sortedMemo, filterByStatus, searchInput)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
          <TableBody>
            <BottomControls
              memos={memos}
              filterByStatus={filterByStatus}
              setFilterByStatus={setFilterByStatus}
            />
          </TableBody>
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

export default MemosList;
