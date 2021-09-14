import React, { useState, useEffect } from "react";
import * as Constants from "../../utils/constants";
import { AddMemoData } from "../../types/types";
import { useDispatch, RootStateOrAny, useSelector } from "react-redux";
import * as Actions from "../../store/actions/actionsIndex";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import useStyles from "./Create.styles";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const Create: React.FC<Props> = ({ open, setOpen, setSearchInput }) => {
  const [input, setInput] = useState<string>("");
  const [startAddMemo, setStartAddMemo] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootStateOrAny) => state.loading);

  const closeOnOverlay = (event: React.MouseEvent) => {
    if ((event.target as Element).classList.contains("MuiBackdrop-root")) {
      setOpen(false);
    }
  };

  const addMemoHandler = (input: string) => {
    if (!input) return;
    const data: AddMemoData = {
      status: "pending",
      title: `${input}`,
      due_on: new Date().toString(),
    };
    dispatch(Actions.fetchAdd(data));
    setInput("");
    setSearchInput("");
  };

  useEffect(() => {
    if (loading) {
      setStartAddMemo(true);
    }
    if (!loading && startAddMemo) {
      setOpen(false);
    }
  }, [loading, startAddMemo, setOpen]);

  return (
    <Backdrop
      className={classes.backdrop}
      open={open}
      onClick={(event: React.MouseEvent) => closeOnOverlay(event)}
      onKeyPress={(event: React.KeyboardEvent) => {
        if (input.replace(/\s+/g, "").length >= 1) {
          event.key === "Enter" && addMemoHandler(input);
        }
      }}
    >
      <Dialog open={open} onClose={() => setOpen(false)} PaperComponent={Paper}>
        <MuiDialogTitle className={classes.title}>
          Create Memo
          <CloseIcon
            className={classes.closeButton}
            onClick={() => setOpen(false)}
          />
        </MuiDialogTitle>
        <MuiDialogContent className={classes.dialogContent} dividers>
          <TextField
            className={classes.textarea}
            variant="outlined"
            multiline
            rows={5}
            autoFocus={true}
            inputProps={{ minLength: 1, maxLength: Constants.CHARLIMIT }}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setInput(event.target.value)}
            value={input}
            placeholder="Add your memo note..."
            label={
              input.length > 0
                ? `${input.length} /  ${Constants.CHARLIMIT}`
                : ""
            }
            error={input.length === Constants.CHARLIMIT}
          />
        </MuiDialogContent>
        <MuiDialogActions className={classes.dialogActions}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addMemoHandler(input);
            }}
            endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            className={classes.button}
            disabled={input.replace(/\s+/g, "").length === 0 || loading}
          >
            Submit
          </Button>
        </MuiDialogActions>
      </Dialog>
    </Backdrop>
  );
};

export default Create;
