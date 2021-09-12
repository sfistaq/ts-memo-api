import React, { useState, useEffect, memo } from "react";

//TYPES
import { MemosData } from "../../types/types";

//REDUX
import { useDispatch } from "react-redux";
import * as Actions from "../../store/actions/actionsIndex";

//MUI
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import useStyles from "./MemoItem.styles";

//MUI ICONS
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PageviewIcon from "@material-ui/icons/Pageview";

//COMPONENTS
import Details from "../Details/Details";

const MemoItem: React.FC<MemosData> = ({ id, title, due_on, status }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [sliceText, setSliceText] = useState<number>(150);

  const dispatch = useDispatch();
  const classes = useStyles({ status: status }); // PASS PROPS TO useStyles

  //WINDOW SIZE
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize); // cleanup
    };
  }, []);

  // SLICE VALUE
  useEffect(() => {
    if (windowSize > 800) {
      setSliceText(90);
    }
    if (windowSize < 800) {
      setSliceText(70);
    }
    if (windowSize < 600) {
      setSliceText(50);
    }
  }, [sliceText, windowSize]);

  // COMPLETE HANDLER
  const completeHandler = (id: number, status: string) => {
    const data = {
      status: status === "pending" ? "completed" : "pending",
      title: title,
      due_on: new Date().toString(),
    };
    dispatch(Actions.fetchComplete(data, id));
  };

  // REMOVE HANDLER
  const removeMemoHander = (id: number) => {
    dispatch(Actions.fetchRemove(id));
  };

  return (
    <TableRow className={classes.row}>
      {/*// COMPLETE */}
      <TableCell className={classes.completeItem}>
        <IconButton size="small" onClick={() => completeHandler(id, status)}>
          {status === "completed" ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </IconButton>
      </TableCell>
      {/*// TITLE */}
      <TableCell className={classes.titleItem}>
        <Typography onDoubleClick={() => setOpen(true)}>
          {title.length < sliceText
            ? title
            : `${title.slice(0, sliceText)} ...`}
        </Typography>
      </TableCell>
      {/*// DATE */}
      <TableCell className={classes.dateItem}>
        <Typography className={classes.dateText}>
          {new Date(`${due_on}`).toLocaleDateString()}
        </Typography>
        <Typography className={classes.dateText}>
          {new Date(`${due_on}`).toLocaleTimeString()}
        </Typography>
      </TableCell>
      {/*// EDIT */}
      <TableCell className={classes.editButtons}>
        <IconButton onClick={() => setOpen(true)}>
          <PageviewIcon className={classes.blue} />
        </IconButton>
        <IconButton onClick={() => removeMemoHander(id)}>
          <DeleteForeverIcon className={classes.red} />
        </IconButton>
      </TableCell>

      <TableCell className={classes.modalCell}>
        {open && (
          <Details
            id={id}
            title={title}
            status={status}
            due_on={due_on}
            open={open}
            setOpen={setOpen}
            complete={completeHandler}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default memo(MemoItem);
