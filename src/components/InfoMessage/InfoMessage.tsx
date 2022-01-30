import { memo } from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { Message } from "./InfoMessage.styles";

interface Props {
  message: string;
  icon: JSX.Element;
}

const InfoMessage = ({ message, icon }: Props) => {
  return (
    <Message>
      <TableCell>
        {icon}
        <Typography>{message}</Typography>
      </TableCell>
    </Message>
  );
};

export default memo(InfoMessage);
