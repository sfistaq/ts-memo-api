import { MemosData } from "../../../types/types";

import {
  MemoActionTypes,
  MemoAction,
  LoadingsTypes,
} from "../../actions/memoActions";

interface MemoState {
  memos: MemosData[];
  loading: LoadingsTypes | null;
  error: null | string;
}

const initialState: MemoState = {
  memos: [],
  loading: null,
  error: null,
};

const memoReducer = (
  state: MemoState = initialState,
  action: MemoAction
): MemoState => {
  switch (action.type) {
    case MemoActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case MemoActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null,
      };
    case MemoActionTypes.INIT_MEMOS:
      return {
        ...state,
        memos: [...action.payload],
        loading: null,
      };
    case MemoActionTypes.REMOVE_MEMO:
      return {
        ...state,
        memos: state.memos.filter(
          (item: MemosData) => item.id !== action.payload
        ),
      };
    case MemoActionTypes.ADD_MEMO:
      return {
        ...state,
        memos: [action.payload, ...state.memos],
        loading: null,
      };
    case MemoActionTypes.COMPLETE_MEMO:
      return {
        ...state,
        memos: state.memos.map((item: MemosData) => {
          if (item.id === action.payload.id && item.status === "pending") {
            item.status = "completed";
          } else if (
            item.id === action.payload.id &&
            item.status === "completed"
          ) {
            item.status = "pending";
          }
          return item;
        }),
      };
    case MemoActionTypes.EDIT_MEMO:
      if (
        !action.payload.data.title ||
        /^\s*$/.test(action.payload.data.title)
      ) {
        return { ...state };
      }
      return {
        ...state,
        memos: state.memos.map((item: MemosData) =>
          item.id === action.payload.id ? action.payload.data : item
        ),
        loading: null,
      };
    default:
      return state;
  }
};

export default memoReducer;
