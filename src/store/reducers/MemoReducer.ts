import { MemosReducer, MemosData } from "../../types/types";
import * as actionTypes from "../actions/actionTypes";

const initialState: MemosReducer = {
  memos: [],
  loading: false,
  error: null,
};

//TODO Add action types in reducer

const reducer = (
  state: MemosReducer = initialState,
  action: any
): MemosReducer => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.data,
        loading: false,
      };
    case actionTypes.INIT_MEMOS:
      return {
        ...state,
        memos: [...action.data],
        loading: false,
      };
    case actionTypes.REMOVE_MEMO:
      return {
        ...state,
        memos: state.memos.filter((item: MemosData) => item.id !== action.id),
      };
    case actionTypes.ADD_MEMO:
      return {
        ...state,
        memos: [action.data, ...state.memos],
        loading: false,
      };
    case actionTypes.COMPLETE_MEMO:
      return {
        ...state,
        memos: state.memos.map((item: MemosData) => {
          if (item.id === action.id && item.status === "pending") {
            item.status = "completed";
          } else if (item.id === action.id && item.status === "completed") {
            item.status = "pending";
          }
          return item;
        }),
      };
    case actionTypes.EDIT_MEMO:
      if (!action.data.title || /^\s*$/.test(action.data.title)) {
        return { ...state };
      }
      return {
        ...state,
        memos: state.memos.map((item: MemosData) =>
          item.id === action.id ? action.data : item
        ),
        loading: false,
      };
    case actionTypes.CLEAR_COMPLETED:
      return {
        ...state,
        memos: state.memos.filter(
          (item: MemosData) => item.status !== "completed"
        ),
      };
    default:
      return state;
  }
};

export default reducer;
