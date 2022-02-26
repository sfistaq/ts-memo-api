import React, { useState } from "react";
import { useSelector } from "react-redux";
import { memoActions } from "../../store";
import { StatusType, STATUS } from "../../types";
import { CircularProgress, Paper } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneIcon from "@mui/icons-material/Done";
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import DetailsEditForm from "./DetailsEditForm";
import * as S from "./Details.styles";

interface Props {
  id: number;
  title: string;
  status: StatusType;
  due_on: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  completeMemoHandler: (id: number, status: string) => Promise<void>;
  removeMemoHandler: (id: number) => Promise<void>;
}

const Details = ({
  id,
  title,
  status,
  due_on,
  open,
  setOpen,
  completeMemoHandler,
  removeMemoHandler,
}: Props) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const { loading } = useSelector((state: RootStore) => state.memo);
  const {
    LoadingsTypes: { DELETE, COMPLETE },
  } = memoActions;

  const closeOnOverlay = (event: React.MouseEvent) => {
    if (
      (event.target as Element).classList.contains("MuiBackdrop-root") &&
      !loading
    ) {
      setOpen(false);
    }
  };

  const openEditTextarea = () => {
    setShowEdit(true);
  };

  const spinner = <CircularProgress size={20} color="inherit" />;

  return (
    <S.Backdrop
      open={open}
      onClick={(event: React.MouseEvent) => closeOnOverlay(event)}
    >
      <S.Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperComponent={Paper}
      >
        <S.DialogTitle>
          {showEdit ? "Edit Memo" : "Memo Details"}
          <S.CloseButton
            onClick={() => {
              !loading && setOpen(false);
            }}
          />
        </S.DialogTitle>
        {!showEdit && (
          <>
            <S.DialogContent dividers>
              <S.DialogContentText>
                <S.MainText>{title}</S.MainText>
                <S.StatusText>
                  status: <strong>{loading ? "loading..." : status}</strong>
                </S.StatusText>
                <S.StatusText>
                  created: {new Date(`${due_on}`).toLocaleDateString()}{" "}
                  {new Date(`${due_on}`).toLocaleTimeString()}
                </S.StatusText>
              </S.DialogContentText>
            </S.DialogContent>
            <S.DialogActions>
              <>
                <S.CustomButton
                  variant="contained"
                  color="error"
                  onClick={() => removeMemoHandler(id)}
                  endIcon={loading !== DELETE && <DeleteForeverIcon />}
                >
                  {loading === DELETE ? spinner : "delete"}
                </S.CustomButton>
                <S.CustomButton
                  variant="contained"
                  color="primary"
                  onClick={openEditTextarea}
                  endIcon={<EditIcon />}
                >
                  edit
                </S.CustomButton>
                <S.CustomButton
                  color={status === STATUS.PENDING ? "success" : "warning"}
                  variant="contained"
                  onClick={() => completeMemoHandler(id, status)}
                  endIcon={
                    loading !== COMPLETE ? (
                      status === STATUS.PENDING ? (
                        <DoneIcon />
                      ) : (
                        <RestoreIcon />
                      )
                    ) : null
                  }
                >
                  {loading === COMPLETE && spinner}
                  {loading !== COMPLETE &&
                    status === STATUS.PENDING &&
                    STATUS.COMPLETED}
                  {loading !== COMPLETE &&
                    status === STATUS.COMPLETED &&
                    STATUS.PENDING}
                </S.CustomButton>
              </>
            </S.DialogActions>
          </>
        )}
        {showEdit && (
          <DetailsEditForm
            setShowEdit={setShowEdit}
            id={id}
            title={title}
            status={status}
          />
        )}
      </S.Dialog>
    </S.Backdrop>
  );
};

export default Details;
