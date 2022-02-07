import * as Constants from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { AddMemoData } from "../../types/types";
import { memoActions } from "../../store";
import { apiRequest } from "../../api/apiRequest";
import { INPUTS } from "../../utils/constants";
import { useEffect } from "react";
import { cancelToken } from "../../api/apiRequest";
import { STATUS } from "../../types/enums";
import useFetchMemos from "../../hooks/useFetchMemos";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
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
}

const Create = ({ open, setOpen }: Props) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootStore) => state.memo);
  const { fetchMemos } = useFetchMemos();
  const { CREATE_INPUT } = INPUTS;
  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      [CREATE_INPUT]: "",
    },
  });
  const input = useWatch({ control, name: CREATE_INPUT });
  const {
    LoadingsTypes: { CREATE },
    setLoading,
  } = memoActions;

  const closeOnOverlay = (event: React.MouseEvent) => {
    if (
      (event.target as Element).classList.contains("MuiBackdrop-root") &&
      loading !== CREATE
    ) {
      setOpen(false);
    }
  };

  const addMemoHandler = async () => {
    if (!input) return;

    try {
      dispatch(setLoading(CREATE));
      const memoData: AddMemoData = {
        status: STATUS.PENDING,
        title: `${input}`,
        due_on: new Date().toString(),
      };
      const req = await apiRequest("POST", undefined, memoData);

      if (req.status === 201 && req.statusText === "Created") {
        dispatch(setLoading(null));
        setOpen(false);
        fetchMemos();
      }
    } catch (error) {
      dispatch(setLoading(null));
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      cancelToken && cancelToken.cancel();
    };
  }, []);

  const onCloseHandler = () => {
    loading !== CREATE && setOpen(false);
  };

  return (
    <Backdrop
      open={open}
      onClick={(event: React.MouseEvent) => closeOnOverlay(event)}
    >
      <Dialog
        open={open}
        onClose={() => {
          loading !== CREATE && setOpen(false);
        }}
        PaperComponent={Paper}
      >
        <DialogTitle>
          Create Memo
          <CloseButton onClick={() => onCloseHandler()} />
        </DialogTitle>

        <Box component="form" onSubmit={handleSubmit(addMemoHandler)}>
          <DialogContent dividers>
            <TextField
              variant="outlined"
              type="text"
              multiline
              rows={5}
              autoFocus={true}
              inputProps={{ minLength: 1, maxLength: Constants.CHARLIMIT }}
              value={input}
              placeholder="Add your memo note..."
              label={
                input.length > 0
                  ? `${input.length} /  ${Constants.CHARLIMIT}`
                  : `0 / ${Constants.CHARLIMIT}`
              }
              error={input.length === Constants.CHARLIMIT}
              {...register(CREATE_INPUT)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              endIcon={
                loading === CREATE ? (
                  <CircularProgress size={20} />
                ) : (
                  <SendIcon />
                )
              }
              disabled={
                input.replace(/\s+/g, "").length === 0 || loading !== null
              }
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Backdrop>
  );
};

export default Create;
