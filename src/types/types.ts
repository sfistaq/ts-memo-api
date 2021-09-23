import { FilterType } from "./enums";
import { Theme } from "@mui/material";

export interface MemosData {
  id: number;
  user_id: number;
  title: string;
  due_on: string;
  status: "pending" | "completed";
}

export interface HeadData {
  id: number;
  title: keyof MemosData;
  class: string;
}

export interface AddMemoData {
  title: string;
  due_on: string;
  status: "pending" | "completed";
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
