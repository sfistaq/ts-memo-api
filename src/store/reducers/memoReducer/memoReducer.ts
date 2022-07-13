import type { MemosData } from "../../../@types/memo";
import { STATUS } from "../../../helpers";
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

export const initialState: MemoState = {
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
      };
    case MemoActionTypes.FETCH_MEMOS:
      return {
        ...state,
        memos: [...action.payload],
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
      };
    case MemoActionTypes.COMPLETE_MEMO:
      return {
        ...state,
        memos: state.memos.map((item: MemosData) => {
          if (item.id === action.payload.id && item.status === STATUS.PENDING) {
            item.status = STATUS.COMPLETED;
          } else if (
            item.id === action.payload.id &&
            item.status === STATUS.COMPLETED
          ) {
            item.status = STATUS.PENDING;
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
      };
    default:
      return state;
  }
};

export default memoReducer;
