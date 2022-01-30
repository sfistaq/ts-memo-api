import { FilterType } from "./enums";
import { Theme } from "@mui/material";

const PENDING = "pending";
const COMPLETED = "completed";

type StatusType = typeof PENDING | typeof COMPLETED;

export interface MemosData {
  id: number;
  user_id?: number;
  title: string;
  due_on: string;
  status: StatusType;
}

export interface AddMemoData {
  title: string;
  due_on: string;
  status: StatusType;
}

export interface MemoByStatus {
  id: number;
  name: string;
  sortProperty: FilterType;
  icon: JSX.Element;
}

export interface MemosReduxData {
  id?: number;
  user_id?: number;
  title: string;
  due_on: string;
  status: string;
}

export interface MemosReducer {
  memos: MemosData[];
  loading: boolean;
  error: null | string;
}

export interface sendMemoData {
  title: string;
  status: string;
  due_on: string;
}

export interface MuiTheme {
  theme: Theme;
}

export interface Status {
  status: StatusType;
}

export interface HeadData {
  id: number;
  title: keyof MemosData;
  jsx: JSX.Element;
}
