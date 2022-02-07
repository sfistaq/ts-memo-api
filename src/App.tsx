import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { INPUTS } from "./utils/constants";
import { sortArrayOfObj } from "./utils/sort";
import { filterMemo } from "./utils/filter";
import { MemosData } from "./types/types";
import { FilterType } from "./types/enums";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material";
import useFetchMemos from "./hooks/useFetchMemos";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import CssBaseline from "@mui/material/CssBaseline";
import SearchBar from "./components/SearchBar/SearchBar";
import Create from "./components/Create/Create";
import Head from "./components/Head/Head";
import MemosList from "./components/MemosList/MemosList";
import BottomControls from "./components/BottomControls/BottomControls";
import Pagination from "./components/Pagination/Pagination";
import { AppWrapper, TableWrapper, Table, TableRow } from "./styles/App.styles";

const App = () => {
  const [sortByProperty, setSortByProperty] =
    useState<keyof MemosData>("due_on");
  const [sortDirection, setSortDirection] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filterByStatus, setFilterByStatus] = useState<FilterType>(1);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const { fetchMemos } = useFetchMemos();
  const { memos } = useSelector((state: RootStore) => state.memo);
  const { SEARCH_INPUT } = INPUTS;
  const { register, control } = useForm({
    defaultValues: {
      [SEARCH_INPUT]: "",
    },
  });

  const searchInput = useWatch({ control, name: SEARCH_INPUT });

  const sortedMemo: MemosData[] =
    memos && sortArrayOfObj(memos, sortByProperty, sortDirection);

  const itemCounter: number = filterMemo(
    sortedMemo,
    filterByStatus,
    searchInput
  ).length;

  useEffect(() => {
    fetchMemos();
    console.log("FETCH FROM HOME");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppWrapper>
        <TableWrapper maxWidth="md">
          <TableContainer>
            <SearchBar
              searchInput={searchInput}
              createModalOpen={createModalOpen}
              setCreateModalOpen={setCreateModalOpen}
              createButtonDisabled={memos.length === 20}
              register={register(SEARCH_INPUT)}
            />
            {createModalOpen && (
              <Create open={createModalOpen} setOpen={setCreateModalOpen} />
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
