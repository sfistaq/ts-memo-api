import styled from "@mui/styled-engine-sc";
import { MuiTheme } from "../../types/types";
import CloseIcon from "@mui/icons-material/Close";
import {
  Backdrop as MuiBackdrop,
  DialogContent as MuiDialogContent,
  DialogContentProps,
  TextField as MuiTextField,
  TextFieldProps,
  DialogTitle as MuiDialogTitle,
  DialogActions as MuiDialogActions,
  Button as MuiButton,
  ButtonProps,
} from "@mui/material";

export const Backdrop = styled(MuiBackdrop)`
  z-index: ${(props: MuiTheme) => props.theme.zIndex.drawer + 1};
  backdrop-filter: blur(3px);
`;

export const DialogContent = styled(MuiDialogContent)<DialogContentProps>`
  display: flex;
  align-items: center;
  min-height: 200px;
`;

export const TextField = styled(MuiTextField)<TextFieldProps>`
  width: 500px;
`;

export const CloseButton = styled(CloseIcon)`
  position: absolute;
  right: ${(props: MuiTheme) => props.theme.spacing(1)};
  top: ${(props: MuiTheme) => props.theme.spacing(1)};
  color: ${(props: MuiTheme) => props.theme.palette.grey[500]};
  cursor: pointer;

  &:hover {
    color: ${(props: MuiTheme) => props.theme.palette.error.main};
  }
`;
export const DialogTitle = styled(MuiDialogTitle)`
  background: ${(props: MuiTheme) => props.theme.palette.grey[200]};
  color: ${(props: MuiTheme) => props.theme.palette.primary.main};
`;

export const DialogActions = styled(MuiDialogActions)`
  background: ${(props: MuiTheme) => props.theme.palette.grey[200]};
`;

export const Button = styled(MuiButton)<ButtonProps>`
  margin-right: ${(props: MuiTheme) => props.theme.spacing(2)};
`;
