import React, { useEffect, memo } from "react";

//MUI
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import ErrorIcon from "@material-ui/icons/Error";
import useStyles from "./SearchBar.styles";

interface Props {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  searchInput: string;
  createButtonDisabled: boolean;
  createModalOpen: boolean;
  setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<Props> = ({
  setSearchInput,
  searchInput,
  createButtonDisabled,
  createModalOpen,
  setCreateModalOpen,
}) => {
  const classes = useStyles();

  // CLOSE MODAL ON KEYPRESS "Escape"
  useEffect(() => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      event.key === "Escape" && setCreateModalOpen(false);
    });
    return () => {
      document.removeEventListener("keydown", (event: KeyboardEvent) => event);
    };
  }, [createModalOpen, setCreateModalOpen]);

  return (
    <FormControl
      className={classes.form}
      component={"form"}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      }}
      onKeyPress={(event: React.KeyboardEvent<HTMLFormElement>) => {
        event.key === "Enter" && event.preventDefault();
      }}
    >
      <TextField
        className={classes.textfiled}
        type="search"
        label="search"
        variant="outlined"
        value={searchInput}
        onChange={(
          event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => setSearchInput(event.target.value)}
        inputProps={{ minLength: 1, maxLength: 50 }}
      />

      <Button
        size={createButtonDisabled ? "medium" : "large"}
        variant="contained"
        color="primary"
        onClick={() => setCreateModalOpen(true)}
        endIcon={createButtonDisabled ? <ErrorIcon /> : <CreateIcon />}
        disabled={createButtonDisabled}
      >
        {createButtonDisabled ? "max memos" : "Create"}
      </Button>
    </FormControl>
  );
};

export default memo(SearchBar);
