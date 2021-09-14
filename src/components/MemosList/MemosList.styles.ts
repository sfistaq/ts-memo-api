import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderRadius: "15px",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      backgroundColor: "rgba(245,245,245, 0.2)",
    },
    table: {
      display: "flex",
      flexDirection: "column",
    },
    memosList: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-beetween",
      minHeight: "500px",
      backgroundColor: "rgba(245,245,245, 0.2)",
      [theme.breakpoints.down("xs")]: {
        minHeight: "450px",
      },
    },

    pagination: {
      display: "flex",
      width: "100%",
    },
  })
);

export default useStyles;
