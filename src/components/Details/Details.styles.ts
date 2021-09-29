import styled from "@mui/styled-engine-sc";
import { MuiTheme } from "../../types/types";
import {
  Backdrop as MuiBackdrop,
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogContentProps,
  TextField as MuiTextField,
  TextFieldProps,
  DialogContentText as MuiDialogContentText,
  Typography,
  TypographyProps,
  DialogActions as MuiDialogActions,
  Button,
  ButtonProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  status: "pending" | "completed";
}

export const Backdrop = styled(MuiBackdrop)`
  z-index: ${({ theme }: MuiTheme) => theme.zIndex.drawer + 1};
  backdrop-filter: blur(3px);
`;
export const Dialog = styled(MuiDialog)`
  backdrop-filter: blur(3px);
  background: ${({ theme }: MuiTheme) => theme.palette.background.dialog};
`;

export const DialogTitle = styled(MuiDialogTitle)`
  background: ${({ theme }: MuiTheme) => theme.palette.grey[200]};
  color: ${({ theme }: MuiTheme) => theme.palette.primary.main};
`;

export const DialogContent = styled(MuiDialogContent)<DialogContentProps>`
  min-height: 250px;
  display: flex;
`;
export const TextField = styled(MuiTextField)<TextFieldProps>`
  width: 500px;
  margin: 5% 0;
`;

export const DialogContentText = styled(MuiDialogContentText)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 500px;
  word-break: break-word;
`;

export const MainText = styled(Typography)<TypographyProps>`
  margin: 5% 0;
  flex: 0.9;
  font-size: 18px;
  color: ${({ theme }: MuiTheme) => theme.palette.text.primary};
`;

export const StatusText = styled(Typography)<TypographyProps>`
  flex: 0.1;
  font-size: 14px;
  color: ${({ theme }: MuiTheme) => theme.palette.text.hint};
`;

export const CloseButton = styled(CloseIcon)`
  position: absolute;
  right: ${({ theme }: MuiTheme) => theme.spacing(1)};
  top: ${({ theme }: MuiTheme) => theme.spacing(1)};
  color: ${({ theme }: MuiTheme) => theme.palette.grey[500]};
  cursor: pointer;

  &:hover {
    color: ${({ theme }: MuiTheme) => theme.palette.error.main};
  }
`;

export const DialogActions = styled(MuiDialogActions)`
  display: flex;
  justify-content: space-around;
  background: ${({ theme }: MuiTheme) => theme.palette.grey[200]};
`;

export const CompletePendingButton = styled(Button)<ButtonProps & Props>`
  background: ${({ status }: Props) =>
    status === "pending"
      ? "#2e7d32"
      : "#ED6C02"}; //! fix theme in ternary palette.success.main / palette.warning.main

  &:hover {
    background: ${({ status }: Props) =>
      status === "pending"
        ? "#1b5e20"
        : "#e65100"}; //! fix theme in ternary palette.success.dark /palette.warning.dark
  }
`;
