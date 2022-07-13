import { memo } from "react";
import { TableCell, Typography } from "@mui/material";
import * as S from "./InfoMessage.styles";

interface InfoMessageProps {
  message: string;
  icon: JSX.Element;
}

const InfoMessage = ({ message, icon }: InfoMessageProps) => {
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
