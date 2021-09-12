import React, { useState, useEffect } from "react";
import * as Constants from "../../utils/constants";

//TYPES
import { AddMemoData } from "../../types/types";

//REDUX
import { useDispatch, RootStateOrAny, useSelector } from "react-redux";
import * as Actions from "../../store/actions/actionsIndex";

//MUI
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./Create.styles";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Create: React.FC<Props> = ({ open, setOpen }) => {
  const [input, setInput] = useState<string>("");
  const [startAddMemo, setStartAddMemo] = useState<boolean>(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  const loading = useSelector((state: RootStateOrAny) => state.loading);

  //CLOSE MODAL
  const closeOnOverlay = (event: React.MouseEvent) => {
    if ((event.target as Element).classList.contains("MuiBackdrop-root")) {
      setOpen(false);
    }
  };

  // CLOSE MODAL AFTER ADD MEMO
  useEffect(() => {
    if (loading) {
      setStartAddMemo(true);
    }
    if (!loading && startAddMemo) {
      setOpen(false);
    }
  }, [loading, startAddMemo, setOpen]);

  const addMemoHandler = (input: string) => {
    if (!input) return;
    const data: AddMemoData = {
      status: "pending",
      title: `${input}`,
      due_on: new Date().toString(),
    };
    dispatch(Actions.fetchAdd(data));
    setInput("");
  };

  return (
    <Backdrop
      open={open}
      className={classes.backdrop}
      onClick={(event: React.MouseEvent) => closeOnOverlay(event)}
      onKeyPress={(event: React.KeyboardEvent) => {
        event.key === "Enter" && addMemoHandler(input);
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
            onClick={() => addMemoHandler(input)}
            endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            className={classes.button}
            disabled={input.length === 0 || loading}
          >
            Submit
          </Button>
        </MuiDialogActions>
      </Dialog>
    </Backdrop>
  );
};

export default Create;
