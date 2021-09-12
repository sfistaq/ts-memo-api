import React, { useState } from "react";
import * as Constants from "../../utils/constants";

// REDUX
import { useDispatch } from "react-redux";
import * as Actions from "../../store/actions/actionsIndex";

// MUI
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import useStyles from "./Details.styles";

//MUI ICONS
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DoneIcon from "@material-ui/icons/Done";
import RestoreIcon from "@material-ui/icons/Restore";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";
import CancelIcon from "@material-ui/icons/Cancel";

interface Props {
  id: number;
  title: string;
  status: "pending" | "completed";
  due_on: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  complete: (id: number, status: string) => void;
}

const Details: React.FC<Props> = ({
  open,
  setOpen,
  complete,
  id,
  title,
  status,
  due_on,
}) => {
  const [input, setInput] = useState<string>("");
  const [showEdit, setShowEdit] = useState<boolean>(false); // SHOW EDIT

  const [startEditMemo, setStartEditMemo] = useState<boolean>(false);

  const classes = useStyles({ status: status });
  const dispatch = useDispatch();

  //CLOSE MODAL
  const closeOnOverlay = (event: React.MouseEvent) => {
    if ((event.target as Element).classList.contains("MuiBackdrop-root")) {
      setOpen(false);
    }
  };
  // OPEN EDIT TEXTAREA
  const openEditTextarea = () => {
    setStartEditMemo(true);
    setShowEdit(true);
    setInput(title);
  };

  // REMOVE MEMO
  const deleteHandler = (id: number) => {
    dispatch(Actions.fetchRemove(id));
    setOpen(false);
  };
  // COMPLETE MEMO
  const completeHandler = (id: number, status: string) => {
    complete(id, status);
  };

  // EDIT MEMO
  const editHandler = (id: number) => {
    if (title === input) {
      return setShowEdit(false);
    } else if (startEditMemo) {
      const data = {
        status: status,
        title: input,
        due_on: new Date().toString(),
        id: id,
      };
      dispatch(Actions.fetchEdit(data, id));

      setShowEdit(false);
      setOpen(false);
    }
  };

  return (
    <Backdrop
      open={open}
      className={classes.backdrop}
      onClick={(event: React.MouseEvent) => closeOnOverlay(event)}
      onKeyPress={(event: React.KeyboardEvent) => {
        event.key === "Enter" && editHandler(id);
      }}
    >
      <Dialog
        className={classes.dialog}
        open={open}
        onClose={() => setOpen(false)}
        PaperComponent={Paper}
      >
        <MuiDialogTitle className={classes.title}>
          {showEdit ? "Edit Memo" : "Memo Details"}
          <CloseIcon
            className={classes.closeButton}
            onClick={() => setOpen(false)}
          />
        </MuiDialogTitle>

        {/* DIALOG TEXTAREA */}
        <MuiDialogContent dividers className={classes.dialogContent}>
          {showEdit && (
            <TextField
              className={classes.textarea}
              variant="outlined"
              multiline
              rows={5}
              ref={(ref) => ref && ref.focus()} // FOCUS ON END TEXT AREA
              autoFocus={true}
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setInput(event.target.value)}
              value={input}
              inputProps={{ minLength: 1, maxLength: Constants.CHARLIMIT }}
              label={
                input.length > 0
                  ? `${input.length} /  ${Constants.CHARLIMIT}`
                  : ""
              }
              error={input.length === Constants.CHARLIMIT}
            />
          )}
          {/* DIALOG CONTENT */}
          {!showEdit && (
            <DialogContentText className={classes.dialogContentText}>
              <Typography component={"span"} className={classes.mainText}>
                {title}
              </Typography>
              <Typography component={"span"} className={classes.statusText}>
                status: <strong>{status}</strong>
              </Typography>
              <Typography component={"span"} className={classes.statusText}>
                created: {new Date(`${due_on}`).toLocaleDateString()}{" "}
                {new Date(`${due_on}`).toLocaleTimeString()}
              </Typography>
            </DialogContentText>
          )}
        </MuiDialogContent>

        {/* DIALOG ACTIONS */}
        <MuiDialogActions className={classes.buttonWrapper}>
          {!showEdit && (
            <>
              <Button
                variant="contained"
                className={classes.completePendingButton}
                onClick={() => completeHandler(id, status)}
                endIcon={status === "pending" ? <DoneIcon /> : <RestoreIcon />}
              >
                {status === "pending" ? "complete" : "pending"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={openEditTextarea}
                endIcon={<EditIcon />}
              >
                edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteHandler(id)}
                endIcon={<DeleteForeverIcon />}
              >
                delete
              </Button>
            </>
          )}
          {showEdit && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => editHandler(id)}
                endIcon={<SendIcon />}
              >
                save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setShowEdit(false);
                  setStartEditMemo(false);
                }}
                endIcon={<CancelIcon />}
              >
                cancel
              </Button>
            </>
          )}
        </MuiDialogActions>
      </Dialog>
    </Backdrop>
  );
};

export default Details;
