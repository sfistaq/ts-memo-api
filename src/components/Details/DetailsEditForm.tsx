import * as Constants from "../../helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { MemosData, StatusType } from "../../types/types";
import { apiRequest } from "../../api/apiRequest";
import { memoActions } from "../../store";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import {
  DialogContent,
  TextField,
  DialogActions,
  CustomButton,
} from "./Details.styles";
import { INPUTS } from "../../helpers";

interface Props {
  id: number;
  status: StatusType;
  title: string;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailsEditForm = ({ setShowEdit, title, id, status }: Props) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootStore) => state.memo);
  const { EDIT_INPUT } = INPUTS;
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
            !loading && setShowEdit(false);
          }}
          endIcon={<CancelIcon />}
        >
          cancel
        </CustomButton>
        <CustomButton
          variant="contained"
          color="primary"
          type="submit"
          endIcon={loading !== EDIT && <SendIcon />}
          disabled={editInput.length === 0}
        >
          {loading === EDIT ? spinner : "save"}
        </CustomButton>
      </DialogActions>
    </Box>
  );
};

export default DetailsEditForm;
