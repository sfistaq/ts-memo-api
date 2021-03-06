import { MemosData } from "../../@types/memo";
import { useSelector } from "react-redux";
import { memoActions } from "../../store";
import { FilterType } from "../../helpers";
import { filterMemoHelper } from "../../helpers";
import { CircularProgress } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import WarningIcon from "@mui/icons-material/Warning";
import { MemoItem, InfoMessage } from "..";
import * as S from "./MemosList.styles";

interface Props {
  filterByStatus: FilterType;
  searchInput: string;
  page: number;
  rowsPerPage: number;
  sortedMemo: MemosData[];
  itemCounter: number;
}

const MemosList = ({
  filterByStatus,
  searchInput,
  page,
  rowsPerPage,
  sortedMemo,
  itemCounter,
}: Props) => {
  const { loading, error } = useSelector((state: RootStore) => state.memo);
  const {
    LoadingsTypes: { FETCH },
  } = memoActions;

  return (
    <S.TableBody>
      {sortedMemo.length > 0 &&
      itemCounter > 0 &&
      loading !== FETCH &&
      !error ? (
        filterMemoHelper(sortedMemo, filterByStatus, searchInput)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item: MemosData, i: number) => (
            <MemoItem {...(item as MemosData)} key={i} />
          ))
      ) : loading === FETCH && !error ? (
        <InfoMessage
          message="Loading..."
          icon={<CircularProgress color="primary" />}
        />
      ) : sortedMemo.length === 0 &&
        itemCounter === 0 &&
        !error &&
        loading !== FETCH ? (
        <InfoMessage
          message="Add memo note by click 'Create' button"
          icon={<InfoIcon color="disabled" />}
        />
      ) : sortedMemo.length > 0 &&
        itemCounter === 0 &&
        !error &&
        loading !== FETCH ? (
        <InfoMessage
          message="Memo not found..."
          icon={<FindReplaceIcon color="disabled" />}
        />
      ) : error && loading !== FETCH ? (
        <InfoMessage
          message={`Request failed: "${error}"`}
          icon={<WarningIcon color="error" />}
        />
      ) : null}
    </S.TableBody>
  );
};

export default MemosList;
