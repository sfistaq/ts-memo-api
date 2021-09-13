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
      padding: theme.spacing(1.5),
      [theme.breakpoints.down("sm")]: {
        display: "grid",
        gridTemplateRows: "repeat(2, 1fr)",
        gridTemplateColumns: "repeat(2, 1fr)",
        justifyItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        "& td": {
          padding: theme.spacing(1),
        },
      },
      "@media (max-width:450px)": {
        padding: theme.spacing(0.4),
      },
    },
    button: {
      minWidth: "120px",
      [theme.breakpoints.down("sm")]: {
        minWidth: "180px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
        minWidth: "130px",
      },
    },
    tableCell: { border: "none" },
  })
);

export default useStyles;
