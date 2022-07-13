import styled from "@mui/styled-engine-sc";

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
  z-index: ${({ theme: { zIndex } }) => zIndex.drawer + 1};
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
  right: ${({ theme: { spacing } }) => spacing(1)};
  top: ${({ theme: { spacing } }) => spacing(1)};
  color: ${({ theme: { palette } }) => palette.grey[500]};
  cursor: pointer;

  &:hover {
    color: ${({ theme: { palette } }) => palette.error.main};
  }
`;
export const DialogTitle = styled(MuiDialogTitle)`
  background: ${({ theme: { palette } }) => palette.grey[200]};
  color: ${({ theme: { palette } }) => palette.primary.main};
`;

export const DialogActions = styled(MuiDialogActions)`
  background: ${({ theme: { palette } }) => palette.grey[200]};
`;

export const Button = styled(MuiButton)<ButtonProps>`
  margin-right: ${({ theme: { spacing } }) => spacing(2)};
`;
