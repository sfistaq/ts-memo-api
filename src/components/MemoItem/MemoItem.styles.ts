import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

interface Props {
  status: "pending" | "completed";
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: "flex",
      alignItems: "center",
      height: "100px",
      maxHeight: "100px",
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
      [theme.breakpoints.down("xs")]: {
        height: "90px",
      },
    },
    completeItem: {
      display: "flex",
      justifyContent: "center",
      flex: 0.05,
      width: "6%",
      border: "none",
    },

    titleItem: {
      flex: 0.8,
      border: "none",
      wordBreak: "break-word",
      padding: theme.spacing(1),
      textDecoration: (props: Props) =>
        props.status === "pending" ? "none" : "line-through",
      color: (props: Props) =>
        props.status === "pending"
          ? theme.palette.text.primary
          : theme.palette.text.disabled,
      "& p": {
        [theme.breakpoints.down("xs")]: {
          fontSize: "14px",
        },
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0.5),
      },
    },
    dateItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 0.05,
      border: "none",
      padding: 0,
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
      justifyContent: "center",
      flex: 0.1,
      border: "none",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        padding: theme.spacing(0.8),
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
