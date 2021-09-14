import React, { memo } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../../store/actions/actionsIndex";
import { MemosData, MemoByStatus } from "../../types/types";
import { FilterType } from "../../types/enums";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import useStyles from "./BottomControls.styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { memoByStatusButtons } from "./data";

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
  const classes = useStyles();
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
    <TableRow className={classes.bottom} component="tr">
      {memoByStatusButtons.map((item: MemoByStatus) => (
        <TableCell className={classes.tableCell} key={item.id}>
          <Button
            className={classes.button}
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
        </TableCell>
      ))}
      <TableCell className={classes.tableCell}>
        <Button
          className={classes.button}
          onClick={() => clearCompletedHandler(memos)}
          size="small"
          variant="contained"
          color="secondary"
          endIcon={<DeleteForeverIcon />}
          disabled={disabled("completed")}
        >
          Remove Completed
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default memo(BottomControls);
