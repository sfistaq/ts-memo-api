import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, RootStateOrAny, useSelector } from "react-redux";
import * as Actions from "./store/actions/actionsIndex";
import { sortArrayOfObj } from "./utils/sort";
import { filterMemoByStatus } from "./utils/filter";
import { MemosData } from "./types/types";
import { FilterType } from "./types/enums";
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchBar from "./components/SearchBar/SearchBar";
import Create from "./components/Create/Create";
import Head from "./components/Head/Head";
import MemosList from "./components/MemosList/MemosList";
import BottomControls from "./components/BottomControls/BottomControls";
import Pagination from "./components/Pagination/Pagination";
import useStyles from "./styles/App.styles";

import { ThemeProvider, createTheme, Theme } from "@mui/material";

const theme: Theme = createTheme();

const App: React.FC = () => {
  //prettier-ignore
  const [sortByProperty, setSortByProperty] = useState<keyof MemosData>("due_on");
  const [sortDirection, setSortDirection] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filterByStatus, setFilterByStatus] = useState<FilterType>(1);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const memos = useSelector((state: RootStateOrAny) => state.memos);

  const sortedMemo: MemosData[] =
    memos && sortArrayOfObj(memos, sortByProperty, sortDirection);

  const itemCounter: number = filterMemoByStatus(
    sortedMemo,
    filterByStatus,
    searchInput
  ).length;

  const onInitMemos = useCallback(
    () => dispatch(Actions.fetchMemos()),
    [dispatch]
  );
  useEffect(() => {
    onInitMemos();
  }, [onInitMemos]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={classes.app} component="main">
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
              <Create
                open={createModalOpen}
                setOpen={setCreateModalOpen}
                setSearchInput={setSearchInput}
              />
            )}
            <Table className={classes.table}>
              <Head
                sortByProperty={sortByProperty}
                setSortByProperty={setSortByProperty}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
              />

              <MemosList
                filterByStatus={filterByStatus}
                searchInput={searchInput}
                page={page}
                rowsPerPage={rowsPerPage}
                sortedMemo={sortedMemo}
                itemCounter={itemCounter}
              />
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
      </Container>
    </ThemeProvider>
  );
};

export default App;
