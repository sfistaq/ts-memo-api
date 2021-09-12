import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-evenly",
      backgroundColor: "rgba(245,245,245, 0.5)",
      padding: theme.spacing(2),
      borderTopLeftRadius: "15px",
      borderTopRightRadius: "15px",
    },
    textfiled: {
      width: "70%",
      background: theme.palette.background.paper,
      borderRadius: "5px",
      border: "none",
      outline: "none",
      [theme.breakpoints.down("xs")]: {
        width: "60%",
      },
    },
  })
);

export default useStyles;
