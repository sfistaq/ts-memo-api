import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "rgba(245,245,245, 0.5)",
      display: "flex",
      borderBottom: "1px solid black",
    },
    headStatus: {
      flex: 0.1,
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    headName: {
      flex: 0.55,
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
    headDate: {
      flex: 0.35,
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "10px",
      "&:hover": {
        color: theme.palette.primary.main,
      },
      "@media (max-width:800px)": {
        justifyContent: "start",
      },
    },
  })
);

export default useStyles;
