import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// MUI
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottom: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: "rgba(245,245,245, 0.5)",
      padding: theme.spacing(0.5),

      [theme.breakpoints.down("sm")]: {
        display: "grid",
        gridTemplateRows: "repeat(2, 1fr)",
        gridTemplateColumns: "repeat(2, 1fr)",
        padding: theme.spacing(0),
        justifyItems: "center",
      },
    },
    button: {
      minWidth: "120px",
      [theme.breakpoints.down("sm")]: {
        minWidth: "180px",
      },
    },

    tableCell: { border: "none" },
  })
);

export default useStyles;
