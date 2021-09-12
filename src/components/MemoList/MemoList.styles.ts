import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// MUI
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderRadius: "15px",
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      backgroundColor: "rgba(245,245,245, 0.2)",
    },
    table: {
      display: "flex",
      flexDirection: "column",
    },
    tableBody: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-beetween",
      minHeight: "405px",
      backgroundColor: "rgba(245,245,245, 0.2)",
      [theme.breakpoints.down("xs")]: {
        minHeight: "500px",
      },
    },

    message: {
      display: "flex",
      minHeight: "405px",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: "1px solid black",
      backgroundColor: "rgba(245,245,245, 0.2)",
      "& td": {
        border: "none",
        textAlign: "center",
      },
      "& p": {
        fontSize: "24px",
        fontWeight: 500,
        color: theme.palette.text.hint,
      },
      [theme.breakpoints.down("xs")]: {
        minHeight: "500px",
      },
    },
    pagination: {
      display: "flex",
      width: "100%",
    },
  })
);

export default useStyles;
