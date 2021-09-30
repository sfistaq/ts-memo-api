import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { MemosData } from "../../types/types";
import { FilterType } from "../../types/enums";
import { filterMemoByStatus } from "../../utils/filter";
import InfoMessage from "../InfoMessage/InfoMessage";
import MemoItem from "../MemoItem/MemoItem";
import CircularProgress from "@mui/material/CircularProgress";
import InfoIcon from "@mui/icons-material/Info";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import WarningIcon from "@mui/icons-material/Warning";
import { TableBody } from "./MemosList.styles";

interface Props {
  filterByStatus: FilterType;
  searchInput: string;
  page: number;
  rowsPerPage: number;
  sortedMemo: MemosData[];
  itemCounter: number;
}

const MemosList: React.FC<Props> = ({
  filterByStatus,
  searchInput,
  page,
  rowsPerPage,
  sortedMemo,
  itemCounter,
}) => {
  const loading = useSelector((state: RootStateOrAny) => state.loading);
  const error = useSelector((state: RootStateOrAny) => state.error);

  return (
    <TableBody>
      {sortedMemo.length > 0 && itemCounter > 0 && !loading && !error ? (
        filterMemoByStatus(sortedMemo, filterByStatus, searchInput)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item: MemosData, i: number) => <MemoItem {...item} key={i} />)
      ) : loading && !error ? (
        <InfoMessage
          message="Loading..."
          icon={<CircularProgress color="primary" />}
        />
      ) : sortedMemo.length === 0 && itemCounter === 0 && !error ? (
        <InfoMessage
          message="Add memo note by click 'Create' button"
          icon={<InfoIcon color="disabled" />}
        />
      ) : sortedMemo.length > 0 && itemCounter === 0 && !error ? (
        <InfoMessage
          message="Memo not found..."
          icon={<FindReplaceIcon color="disabled" />}
        />
      ) : error ? (
        <InfoMessage
          message={`Request failed: "${error}"`}
          icon={<WarningIcon color="error" />}
        />
      ) : null}
    </TableBody>
  );
};

export default MemosList;
