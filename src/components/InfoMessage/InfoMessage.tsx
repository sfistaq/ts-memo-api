import { memo } from "react";
import { TableCell, Typography } from "@mui/material";
import * as S from "./InfoMessage.styles";

interface Props {
  message: string;
  icon: JSX.Element;
}

const InfoMessage = ({ message, icon }: Props) => {
  return (
    <S.Message>
      <TableCell>
        {icon}
        <Typography>{message}</Typography>
      </TableCell>
    </S.Message>
  );
};

export default memo(InfoMessage);
