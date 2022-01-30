import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MemosData } from "../../types/types";
import * as Constants from "../../utils/constants";
import { memoActions } from "../../store";
import { apiRequest } from "../../api/apiRequest";
import useFetchMemos from "../../hooks/useFetchMemos";
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

const Create = ({ open, setOpen }: Props) => {
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootStore) => state.memo);
  const { fetchMemos } = useFetchMemos();

  const {
    LoadingsTypes: { CREATE },
    setLoading,
  } = memoActions;

  const closeOnOverlay = (event: React.MouseEvent) => {
    if ((event.target as Element).classList.contains("MuiBackdrop-root")) {
      setOpen(false);
    }
  };

  const addMemoHandler = async (input: string) => {
    if (!input) return;

    try {
      dispatch(setLoading(CREATE));
      const memoData: MemosData = {
        id: 1, //TODO ogarnij inny typ dla tej akcji zeby nie było ID
        status: "pending",
        title: `${input}`,
        due_on: new Date().toString(),
      };
      const req = await apiRequest("POST", undefined, memoData);

      if (req.status === 201 && req.statusText === "Created") {
        fetchMemos(); // ogarnia setMemos
        setOpen(false);
        dispatch(setLoading(null));
      }
    } catch (error) {
      dispatch(setLoading(null));
    }
  };

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
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInput(event.target.value)
            }
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
            endIcon={
              loading === CREATE ? <CircularProgress size={20} /> : <SendIcon />
            }
            disabled={
              input.replace(/\s+/g, "").length === 0 || loading !== null
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
};

export default Create;
