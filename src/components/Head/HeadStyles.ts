import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const css = {
  fontSize: "13px",
  paddingTop: "5px",
  paddingBottom: "5px",
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    head: {
      display: "flex",
      backgroundColor: "rgba(245,245,245, 0.5)",
      borderBottom: "1px solid black",
    },
    headStatus: {
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      flex: 0.1,
      border: "none",

      "&:hover": {
        color: theme.palette.primary.main,
      },
      [theme.breakpoints.down("xs")]: {
        ...css,
      },
    },
    headTitle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 0.55,
      border: "none",
      "&:hover": {
        color: theme.palette.primary.main,
      },
      [theme.breakpoints.down("xs")]: {
        ...css,
      },
    },
    headDate: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 0.35,
      border: "none",

      "&:hover": {
        color: theme.palette.primary.main,
      },
      "@media (max-width:800px)": {
        justifyContent: "start",
      },
      [theme.breakpoints.down("sm")]: {
        ...css,
      },
      [theme.breakpoints.down("xs")]: {
        ...css,
        marginRight: "15px",
      },
    },
  })
);

export default useStyles;
