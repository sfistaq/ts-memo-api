import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { MemosData } from "../../types/types";
import * as Constants from "../../utils/constants";
import { memoActions } from "../../store";
import { apiRequest } from "../../api/apiRequest";
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

const CREATE_INPUT = "CREATE_INPUT";

const Create = ({ open, setOpen }: Props) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootStore) => state.memo);
  const { fetchMemos } = useFetchMemos();
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
    if ((event.target as Element).classList.contains("MuiBackdrop-root")) {
      setOpen(false);
    }
  };

  const addMemoHandler = async () => {
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
        fetchMemos();
        setOpen(false);
        dispatch(setLoading(null));
      }
    } catch (error) {
      dispatch(setLoading(null));
      console.error(error);
    }
  };

  const inputLabel =
    input.length > 0
      ? `${input.length} /  ${Constants.CHARLIMIT}`
      : `0 / ${Constants.CHARLIMIT}`;

  return (
    <Backdrop
      open={open}
      onClick={(event: React.MouseEvent) => closeOnOverlay(event)}
    >
      <Dialog open={open} onClose={() => setOpen(false)} PaperComponent={Paper}>
        <DialogTitle>
          Create Memo
          <CloseButton onClick={() => setOpen(false)} />
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
              label={inputLabel}
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
