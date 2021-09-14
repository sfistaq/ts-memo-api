import React, { useState } from "react";
import * as Constants from "../../utils/constants";
import { useDispatch } from "react-redux";
import * as Actions from "../../store/actions/actionsIndex";
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
  id,
  title,
  status,
  due_on,
  open,
  setOpen,
  complete,
}) => {
  const [input, setInput] = useState<string>("");
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const classes = useStyles({ status: status });
  const dispatch = useDispatch();

  const closeOnOverlay = (event: React.MouseEvent) => {
    if ((event.target as Element).classList.contains("MuiBackdrop-root")) {
      setOpen(false);
    }
  };

  const openEditTextarea = () => {
    setShowEdit(true);
    setInput(title);
  };

  const deleteHandler = (id: number) => {
    dispatch(Actions.fetchRemove(id));
    setOpen(false);
  };

  const completeHandler = (id: number, status: string) => {
    complete(id, status);
  };

  const editHandler = (id: number) => {
    if (title === input) {
      return setShowEdit(false);
    }
    const data = {
      id: id,
      title: input,
      status: status,
      due_on: new Date().toString(),
    };
    dispatch(Actions.fetchEdit(data, id));
    setShowEdit(false);
    setOpen(false);
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
        <MuiDialogContent dividers className={classes.dialogContent}>
          {showEdit && (
            <TextField
              className={classes.textarea}
              variant="outlined"
              multiline
              rows={5}
              ref={(ref) => ref && ref.focus()}
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
        <MuiDialogActions className={classes.buttonWrapper}>
          {!showEdit && (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteHandler(id)}
                endIcon={<DeleteForeverIcon />}
              >
                delete
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
                className={classes.completePendingButton}
                onClick={() => completeHandler(id, status)}
                endIcon={status === "pending" ? <DoneIcon /> : <RestoreIcon />}
              >
                {status === "pending" ? "complete" : "pending"}
              </Button>
            </>
          )}
          {showEdit && (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setShowEdit(false);
                }}
                endIcon={<CancelIcon />}
              >
                cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => editHandler(id)}
                endIcon={<SendIcon />}
              >
                save
              </Button>
            </>
          )}
        </MuiDialogActions>
      </Dialog>
    </Backdrop>
  );
};

export default Details;
