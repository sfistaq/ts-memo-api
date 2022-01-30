import { useSelector } from "react-redux";
import { MemosData } from "../../types/types";
import { FilterType } from "../../types/enums";
import { filterMemo } from "../../utils/filter";
import InfoMessage from "../InfoMessage/InfoMessage";
import MemoItem from "../MemoItem/MemoItem";
import CircularProgress from "@mui/material/CircularProgress";
import InfoIcon from "@mui/icons-material/Info";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import WarningIcon from "@mui/icons-material/Warning";
import { TableBody } from "./MemosList.styles";
import { memoActions } from "../../store";

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

  console.log(loading === FETCH);

  return (
    <TableBody>
      {sortedMemo.length > 0 &&
      itemCounter > 0 &&
      loading !== FETCH &&
      !error ? (
        filterMemo(sortedMemo, filterByStatus, searchInput)
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
    </TableBody>
  );
};

export default MemosList;
