import React, { useState, useEffect } from "react";
import { useDispatch, RootStateOrAny, useSelector } from "react-redux";
import { AddMemoData } from "../../types/types";
import * as Constants from "../../utils/constants";
import * as Actions from "../../store/actions/actionsIndex";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import {
  Backdrop,
  DialogContent,
  TextField,
  CloseButton,
  DialogTitle,
  DialogActions,
  Button,
} from "./Create.styles";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const Create: React.FC<Props> = ({ open, setOpen, setSearchInput }) => {
  const [input, setInput] = useState<string>("");
  const [startAddMemo, setStartAddMemo] = useState<boolean>(false);
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
      open={open}
      onClick={(event: React.MouseEvent) => closeOnOverlay(event)}
      onKeyPress={(event: React.KeyboardEvent) => {
        if (input.replace(/\s+/g, "").length >= 1) {
          event.key === "Enter" && addMemoHandler(input);
        }
      }}
    >
      <Dialog open={open} onClose={() => setOpen(false)} PaperComponent={Paper}>
        <DialogTitle>
          Create Memo
          <CloseButton onClick={() => setOpen(false)} />
        </DialogTitle>
        <DialogContent dividers>
          <TextField
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
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addMemoHandler(input);
            }}
            endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            disabled={input.replace(/\s+/g, "").length === 0 || loading}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
};

export default Create;
