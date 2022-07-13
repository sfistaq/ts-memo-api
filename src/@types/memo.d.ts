import { STATUS, FilterType } from "../helpers";

declare type StatusType = typeof STATUS.PENDING | typeof STATUS.COMPLETED;

declare type MemosData = {
  id: number;
  user_id?: number;
  title: string;
  due_on: string;
  status: StatusType;
};

declare type AddMemoData = {
  title: string;
  due_on: string;
  status: StatusType;
};

declare type MemoByStatus = {
  id: number;
  name: string;
  sortProperty: FilterType;
  icon: JSX.Element;
};

declare type sendMemoData = {
  title: string;
  status: string;
  due_on: string;
};

declare type MemosReduxData = {
  id?: number;
  user_id?: number;
  title: string;
  due_on: string;
  status: string;
};

declare type MemosReducer = {
  memos: MemosData[];
  loading: boolean;
  error: null | string;
};

declare type Status = {
  status: StatusType;
};

declare type HeadData = {
  id: number;
  title: keyof MemosData;
  jsx: JSX.Element;
};
