import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MemosData } from "../../types/types";
import useFetchMemos from "../../hooks/useFetchMemos";
import { apiRequest } from "../../api/apiRequest";
import { memoActions } from "../../store";
import Details from "../Details/Details";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CircularProgress from "@mui/material/CircularProgress";
import {
  MemoItemWrapper,
  Complete,
  Title,
  DateWrapper,
  DateText,
  EditButtonsWrapper,
  EditIcon,
  DeleteIcon,
  ModalWrapper,
} from "./MemoItem.styles";

const MemoItem = ({ id, title, due_on, status }: MemosData) => {
  const [open, setOpen] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [sliceText, setSliceText] = useState<number>(150);
  const { fetchMemos } = useFetchMemos();
  const dispatch = useDispatch();
  const [completeMemoID, setCompleteMemoID] = useState<number | null>(null);
  const [deleteMemoID, setDeleteMemoId] = useState<number | null>(null);

  const { loading } = useSelector((state: RootStore) => state.memo);

  const {
    LoadingsTypes: { COMPLETE, DELETE },
    setLoading,
    removeMemo,
    completeMemo,
  } = memoActions;

  const completeMemoHandler = async (id: number, status: string) => {
    if (loading) return;
    setCompleteMemoID(id);
    dispatch(setLoading(COMPLETE));

    const data: MemosData = {
      id: id,
      status: status === "pending" ? "completed" : "pending",
      title: title,
      due_on: new Date().toString(),
    };
    try {
      const req = await apiRequest("PUT", id, data);

      if (req.status === 200 && req.statusText === "OK") {
        dispatch(completeMemo(data, id));
        dispatch(setLoading(null));
        setCompleteMemoID(null);
      }
    } catch (error) {
      dispatch(setLoading(null));
    }
  };

  const removeMemoHandler = async (id: number) => {
    if (loading) return;
    setDeleteMemoId(id);
    dispatch(setLoading(DELETE));

    try {
      const req = await apiRequest("DELETE", id);
      if (req.status === 204) {
        dispatch(removeMemo(id));
        fetchMemos();
        dispatch(setLoading(null));
        setDeleteMemoId(null);
        setOpen(false);
      }
    } catch (error) {
      dispatch(setLoading(null));
    }
  };

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

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
    <MemoItemWrapper status={status}>
      <Complete>
        <IconButton
          size="small"
          onClick={() => completeMemoHandler(id, status)}
        >
          {status === "completed" && id !== completeMemoID && <CheckBoxIcon />}
          {status === "pending" && id !== completeMemoID && (
            <CheckBoxOutlineBlankIcon />
          )}
          {loading === COMPLETE && id === completeMemoID && spinner}
        </IconButton>
      </Complete>
      <Title status={status}>
        <Typography onDoubleClick={() => setOpen(true)}>
          {title.length < sliceText
            ? title
            : `${title.slice(0, sliceText)} ...`}
        </Typography>
      </Title>
      <DateWrapper status={status}>
        <DateText>{new Date(`${due_on}`).toLocaleDateString()}</DateText>
        <DateText>{new Date(`${due_on}`).toLocaleTimeString()}</DateText>
      </DateWrapper>
      <EditButtonsWrapper>
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => removeMemoHandler(id)}>
          {loading === DELETE && deleteMemoID === id && spinner}
          {deleteMemoID !== id && <DeleteIcon />}
        </IconButton>
      </EditButtonsWrapper>
      <ModalWrapper>
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
      </ModalWrapper>
    </MemoItemWrapper>
  );
};

export default memo(MemoItem);
