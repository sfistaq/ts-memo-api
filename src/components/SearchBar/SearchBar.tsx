import React, { useEffect, memo } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ErrorIcon from "@material-ui/icons/Error";
import CreateIcon from "@material-ui/icons/Create";
import useStyles from "./SearchBar.styles";

interface Props {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  createModalOpen: boolean;
  setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createButtonDisabled: boolean;
}

const SearchBar: React.FC<Props> = ({
  searchInput,
  setSearchInput,
  createModalOpen,
  setCreateModalOpen,
  createButtonDisabled,
}) => {
  const classes = useStyles();

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
      component={"form"}
      className={classes.form}
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
        className={classes.button}
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
