import { useDispatch, useSelector } from "react-redux";
import { memoActions } from "../store";
import { apiRequest } from "../api/apiRequest";
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
      const { data } = req!.data;
      dispatch(setMemos(data));
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      dispatch(setLoading(null));
    }
  };

  return { fetchMemos };
};

export default useFetchMemos;
