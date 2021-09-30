import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "../../store/actions/actionsIndex";
import * as Constants from "../../utils/constants";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneIcon from "@mui/icons-material/Done";
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  MainText,
  StatusText,
  CloseButton,
  DialogActions,
  CompletePendingButton,
} from "./Details.styles";

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
  const dispatch = useDispatch();

  //! export do utils to samo co w create
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
      onClick={(event: React.MouseEvent) => closeOnOverlay(event)}
      onKeyPress={(event: React.KeyboardEvent) => {
        event.key === "Enter" && editHandler(id);
      }}
    >
      <Dialog open={open} onClose={() => setOpen(false)} PaperComponent={Paper}>
        <DialogTitle>
          {showEdit ? "Edit Memo" : "Memo Details"}
          <CloseButton onClick={() => setOpen(false)} />
        </DialogTitle>
        <DialogContent dividers>
          {showEdit && (
            <TextField
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
            <DialogContentText>
              <MainText>{title}</MainText>
              <StatusText>
                status: <strong>{status}</strong>
              </StatusText>
              <StatusText>
                created: {new Date(`${due_on}`).toLocaleDateString()}{" "}
                {new Date(`${due_on}`).toLocaleTimeString()}
              </StatusText>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {!showEdit && (
            <>
              <Button
                variant="contained"
                color="error"
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
              <CompletePendingButton
                status={status}
                variant="contained"
                onClick={() => completeHandler(id, status)}
                endIcon={status === "pending" ? <DoneIcon /> : <RestoreIcon />}
              >
                {status === "pending" ? "complete" : "pending"}
              </CompletePendingButton>
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
                disabled={input.length === 0}
              >
                save
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
};

export default Details;
