import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { INPUTS, sortArrayOfObjHelper, filterMemoHelper } from "./helpers";
import { cancelToken } from "./api";
import { FilterType, MemosData } from "./types";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material";
import { useFetchMemos } from "./hooks";
import {
  CssBaseline,
  TableFooter,
  TableBody,
  TableContainer,
} from "@mui/material";
import {
  SearchBar,
  Create,
  Head,
  MemosList,
  BottomControls,
  Pagination,
} from "./components";
import * as S from "./App.styles";

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
    memos && sortArrayOfObjHelper(memos, sortByProperty, sortDirection);

  const itemCounter: number = filterMemoHelper(
    sortedMemo,
    filterByStatus,
    searchInput
  ).length;

  useEffect(() => {
    fetchMemos();
    console.log("FETCH FROM HOME");

    return () => {
      console.log("HOME CLEANING");
      cancelToken.cancel();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <S.AppWrapper>
        <S.TableWrapper maxWidth="md">
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
            <S.Table>
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
                <S.TableRow>
                  <Pagination
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    itemCounter={itemCounter}
                  />
                </S.TableRow>
              </TableFooter>
            </S.Table>
          </TableContainer>
        </S.TableWrapper>
      </S.AppWrapper>
    </ThemeProvider>
  );
};

export default App;
