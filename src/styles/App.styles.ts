import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import background from "../assets/images/background.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      display: "flex",
      alignItems: "center",
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      minHeight: "100vh",
      minWidth: "100vw",
      "@media (max-width:499px)": {
        paddingTop: theme.spacing(1),
        alignItems: "start",
      },
    },
    container: {
      borderRadius: "15px",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      backgroundColor: "rgba(245,245,245, 0.2)",
      "@media (max-width:499px)": {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    },
    table: {
      display: "flex",
      flexDirection: "column",
    },
    pagination: {
      display: "flex",
      width: "100%",
    },
  })
);

export default useStyles;
