import React, { useState, useEffect, memo } from "react";
import * as Actions from "../../store/actions/actionsIndex";
import { useDispatch } from "react-redux";
import { MemosData } from "../../types/types";
import Details from "../Details/Details";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
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

const MemoItem: React.FC<MemosData> = ({ id, title, due_on, status }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [sliceText, setSliceText] = useState<number>(150);
  const dispatch = useDispatch();

  const completeHandler = (id: number, status: string) => {
    const data = {
      status: status === "pending" ? "completed" : "pending",
      title: title,
      due_on: new Date().toString(),
    };
    dispatch(Actions.fetchComplete(data, id));
  };

  const removeMemoHander = (id: number) => {
    dispatch(Actions.fetchRemove(id));
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

  return (
    <MemoItemWrapper status={status}>
      <Complete>
        <IconButton size="small" onClick={() => completeHandler(id, status)}>
          {status === "completed" ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
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
        <IconButton onClick={() => removeMemoHander(id)}>
          <DeleteIcon />
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
            complete={completeHandler}
          />
        )}
      </ModalWrapper>
    </MemoItemWrapper>
  );
};

export default memo(MemoItem);
