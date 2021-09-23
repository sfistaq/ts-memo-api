import styled from "@mui/styled-engine-sc";
import { MuiTheme } from "../../types/types";
import TableRow from "@mui/material/TableRow";
import Button, { ButtonProps } from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";

export const Container = styled(TableRow)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(245, 245, 245, 0.5);
  padding: ${(props: MuiTheme) => props.theme.spacing(1.2)};

  ${(props: MuiTheme) => props.theme.breakpoints.down("md")} {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }

  ${(props: MuiTheme) => props.theme.breakpoints.down("xs")} {
    padding: ${(props: MuiTheme) => props.theme.spacing(1)};
  }

  @media (max-width: 450px) {
    padding: ${(props: MuiTheme) => props.theme.spacing(0.4)};
  }
`;

export const Btn = styled(Button)<ButtonProps>`
  min-width: 110px;

  ${(props: MuiTheme) => props.theme.breakpoints.down("md")} {
    min-width: 180px;
  }

  ${(props: MuiTheme) => props.theme.breakpoints.down("sm")} {
    font-size: 12px;
    min-width: 130px;
  }
`;

export const Wrapper = styled(TableCell)`
  border: none;
`;
