import { useDispatch, useSelector } from "react-redux";
import * as Constants from "../../utils/constants";
import { MemosData } from "../../types/types";
import { apiRequest } from "../../api/apiRequest";
import { memoActions } from "../../store";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm, useWatch } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  DialogContent,
  TextField,
  DialogActions,
  CustomButton,
} from "./Details.styles";

const EDIT_INPUT = "EDIT_INPUT";

interface Props {
  id: number;
  status: "pending" | "completed";
  title: string;
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditForm = ({ showEdit, setShowEdit, title, id, status }: Props) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootStore) => state.memo);
  const {
    editMemo,
    setLoading,
    LoadingsTypes: { EDIT },
  } = memoActions;

  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      [EDIT_INPUT]: title,
    },
  });
  const editInput = useWatch({ control, name: EDIT_INPUT });

  const editMemoHandler = async () => {
    if (loading) return;
    if (title === editInput) {
      return setShowEdit(false);
    }
    dispatch(setLoading(EDIT));

    const data: MemosData = {
      id: id,
      title: editInput,
      status: status,
      due_on: new Date().toString(),
    };
    try {
      const req = await apiRequest("PUT", id, data);
      if (req.status === 200 && req.statusText === "OK") {
        dispatch(editMemo(data, id));
        dispatch(setLoading(null));
        setShowEdit(false);
      }
    } catch (error) {
      dispatch(setLoading(null));
    }
  };

  const spinner = <CircularProgress size={20} color="inherit" />;
  return (
    <Box component="form" onSubmit={handleSubmit(editMemoHandler)}>
      <DialogContent>
        <TextField
          variant="outlined"
          multiline
          rows={5}
          autoFocus={true}
          value={editInput}
          inputProps={{ minLength: 1, maxLength: Constants.CHARLIMIT }}
          label={
            editInput.length > 0
              ? `${editInput.length} /  ${Constants.CHARLIMIT}`
              : ""
          }
          error={editInput.length === Constants.CHARLIMIT}
          {...register(EDIT_INPUT)}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
        />
      </DialogContent>
      <DialogActions>
        <CustomButton
          variant="contained"
          color="error"
          type="button"
          onClick={() => {
            setShowEdit(false);
          }}
          endIcon={<CancelIcon />}
        >
          cancel
        </CustomButton>
        <CustomButton
          variant="contained"
          color="primary"
          type="submit"
          // onClick={() => editMemoHandler(id, input)}
          endIcon={loading !== EDIT && <SendIcon />}
          // disabled={input.length === 0}
        >
          {loading === EDIT ? spinner : "save"}
        </CustomButton>
      </DialogActions>
    </Box>
  );
};

export default EditForm;
