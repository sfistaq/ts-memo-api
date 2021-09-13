import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const css = {
  fontSize: "13px",
  paddingTop: "5px",
  paddingBottom: "5px",
};

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
      [theme.breakpoints.down("xs")]: {
        ...css,
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
      [theme.breakpoints.down("xs")]: {
        ...css,
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
      [theme.breakpoints.down("xs")]: {
        ...css,
      },
    },
  })
);

export default useStyles;
