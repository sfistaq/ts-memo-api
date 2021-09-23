import React, { memo } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../../store/actions/actionsIndex";
import { MemosData, MemoByStatus } from "../../types/types";
import { FilterType } from "../../types/enums";
import { bottomButtons } from "./data";
import { Container, Wrapper, Button } from "./BottomControls.styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  memos: MemosData[];
  filterByStatus: FilterType;
  setFilterByStatus: React.Dispatch<React.SetStateAction<FilterType>>;
}

const BottomControls: React.FC<Props> = ({
  memos,
  filterByStatus,
  setFilterByStatus,
}) => {
  const dispatch = useDispatch();

  const clearCompletedHandler = (data: MemosData[]) => {
    const clearID = data
      .filter((item: MemosData) => item.status === "completed")
      .map((item: MemosData) => item.id);
    dispatch(Actions.fetchClearCompleted(data, clearID));
    setFilterByStatus(FilterType.All);
  };

  const disabled = (status: string) => {
    //prettier-ignore
    return (memos.filter((item: MemosData) => item.status === `${status}`).length === 0);
  };

  return (
    <Container>
      {bottomButtons.map((item: MemoByStatus) => (
        <Wrapper key={item.id}>
          <Button
            onClick={() => {
              setFilterByStatus(item.sortProperty);
            }}
            variant={
              filterByStatus === item.sortProperty ? "contained" : "outlined"
            }
            color="primary"
            size="small"
            endIcon={item.icon}
            disabled={
              (item.name === "Completed" && disabled("completed")) ||
              (item.name === "Active" && disabled("pending"))
            }
          >
            {item.name}
          </Button>
        </Wrapper>
      ))}
      <Wrapper>
        <Button
          onClick={() => clearCompletedHandler(memos)}
          size="small"
          variant="contained"
          color="error"
          endIcon={<DeleteForeverIcon />}
          disabled={disabled("completed")}
        >
          Remove Completed
        </Button>
      </Wrapper>
    </Container>
  );
};

export default memo(BottomControls);
