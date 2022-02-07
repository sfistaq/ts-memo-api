import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memoActions } from "../../store";
import { apiRequest } from "../../api/apiRequest";
import { FilterType, STATUS } from "../../types/enums";
import { bottomButtons } from "./data";
import { MemosData, MemoByStatus } from "../../types/types";
import { Container, Wrapper, Button } from "./BottomControls.styles";
import useFetchMemos from "../../hooks/useFetchMemos";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";

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
    <Container>
      {bottomButtons.map(({ id, sortProperty, icon, name }: MemoByStatus) => (
        <Wrapper key={id}>
          <Button
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
          </Button>
        </Wrapper>
      ))}
      <Wrapper>
        <Button
          onClick={() => clearCompletedHandler(memos)}
          size="small"
          variant="contained"
          color="error"
          endIcon={loading !== CLEAR_COMPLETED && <DeleteForeverIcon />}
          disabled={disabled(STATUS.COMPLETED)}
        >
          {loading === CLEAR_COMPLETED ? spinner : "Delete Completed"}
        </Button>
      </Wrapper>
    </Container>
  );
};

export default memo(BottomControls);
