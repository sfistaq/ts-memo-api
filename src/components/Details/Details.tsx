import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MemosData } from "../../types/types";
import { apiRequest } from "../../api/apiRequest";
import { memoActions } from "../../store";
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
  status: "pending" | "completed";
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
  const [input, setInput] = useState<string>("");
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootStore) => state.memo);
  const {
    editMemo,
    setLoading,
    LoadingsTypes: { DELETE, EDIT, COMPLETE },
  } = memoActions;

  //! export do utils to samo co w create
  const closeOnOverlay = (event: React.MouseEvent) => {
    if ((event.target as Element).classList.contains("MuiBackdrop-root")) {
      setOpen(false);
    }
  };

  const openEditTextarea = () => {
    setShowEdit(true);
    setInput(title);
  };

  const editMemoHandler = async (id: number, input: string) => {
    if (loading) return;
    dispatch(setLoading(EDIT));
    if (title === input) {
      return setShowEdit(false);
    }
    const data: MemosData = {
      id: id,
      title: input,
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
    <Backdrop
      open={open}
      onClick={(event: React.MouseEvent) => closeOnOverlay(event)}
      onKeyPress={(event: React.KeyboardEvent) => {
        event.key === "Enter" && editMemoHandler(id, input);
      }}
    >
      <Dialog open={open} onClose={() => setOpen(false)} PaperComponent={Paper}>
        <DialogTitle>
          {showEdit ? "Edit Memo" : "Memo Details"}
          <CloseButton onClick={() => setOpen(false)} />
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
                  color={status === "pending" ? "success" : "warning"}
                  variant="contained"
                  onClick={() => completeMemoHandler(id, status)}
                  endIcon={
                    loading !== COMPLETE ? (
                      status === "pending" ? (
                        <DoneIcon />
                      ) : (
                        <RestoreIcon />
                      )
                    ) : null
                  }
                >
                  {loading === COMPLETE && spinner}
                  {loading !== COMPLETE && status === "pending" && "complete"}
                  {loading !== COMPLETE && status === "completed" && "pending"}
                </CustomButton>
              </>
            </DialogActions>
          </>
        )}
        {showEdit && (
          <EditForm
            showEdit={showEdit}
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
