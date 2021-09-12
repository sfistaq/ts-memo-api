import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      backgroundColor: "rgba(245,245,245, 0.5)",
      display: "flex",
      width: "100%",
      justifyContent: "center",
      borderBottomRightRadius: "15px",
      borderBottomLeftRadius: "15px",
      color: theme.palette.primary.main,
      "& p": {
        fontWeight: theme.typography.fontWeightBold,
      },
      "& select": {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  })
);

export default useStyles;
