import React, { useState } from "react";
import { useSelector } from "react-redux";
import { memoActions } from "../../store";
import { STATUS } from "../../types/enums";
import { StatusType } from "../../types/types";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneIcon from "@mui/icons-material/Done";
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import EditForm from "./EditForm";
import {
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  MainText,
  StatusText,
  CloseButton,
  DialogActions,
  CustomButton,
} from "./Details.styles";

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
    <Backdrop
      open={open}
      onClick={(event: React.MouseEvent) => closeOnOverlay(event)}
    >
      <Dialog open={open} onClose={() => setOpen(false)} PaperComponent={Paper}>
        <DialogTitle>
          {showEdit ? "Edit Memo" : "Memo Details"}
          <CloseButton
            onClick={() => {
              !loading && setOpen(false);
            }}
          />
        </DialogTitle>
        {!showEdit && (
          <>
            <DialogContent dividers>
              <DialogContentText>
                <MainText>{title}</MainText>
                <StatusText>
                  status: <strong>{loading ? "loading..." : status}</strong>
                </StatusText>
                <StatusText>
                  created: {new Date(`${due_on}`).toLocaleDateString()}{" "}
                  {new Date(`${due_on}`).toLocaleTimeString()}
                </StatusText>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <>
                <CustomButton
                  variant="contained"
                  color="error"
                  onClick={() => removeMemoHandler(id)}
                  endIcon={loading !== DELETE && <DeleteForeverIcon />}
                >
                  {loading === DELETE ? spinner : "delete"}
                </CustomButton>
                <CustomButton
                  variant="contained"
                  color="primary"
                  onClick={openEditTextarea}
                  endIcon={<EditIcon />}
                >
                  edit
                </CustomButton>
                <CustomButton
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
                </CustomButton>
              </>
            </DialogActions>
          </>
        )}
        {showEdit && (
          <EditForm
            setShowEdit={setShowEdit}
            id={id}
            title={title}
            status={status}
          />
        )}
      </Dialog>
    </Backdrop>
  );
};

export default Details;
