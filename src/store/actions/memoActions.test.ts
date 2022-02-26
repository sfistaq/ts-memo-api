import { STATUS, MemosData } from "../../types";
import {
  setLoading,
  setError,
  setMemos,
  removeMemo,
  addMemo,
  completeMemo,
  editMemo,
  MemoActionTypes,
  LoadingsTypes,
} from "./memoActions";

describe("Redux Memo Actions", () => {
  const memoID = 1;
  const memoObj: MemosData = {
    id: 1,
    title: "title",
    due_on: new Date().getDate().toString(),
    status: STATUS.PENDING,
  };

  test("setLoading Action", () => {
    expect(setLoading(LoadingsTypes.FETCH)).toEqual({
      type: MemoActionTypes.SET_LOADING,
      payload: LoadingsTypes.FETCH,
    });
  });
  test("setError Action", () => {
    const errorMessage = "error";
    expect(setError(errorMessage)).toEqual({
      type: MemoActionTypes.SET_ERROR,
      payload: errorMessage,
    });
  });
  test("setMemos Action", () => {
    expect(setMemos([])).toEqual({
      type: MemoActionTypes.SET_MEMOS,
      payload: [],
    });
  });
  test("removeMemo Action", () => {
    expect(removeMemo(memoID)).toEqual({
      type: MemoActionTypes.REMOVE_MEMO,
      payload: memoID,
    });
  });
  test("addMemo Action", () => {
    expect(addMemo(memoObj)).toEqual({
      type: MemoActionTypes.ADD_MEMO,
      payload: memoObj,
    });
  });
  test("completeMemo Action", () => {
    expect(completeMemo(memoObj, memoID)).toEqual({
      type: MemoActionTypes.COMPLETE_MEMO,
      payload: { data: memoObj, id: memoID },
    });
  });
  test("editMemo Action", () => {
    expect(editMemo(memoObj, memoID)).toEqual({
      type: MemoActionTypes.EDIT_MEMO,
      payload: { data: memoObj, id: memoID },
    });
  });
});
