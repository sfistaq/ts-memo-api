import type { MemosData } from "../../@types/memo";
import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apiRequest } from "../../api";
import { memoActions } from "../../store";
import { STATUS } from "../../helpers";
import { useFetchMemos } from "../../hooks";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Details } from "..";
import { Typography, IconButton, CircularProgress } from "@mui/material";
import * as S from "./MemoItem.styles";

const MemoItem = ({ id, title, due_on, status }: MemosData) => {
  const [open, setOpen] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [sliceText, setSliceText] = useState<number>(150);
  const { fetchMemos } = useFetchMemos();
  const dispatch = useDispatch();
  const [completeMemoID, setCompleteMemoID] = useState<number | null>(null);
  const [deleteMemoID, setDeleteMemoId] = useState<number | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { loading } = useSelector((state: RootStore) => state.memo);

  const {
    LoadingsTypes: { COMPLETE, DELETE },
    setLoading,
    removeMemo,
    completeMemo,
  } = memoActions;

  const completeMemoHandler = async (id: number, status: string) => {
    if (isPending) return;
    setCompleteMemoID(id);
    dispatch(setLoading(COMPLETE));

    const data: MemosData = {
      id: id,
      status: status === STATUS.PENDING ? STATUS.COMPLETED : STATUS.PENDING,
      title: title,
      due_on: new Date().toString(),
    };
    try {
      await apiRequest("PUT", id, data);
      dispatch(completeMemo(data, id));
      setCompleteMemoID(null);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      dispatch(setLoading(null));
    }
  };

  const removeMemoHandler = async (id: number) => {
    if (isPending) return;

    setDeleteMemoId(id);
    dispatch(setLoading(DELETE));

    try {
      await apiRequest("DELETE", id);
      dispatch(removeMemo(id));
      setDeleteMemoId(null);
      setOpen(false);
      await fetchMemos();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      dispatch(setLoading(null));
    }
  };

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    loading && setIsPending(true);
    return () => {
      setIsPending(false);
    };
  }, [loading]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize > 800) {
      setSliceText(150);
    }
    if (windowSize < 800) {
      setSliceText(100);
    }
    if (windowSize < 600) {
      setSliceText(80);
    }
    if (windowSize < 499) {
      setSliceText(60);
    }
  }, [sliceText, windowSize]);

  const spinner = <CircularProgress size={20} color="inherit" />;

  return (
    <S.MemoItemWrapper status={status}>
      <S.Complete>
        <IconButton
          size="small"
          onClick={() => completeMemoHandler(id, status)}
        >
          {status === STATUS.COMPLETED && id !== completeMemoID && (
            <CheckBoxIcon />
          )}
          {status === STATUS.PENDING && id !== completeMemoID && (
            <CheckBoxOutlineBlankIcon />
          )}
          {loading === COMPLETE && id === completeMemoID && spinner}
        </IconButton>
      </S.Complete>
      <S.Title status={status}>
        <Typography onDoubleClick={() => setOpen(true)}>
          {title.length < sliceText
            ? title
            : `${title.slice(0, sliceText)} ...`}
        </Typography>
      </S.Title>
      <S.DateWrapper status={status}>
        <S.DateText>{new Date(`${due_on}`).toLocaleDateString()}</S.DateText>
        <S.DateText>{new Date(`${due_on}`).toLocaleTimeString()}</S.DateText>
      </S.DateWrapper>
      <S.EditButtonsWrapper>
        <IconButton onClick={() => setOpen(true)}>
          <S.EditIcon />
        </IconButton>
        <IconButton onClick={() => removeMemoHandler(id)}>
          {loading === DELETE && deleteMemoID === id && spinner}
          {deleteMemoID !== id && <S.DeleteIcon />}
        </IconButton>
      </S.EditButtonsWrapper>
      <S.ModalWrapper>
        {open && (
          <Details
            id={id}
            title={title}
            status={status}
            due_on={due_on}
            open={open}
            setOpen={setOpen}
            completeMemoHandler={completeMemoHandler}
            removeMemoHandler={removeMemoHandler}
          />
        )}
      </S.ModalWrapper>
    </S.MemoItemWrapper>
  );
};

export default memo(MemoItem);
