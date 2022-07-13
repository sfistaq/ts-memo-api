import type { MemosData } from "../../../@types/memo";
import memoReducer, { initialState } from "./memoReducer";
import { MemoActionTypes, LoadingsTypes } from "../../actions/memoActions";
import { STATUS } from "../../../helpers";

describe("Redux Memo Reducer", () => {
  const testErrorMessage = "Error message!";

  const testMemo1: MemosData = {
    id: 1,
    title: "Test memo message",
    due_on: new Date().getDate().toString(),
    status: STATUS.PENDING,
  };
  const testMemo2: MemosData = {
    id: 2,
    title: "Test memo 2 message",
    due_on: new Date().getDate().toString(),
    status: STATUS.PENDING,
  };

  test("Returns the initial state", () => {
    // @ts-ignore
    expect(memoReducer(undefined, {})).toEqual(initialState);
  });
  test(`Set loading type ${LoadingsTypes.CREATE}`, () => {
    expect(
      memoReducer(initialState, {
        type: MemoActionTypes.SET_LOADING,
        payload: LoadingsTypes.CREATE,
      })
    ).toEqual({
      ...initialState,
      loading: LoadingsTypes.CREATE,
    });
  });
  test("Set error message", () => {
    expect(
      memoReducer(initialState, {
        type: MemoActionTypes.SET_ERROR,
        payload: testErrorMessage,
      })
    ).toEqual({
      ...initialState,
      error: testErrorMessage,
    });
  });
  test("Fetch empty memos array", () => {
    expect(
      memoReducer(initialState, {
        type: MemoActionTypes.FETCH_MEMOS,
        payload: [],
      })
    ).toEqual({
      ...initialState,
      memos: [],
    });
  });
  test("Fetch memos items", () => {
    expect(
      memoReducer(initialState, {
        type: MemoActionTypes.FETCH_MEMOS,
        payload: [testMemo1, testMemo2],
      })
    ).toEqual({
      ...initialState,
      memos: [testMemo1, testMemo2],
    });
  });
  test("Remove memo item", () => {
    expect(
      memoReducer(
        { ...initialState, memos: [testMemo1, testMemo2] },
        {
          type: MemoActionTypes.REMOVE_MEMO,
          payload: testMemo2.id,
        }
      )
    ).toEqual({
      ...initialState,
      memos: [testMemo1],
    });
  });
  test("Add memo item", () => {
    expect(
      memoReducer(
        { ...initialState, memos: [testMemo1] },
        {
          type: MemoActionTypes.ADD_MEMO,
          payload: testMemo2,
        }
      )
    ).toEqual({
      ...initialState,
      memos: [testMemo2, testMemo1],
    });
  });
  test(`Complete memo, change status to ${STATUS.COMPLETED}`, () => {
    expect(
      memoReducer(
        { ...initialState, memos: [testMemo1] },
        {
          type: MemoActionTypes.COMPLETE_MEMO,
          payload: { data: testMemo1, id: testMemo1.id },
        }
      )
    ).toEqual({
      ...initialState,
      memos: [{ ...testMemo1, status: STATUS.COMPLETED }],
    });
  });
  test("Edit memo title", () => {
    expect(
      memoReducer(
        { ...initialState, memos: [testMemo1] },
        {
          type: MemoActionTypes.EDIT_MEMO,
          payload: {
            data: { ...testMemo1, title: "edited title" },
            id: testMemo1.id,
          },
        }
      )
    ).toEqual({
      ...initialState,
      memos: [{ ...testMemo1, title: "edited title" }],
    });
  });
});
