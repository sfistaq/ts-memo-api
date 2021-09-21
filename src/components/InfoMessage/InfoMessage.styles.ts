import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "500px",
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
        minHeight: "450px",
      },
    },
  })
);

export default useStyles;
