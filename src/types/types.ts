import { FilterType } from "./enums";

export interface MemosData {
  id: number;
  user_id: number;
  title: string;
  due_on: string;
  status: "pending" | "completed";
}

//HEAD
export interface HeadData {
  id: number;
  title: keyof MemosData;
  class: string;
}

//CREATE
export interface AddMemoData {
  title: string;
  due_on: string;
  status: "pending" | "completed";
}

//BOTTOM CONTROLS
export interface MemoByStatus {
  id: number;
  name: string;
  sortProperty: FilterType;
  icon: JSX.Element;
}

//REDUX
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

//API REQUEST
export interface sendMemoData {
  title: string;
  status: string;
  due_on: string;
}
