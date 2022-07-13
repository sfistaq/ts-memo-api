import type { Status } from "../../@types/memo";
import styled from "@mui/styled-engine-sc";
import { STATUS } from "../../helpers";
import { TableRow, TableCell, Typography } from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const MemoItemWrapper = styled(TableRow)<Status>`
  display: flex;
  align-items: center;
  height: 100px;
  max-height: 100px;
  border-bottom: 1px solid black;
  cursor: pointer;
  transition: all 0.4s ease;
  background: ${({ status, theme: { palette } }) =>
    status === STATUS.PENDING ? palette.background.memo : palette.grey[600]};

  &:hover {
    background: ${({ status, theme: { palette } }) =>
      status === STATUS.PENDING ? palette.grey[100] : palette.grey[500]};
  }

  ${({ theme: { breakpoints } }) => breakpoints.down("sm")} {
    height: 90px;
  }
`;

export const Complete = styled(TableCell)`
  display: flex;
  justify-content: center;
  flex: 0.05;
  width: 6%;
  border: none;
`;

export const Title = styled(TableCell)<Status>`
  flex: 0.8;
  border: none;
  word-break: break-word;
  padding: ${({ theme: { spacing } }) => spacing(1)};
  text-decoration: ${({ status }) =>
    status === STATUS.PENDING ? "none" : "line-through"};
  color: ${({ status, theme: { palette } }) =>
    status === STATUS.PENDING ? palette.text.primary : palette.text.disabled};

  ${({ theme: { breakpoints } }) => breakpoints.down("sm")} {
    padding: ${({ theme: { spacing } }) => spacing(0.5)};
  }

  & p {
    ${({ theme: { breakpoints } }) => breakpoints.down("sm")} {
      font-size: 14px;
    }
  }
`;

export const DateWrapper = styled(TableCell)<Status>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.05;
  border: none;
  padding: none;
  text-decoration: ${({ status }) =>
    status === STATUS.PENDING ? "none" : "line-through"};
  color: ${({ status, theme: { palette } }) =>
    status === STATUS.PENDING ? palette.text.primary : palette.text.disabled};
`;

export const DateText = styled(Typography)`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.secondary};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 10px;
  }
`;

export const EditButtonsWrapper = styled(TableCell)`
  display: flex;
  justify-content: center;
  flex: 0.1;
  border: none;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing(0.8)};
  }
`;

export const EditIcon = styled(PageviewIcon)`
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const DeleteIcon = styled(DeleteForeverIcon)`
  &:hover {
    color: ${({ theme }) => theme.palette.error.main};
  }
`;
export const ModalWrapper = styled(TableCell)`
  border: none;
  display: none;
`;
