import styled from "@mui/styled-engine-sc";
import {
  FormControl,
  FormControlProps,
  TextField as MuiTextField,
  TextFieldProps,
  Button as MuiButton,
  ButtonProps,
} from "@mui/material";

export const Form = styled(FormControl)<FormControlProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: ${({ theme: { spacing } }) => spacing(2)};
  background: ${({ theme: { palette } }) => palette.background.main};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

  ${({ theme: { breakpoints } }) => breakpoints.down("sm")} {
    padding: ${({ theme: { spacing } }) => spacing(1)};
  }
`;

export const TextField = styled(MuiTextField)<TextFieldProps>`
  width: 70%;
  background-color: ${({ theme: { palette } }) => palette.background.paper};
  border-radius: 5px;
  border: none;
  outline: none;

  ${({ theme: { breakpoints } }) => breakpoints.down("sm")} {
    width: 60%;

    & input {
      padding: ${({ theme: { spacing } }) => spacing(2)};
      font-size: 14px;
    }
  }
`;

export const Button = styled(MuiButton)<ButtonProps>`
  ${({ theme: { breakpoints } }) => breakpoints.down("sm")} {
    height: 40px;
    width: 100px;
    font-size: 13px;
    margin-left: ${({ theme: { spacing } }) => spacing(1)};
  }
`;
