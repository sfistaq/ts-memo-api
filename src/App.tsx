import React, { useCallback, useEffect } from "react";

//REDUX
import { useDispatch } from "react-redux";
import * as Actions from "./store/actions/actionsIndex";

//MUI
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline"; // GLOBAL RESET
import useStyles from "./styles/global";

//COMPONENTS
import MemosList from "./components/MemosList/MemosList";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  //DOWNLOAD MEMOS ON INIT
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
}

export default App;
