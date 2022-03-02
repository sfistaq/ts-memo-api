import { MemosData } from "../../types/types";

export enum MemoActionTypes {
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  FETCH_MEMOS = "FETCH_MEMOS",
  REMOVE_MEMO = "REMOVE_MEMO",
  ADD_MEMO = "ADD_MEMO",
  COMPLETE_MEMO = "COMPLETE_MEMO",
  EDIT_MEMO = "EDIT_MEMO",
}

export enum LoadingsTypes {
  DELETE = "DELETE",
  EDIT = "EDIT",
  COMPLETE = "COMPLETE",
  CREATE = "CREATE",
  FETCH = "FETCH",
  CLEAR_COMPLETED = "CLEAR_COMPLETED",
}

type SetLoadingActionType = {
  type: MemoActionTypes.SET_LOADING;
  payload: LoadingsTypes | null;
};

export const setLoading = (
  loading: LoadingsTypes | null
): SetLoadingActionType => {
  return {
    type: MemoActionTypes.SET_LOADING,
    payload: loading,
  };
};

type SetErrorActionType = {
  type: MemoActionTypes.SET_ERROR;
  payload: string;
};

export const setError = (error: string): SetErrorActionType => {
  return {
    type: MemoActionTypes.SET_ERROR,
    payload: error,
  };
};

type FetchMemosActionType = {
  type: MemoActionTypes.FETCH_MEMOS;
  payload: MemosData[];
};

export const fetchMemos = (data: MemosData[]): FetchMemosActionType => {
  return {
    type: MemoActionTypes.FETCH_MEMOS,
    payload: data,
  };
};

type RemoveMemoActionType = {
  type: MemoActionTypes.REMOVE_MEMO;
  payload: number;
};

export const removeMemo = (id: number): RemoveMemoActionType => {
  return {
    type: MemoActionTypes.REMOVE_MEMO,
    payload: id,
  };
};

type AddMemoActionType = {
  type: MemoActionTypes.ADD_MEMO;
  payload: MemosData;
};

export const addMemo = (data: MemosData): AddMemoActionType => {
  return {
    type: MemoActionTypes.ADD_MEMO,
    payload: data,
  };
};

type CompleteMemoActionType = {
  type: MemoActionTypes.COMPLETE_MEMO;
  payload: {
    data: MemosData;
    id: number;
  };
};

// TODO przerobić na patch
export const completeMemo = (
  data: MemosData,
  id: number
): CompleteMemoActionType => {
  return {
    type: MemoActionTypes.COMPLETE_MEMO,
    payload: { data, id },
  };
};

type EditMemoActionType = {
  type: MemoActionTypes.EDIT_MEMO;
  payload: {
    data: MemosData;
    id: number;
  };
};

export const editMemo = (data: MemosData, id: number): EditMemoActionType => {
  return {
    type: MemoActionTypes.EDIT_MEMO,
    payload: { data, id },
  };
};

export type MemoAction =
  | SetLoadingActionType
  | SetErrorActionType
  | FetchMemosActionType
  | RemoveMemoActionType
  | AddMemoActionType
  | CompleteMemoActionType
  | EditMemoActionType;
