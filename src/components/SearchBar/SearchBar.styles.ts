import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "100%",
      padding: theme.spacing(2),
      backgroundColor: "rgba(245,245,245, 0.5)",
      borderTopLeftRadius: "15px",
      borderTopRightRadius: "15px",
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1),
      },
    },
    textfiled: {
      width: "70%",
      background: theme.palette.background.paper,
      borderRadius: "5px",
      border: "none",
      outline: "none",
      [theme.breakpoints.down("xs")]: {
        width: "60%",
        "& input": {
          padding: theme.spacing(2),
          fontSize: "14px",
        },
      },
    },
    button: {
      [theme.breakpoints.down("xs")]: {
        height: "40px",
        width: "100px",
        fontSize: "13px",
      },
    },
  })
);

export default useStyles;
