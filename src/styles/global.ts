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
    },
  })
);

export default useStyles;
