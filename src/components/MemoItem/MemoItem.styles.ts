import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

interface Props {
  status: "pending" | "completed";
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      minHeight: "80px",
      maxHeight: "100px",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid black",
      transition: "all 0.3s ease",
      background: (props: Props) =>
        props.status === "pending"
          ? "rgba(245,245,245, 0.8)"
          : theme.palette.grey[600],

      "&:hover": {
        background: (props: Props) =>
          props.status === "pending"
            ? theme.palette.grey[100]
            : theme.palette.grey[500],
      },
    },
    completeItem: {
      flex: 0.05,
      display: "flex",
      justifyContent: "center",
      width: "6%",
      border: "none",
    },

    titleItem: {
      flex: 0.8,
      border: "none",
      wordBreak: "break-word",
      textDecoration: (props: Props) =>
        props.status === "pending" ? "none" : "line-through",
      color: (props: Props) =>
        props.status === "pending"
          ? theme.palette.text.primary
          : theme.palette.text.disabled,
    },
    dateItem: {
      flex: 0.05,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "none",
      textDecoration: (props: Props) =>
        props.status === "pending" ? "none" : "line-through",
      color: (props: Props) =>
        props.status === "pending"
          ? theme.palette.text.primary
          : theme.palette.text.disabled,
    },
    dateText: {
      fontSize: 12,
      color: theme.palette.text.secondary,
      [theme.breakpoints.down("xs")]: {
        fontSize: 10,
      },
    },

    editButtons: {
      display: "flex",
      flex: 0.1,
      justifyContent: "center",
      border: "none",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    modalCell: { border: "none", display: "none" },
    red: {
      "&:hover": {
        color: theme.palette.error.main,
      },
    },
    blue: {
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  })
);

export default useStyles;
