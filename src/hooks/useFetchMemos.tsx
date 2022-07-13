import { apiRequest } from "../api/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { memoActions } from "../store";
import { toast } from "react-toastify";

const useFetchMemos = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootStore) => state.memo);

  const {
    LoadingsTypes: { FETCH },
    setLoading,
    fetchMemos: setMemos,
  } = memoActions;

  const fetchMemos = async () => {
    if (loading === FETCH) return;

    dispatch(setLoading(FETCH));
    try {
      const req = await apiRequest("GET");

      if (req.status === 200 && req.statusText === "OK") {
        dispatch(setMemos(req!.data.data));
        dispatch(setLoading(null));
      }
    } catch (error) {
      toast.error((error as Error).message);
      dispatch(setLoading(null));
    }
  };

  return { fetchMemos };
};

export default useFetchMemos;
