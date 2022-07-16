import styled from "@mui/styled-engine-sc";
import { Button as MuiButton, ButtonProps, Box } from "@mui/material";

export const Container = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  background: ${({ theme: { palette } }) => palette.background.main};
  padding: ${({ theme }) => theme.spacing(1.2)};

  ${({ theme: { breakpoints } }) => breakpoints.down("md")} {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }

  ${({ theme: { breakpoints } }) => breakpoints.down("sm")} {
    padding: ${({ theme: { spacing } }) => spacing(1)};
  }

  @media (max-width: 450px) {
    padding: ${({ theme: { spacing } }) => spacing(0.2)};
  }
`;

export const Button = styled(MuiButton)<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 38px;

  ${({ theme: { breakpoints } }) => breakpoints.down("md")} {
    min-width: 180px;
  }

  ${({ theme: { breakpoints } }) => breakpoints.down("sm")} {
    font-size: 12px;
    min-width: 130px;
  }
`;

export const Wrapper = styled(Box)`
  border: none;
`;
