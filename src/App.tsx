import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, RootStateOrAny, useSelector } from "react-redux";
import * as Actions from "./store/actions/actionsIndex";
import { sortArrayOfObj } from "./utils/sort";
import { filterMemoByStatus } from "./utils/filter";
import { MemosData } from "./types/types";
import { FilterType } from "./types/enums";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";

import CssBaseline from "@material-ui/core/CssBaseline"; //!!FIXNIJ
// import CssBaseline from "@mui/material/CssBaseline";

import SearchBar from "./components/SearchBar/SearchBar";
import Create from "./components/Create/Create";
import Head from "./components/Head/Head";
import MemosList from "./components/MemosList/MemosList";
import BottomControls from "./components/BottomControls/BottomControls";
import Pagination from "./components/Pagination/Pagination";
import { AppWrapper, TableWrapper, Table, TableRow } from "./styles/App.styles";

import { ThemeProvider, createTheme, Theme } from "@mui/material";

//! dodanie wartości do Theme
declare module "@mui/material/styles/createPalette" {
  interface TypeText {
    hint: string;
  }
  interface TypeBackground {
    main: string;
    transparent: string;
    dialog: string;
  }
}

//! dodaj wartosci z kolorami tła, exportuj do katalogu styles
const theme: Theme = createTheme({
  palette: {
    text: {
      hint: "rgba(0, 0, 0, 0.38)",
    },
    background: {
      main: "rgba(245, 245, 245, 0.5)",
      transparent: "rgba(245, 245, 245, 0.2)",
      dialog: "rgba(0, 0, 0, 0.5)",
    },
  },
});

const App: React.FC = () => {
  //prettier-ignore
  const [sortByProperty, setSortByProperty] = useState<keyof MemosData>("due_on");
  const [sortDirection, setSortDirection] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filterByStatus, setFilterByStatus] = useState<FilterType>(1);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

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

      <AppWrapper>
        <TableWrapper maxWidth="md">
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
            <Table>
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
                <TableRow>
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
        </TableWrapper>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
