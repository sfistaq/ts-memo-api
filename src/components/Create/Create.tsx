import type { AddMemoData } from "../../@types/memo";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { apiRequest } from "../../api";
import { memoActions } from "../../store";
import { STATUS } from "../../helpers";
import { useFetchMemos } from "../../hooks";
import { Paper, Dialog, CircularProgress, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import * as Constants from "../../helpers";
import * as S from "./Create.styles";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Create = ({ open, setOpen }: Props) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootStore) => state.memo);
  const { fetchMemos } = useFetchMemos();
  const {
    INPUTS: { CREATE_INPUT },
  } = Constants;
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
      await apiRequest("POST", undefined, memoData);
      await fetchMemos();
      setOpen(false);
    } catch (error) {
      toast.error(
        "Server error. Unable to create memo, please try again later."
      );
      setOpen(false);
    } finally {
      dispatch(setLoading(null));
    }
  };

  const onCloseHandler = () => {
    loading !== CREATE && setOpen(false);
  };

  return (
    <S.Backdrop
      data-testid="backdrop"
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
        <S.DialogTitle>
          Create Memo
          <S.CloseButton onClick={() => onCloseHandler()} />
        </S.DialogTitle>

        <Box component="form" onSubmit={handleSubmit(addMemoHandler)}>
          <S.DialogContent dividers>
            <S.TextField
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
          </S.DialogContent>
          <S.DialogActions>
            <S.Button
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
            </S.Button>
          </S.DialogActions>
        </Box>
      </Dialog>
    </S.Backdrop>
  );
};

export default Create;
