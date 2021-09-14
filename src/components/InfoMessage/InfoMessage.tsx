import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import useStyles from "./InfoMessage.styles";

interface Props {
  message: string;
  icon: JSX.Element;
}

const InfoMessage: React.FC<Props> = ({ message, icon }) => {
  const classes = useStyles();
  return (
    <TableRow className={classes.message}>
      <TableCell>
        {icon}
        <Typography>{message}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default InfoMessage;
