import { apiRequest } from "../../api/apiRequest";
import { AppDispatch } from "../../index";
import { MemosReduxData } from "../../types/types";
import * as actionTypes from "./actionTypes";

const setLoading = () => {
  return {
    type: actionTypes.SET_LOADING,
  };
};

const setError = (error: string) => {
  return {
    type: actionTypes.SET_ERROR,
    data: error,
  };
};

const setMemos = (data: MemosReduxData) => {
  return {
    type: actionTypes.INIT_MEMOS,
    data: data,
  };
};

export const fetchMemos = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading());
    apiRequest("GET")
      .then((res) => {
        dispatch(setMemos(res!.data.data));
      })
      .catch((err) => {
        dispatch(setError(err.response.statusText));
      });
  };
};

const removeMemo = (id: number) => {
  return {
    type: actionTypes.REMOVE_MEMO,
    id: id,
  };
};

export const fetchRemove = (id: number) => {
  return (dispatch: AppDispatch) => {
    apiRequest("DELETE", id)
      .then(() => {
        dispatch(removeMemo(id));
      })
      .catch((err) => {
        dispatch(setError(err.response.statusText));
      });
  };
};

const addMemo = (data: MemosReduxData) => {
  return {
    type: actionTypes.ADD_MEMO,
    data: data,
  };
};

export const fetchAdd = (data: MemosReduxData) => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading());
    apiRequest("POST", undefined, data)
      .then(() => {
        dispatch(addMemo(data));
      })
      .then(() => {
        dispatch(fetchMemos());
      })
      .catch((err) => {
        dispatch(setError(err.response.statusText));
      });
  };
};

const completeMemo = (data: MemosReduxData, id: number) => {
  return {
    type: actionTypes.COMPLETE_MEMO,
    data: data,
    id: id,
  };
};

export const fetchComplete = (data: MemosReduxData, id: number) => {
  return (dispatch: AppDispatch) => {
    apiRequest("PUT", id, data)
      .then(() => {
        dispatch(completeMemo(data, id));
      })
      .catch((err) => {
        dispatch(setError(err.response.statusText));
      });
  };
};

const editMemo = (data: MemosReduxData, id: number) => {
  return {
    type: actionTypes.EDIT_MEMO,
    data: data,
    id: id,
  };
};

export const fetchEdit = (data: MemosReduxData, id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading());
    apiRequest("PUT", id, data)
      .then(() => {
        dispatch(editMemo(data, id));
      })
      .catch((err) => {
        dispatch(setError(err.response.statusText));
      });
  };
};

const clearCompleted = (data: MemosReduxData[]) => {
  return {
    type: actionTypes.CLEAR_COMPLETED,
    data: data,
  };
};

export const fetchClearCompleted = (data: MemosReduxData[], id: number[]) => {
  return (dispatch: AppDispatch) => {
    id.forEach((item: number) =>
      apiRequest("DELETE", item)
        .then(() => {
          dispatch(clearCompleted(data));
        })
        .catch((err) => {
          dispatch(setError(err.response.statusText));
        })
    );
  };
};
