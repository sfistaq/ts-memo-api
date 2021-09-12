import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backdropFilter: "blur(3px)",
    },
    dialogContent: {
      minHeight: "200px",
      display: "flex",
      alignItems: "center",
    },

    textarea: {
      width: "500px",
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
    title: {
      background: theme.palette.grey[200],
      color: theme.palette.primary.main,
    },
    dialogActions: {
      background: theme.palette.grey[200],
    },
    button: {
      marginRight: theme.spacing(2),
    },
  })
);

export default useStyles;
