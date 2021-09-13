import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

interface Props {
  status: "pending" | "completed";
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
    dialog: {
      backdropFilter: "blur(3px)",
      background: "rgba(0, 0, 0, 0.5)",
    },
    title: {
      background: theme.palette.grey[200],
      color: theme.palette.primary.main,
    },
    dialogContent: {
      minHeight: "250px",
      display: "flex",
    },
    textarea: {
      width: "500px",
      margin: "5% 0",
    },
    dialogContentText: {
      width: "500px",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "center",
      wordBreak: "break-word",
    },
    mainText: {
      margin: "5% 0",
      flex: 0.9,
      fontSize: 18,
      color: theme.palette.text.primary,
    },
    statusText: {
      flex: 0.1,
      color: theme.palette.text.hint,
      fontSize: 14,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.error.main,
      },
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "space-around",
      background: theme.palette.grey[200],
    },
    completePendingButton: {
      background: (props: Props) =>
        props.status === "pending"
          ? theme.palette.success.main
          : theme.palette.warning.main,
      "&:hover": {
        background: (props: Props) =>
          props.status === "pending"
            ? theme.palette.success.dark
            : theme.palette.warning.dark,
      },
    },
  })
);

export default useStyles;
