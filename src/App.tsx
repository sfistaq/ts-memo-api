import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "./store/actions/actionsIndex";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./styles/global";
import MemosList from "./components/MemosList/MemosList";

const App: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onInitMemos = useCallback(
    () => dispatch(Actions.fetchMemos()),
    [dispatch]
  );
  useEffect(() => {
    onInitMemos();
  }, [onInitMemos]);

  return (
    <Container className={classes.app} component="main">
      <CssBaseline />
      <MemosList />
    </Container>
  );
};

export default App;
