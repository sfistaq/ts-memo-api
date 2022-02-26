import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memoActions } from "../../store";
import { apiRequest } from "../../api";
import { useFetchMemos } from "../../hooks";
import { MemosData, MemoByStatus, FilterType, STATUS } from "../../types";
import { bottomButtons } from "./data";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CircularProgress } from "@mui/material";
import * as S from "./BottomControls.styles";

interface Props {
  memos: MemosData[];
  filterByStatus: FilterType;
  setFilterByStatus: React.Dispatch<React.SetStateAction<FilterType>>;
}

const BottomControls = ({
  memos,
  filterByStatus,
  setFilterByStatus,
}: Props) => {
  const dispatch = useDispatch();
  const { fetchMemos } = useFetchMemos();
  const { loading } = useSelector((state: RootStore) => state.memo);
  const {
    LoadingsTypes: { CLEAR_COMPLETED },
    setLoading,
  } = memoActions;

  const clearCompletedHandler = async (data: MemosData[]) => {
    if (loading) return;

    dispatch(setLoading(CLEAR_COMPLETED));
    const clearIDs: number[] = data
      .filter(({ status }: MemosData) => status === STATUS.COMPLETED)
      .map(({ id }: MemosData) => id);

    try {
      clearIDs.forEach(async (id: number, index: number) => {
        const req = await apiRequest("DELETE", id);

        if (req.status === 204 && clearIDs.length === index + 1) {
          fetchMemos();
          dispatch(setLoading(null));
          setFilterByStatus(FilterType.All);
        }
      });
    } catch (error) {
      dispatch(setLoading(null));
    }
  };

  const disabled = (property: string) => {
    //prettier-ignore
    return (memos.filter(({status}: MemosData) => status === `${property}`).length === 0);
  };

  const spinner = <CircularProgress size={20} color="inherit" />;

  return (
    <S.Container>
      {bottomButtons.map(({ id, sortProperty, icon, name }: MemoByStatus) => (
        <S.Wrapper key={id}>
          <S.Button
            onClick={() => {
              setFilterByStatus(sortProperty);
            }}
            variant={filterByStatus === sortProperty ? "contained" : "outlined"}
            color="primary"
            size="small"
            endIcon={icon}
            disabled={
              (name === "Completed" && disabled(STATUS.COMPLETED)) ||
              (name === "Active" && disabled(STATUS.PENDING))
            }
          >
            {name}
          </S.Button>
        </S.Wrapper>
      ))}
      <S.Wrapper>
        <S.Button
          onClick={() => clearCompletedHandler(memos)}
          size="small"
          variant="contained"
          color="error"
          endIcon={loading !== CLEAR_COMPLETED && <DeleteForeverIcon />}
          disabled={disabled(STATUS.COMPLETED)}
        >
          {loading === CLEAR_COMPLETED ? spinner : "Delete Completed"}
        </S.Button>
      </S.Wrapper>
    </S.Container>
  );
};

export default memo(BottomControls);
