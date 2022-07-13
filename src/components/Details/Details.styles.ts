import styled from "@mui/styled-engine-sc";
import CloseIcon from "@mui/icons-material/Close";
import {
  Backdrop as MuiBackdrop,
  Box,
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogContentProps,
  TextField as MuiTextField,
  TextFieldProps,
  Typography,
  TypographyProps,
  DialogActions as MuiDialogActions,
  Button,
  ButtonProps,
} from "@mui/material";

export const Backdrop = styled(MuiBackdrop)`
  z-index: ${({ theme: { zIndex } }) => zIndex.drawer + 1};
  backdrop-filter: blur(3px);
`;
export const Dialog = styled(MuiDialog)`
  backdrop-filter: blur(3px);
  background: ${({ theme: { palette } }) => palette.background.dialog};
`;

export const DialogTitle = styled(MuiDialogTitle)`
  background: ${({ theme: { palette } }) => palette.grey[200]};
  color: ${({ theme: { palette } }) => palette.primary.main};
`;

export const DialogContent = styled(MuiDialogContent)<DialogContentProps>`
  min-height: 250px;
  display: flex;
`;
export const TextField = styled(MuiTextField)<TextFieldProps>`
  width: 500px;
  margin: 5% 0;
`;

export const DialogContentText = styled(Box)`
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
  color: ${({ theme: { palette } }) => palette.text.primary};
`;

export const StatusText = styled(Typography)<TypographyProps>`
  flex: 0.1;
  font-size: 14px;
  color: ${({ theme: { palette } }) => palette.text.hint};
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

export const DialogActions = styled(MuiDialogActions)`
  display: flex;
  justify-content: space-around;
  background: ${({ theme: { palette } }) => palette.grey[200]};
`;

export const CustomButton = styled(Button)<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 120px;
`;
