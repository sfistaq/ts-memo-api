import { apiRequest } from "../api/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { memoActions } from "../store";

const useFetchMemos = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootStore) => state.memo);

  const {
    LoadingsTypes: { FETCH },
    setLoading,
    setMemos,
  } = memoActions;

  const fetchMemos = async () => {
    if (loading === FETCH) return;

    dispatch(setLoading(FETCH));
    try {
      const req = await apiRequest("GET");

      if (req.status === 200 && req.statusText === "OK") {
        dispatch(setLoading(null));
        dispatch(setMemos(req!.data.data));
      }
    } catch (error) {
      dispatch(setLoading(null));
    }
  };

  return { fetchMemos };
};

export default useFetchMemos;
