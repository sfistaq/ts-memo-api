import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterType } from "../../types/enums";
import { MemosData, MemoByStatus } from "../../types/types";
import { bottomButtons } from "./data";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { memoActions } from "../../store";
import useFetchMemos from "../../hooks/useFetchMemos";
import { apiRequest } from "../../api/apiRequest";
import { Container, Wrapper, Button } from "./BottomControls.styles";
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
    dispatch(setLoading(CLEAR_COMPLETED));
    const clearIDs: number[] = data
      .filter(({ status }: MemosData) => status === "completed")
      .map(({ id }: MemosData) => id);

    try {
      clearIDs.forEach(async (id: number) => {
        const req = await apiRequest("DELETE", id);

        if (req.status === 204) {
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
              (name === "Completed" && disabled("completed")) ||
              (name === "Active" && disabled("pending"))
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
          disabled={disabled("completed")}
        >
          {loading === CLEAR_COMPLETED ? spinner : "Delete Completed"}
        </Button>
      </Wrapper>
    </Container>
  );
};

export default memo(BottomControls);
