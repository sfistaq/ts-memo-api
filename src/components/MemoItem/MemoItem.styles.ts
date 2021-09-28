import styled from "@mui/styled-engine-sc";
import { MuiTheme } from "../../types/types";
import { TableRow, TableCell, Typography } from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  status: "pending" | "completed";
}

export const MemoItemWrapper = styled(TableRow)<Props>`
  display: flex;
  align-items: center;
  height: 100px;
  max-height: 100px;
  border-bottom: 1px solid black;
  transition: all 0.3s ease;
  cursor: pointer;
  background: ${({ status }: Props) =>
    status === "pending"
      ? "rgba(245,245,245, 0.8)"
      : "#757575"}; //! palette.grey[600]

  &:hover {
    background: ${({ status }: Props) =>
      status === "pending"
        ? `#f5f5f5`
        : "#9e9e9e"}; //! fix theme in ternary palette.grey[100] ? palette.grey[500]
  }

  ${({ theme }: MuiTheme) => theme.breakpoints.down("xs")} {
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

export const Title = styled(TableCell)<Props>`
  flex: 0.8;
  border: none;
  word-break: break-word;
  padding: ${({ theme }: MuiTheme) => theme.spacing(1)};
  text-decoration: ${({ status }: Props) =>
    status === "pending" ? "none" : "line-through"};
  color: ${({ status }: Props) =>
    status === "pending"
      ? "rgba(0,0,0,0.87)"
      : "rgba(0,0,0,0.38)"}; //! fix theme in ternary palette.text.primary / palette.text.disabled

  ${({ theme }: MuiTheme) => theme.breakpoints.down("sm")} {
    padding: ${({ theme }: MuiTheme) => theme.spacing(0.5)};
  }

  & p {
    ${({ theme }: MuiTheme) => theme.breakpoints.down("sm")} {
      font-size: 14px;
    }
  }
`;

export const DateWrapper = styled(TableCell)<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.05;
  border: none;
  padding: none;
  text-decoration: ${({ status }: Props) =>
    status === "pending" ? "none" : "line-through"};
  color: ${({ status }: Props) =>
    status === "pending"
      ? "rgba(0,0,0,0.87)"
      : "rgba(0,0,0,0.38)"}; //! fix theme in ternary palette.text.primary / palette.text.disabled
`;

export const DateText = styled(Typography)`
  font-size: 12px;
  color: ${({ theme }: MuiTheme) => theme.palette.text.secondary};

  ${({ theme }: MuiTheme) => theme.breakpoints.down("sm")} {
    font-size: 10px;
  }
`;

export const EditButtonsWrapper = styled(TableCell)`
  display: flex;
  justify-content: center;
  flex: 0.1;
  border: none;

  ${({ theme }: MuiTheme) => theme.breakpoints.down("sm")} {
    flex-direction: column;
    padding: ${({ theme }: MuiTheme) => theme.spacing(0.8)};
  }
`;

export const EditIcon = styled(PageviewIcon)`
  &:hover {
    color: ${({ theme }: MuiTheme) => theme.palette.primary.main};
  }
`;

export const DeleteIcon = styled(DeleteForeverIcon)`
  &:hover {
    color: ${({ theme }: MuiTheme) => theme.palette.error.main};
  }
`;
export const ModalWrapper = styled(TableCell)`
  border: none;
  display: none;
`;
