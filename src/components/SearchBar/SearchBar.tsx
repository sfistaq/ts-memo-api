import React, { useEffect, memo } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import CreateIcon from "@mui/icons-material/Create";
import { Form, TextField, Button } from "./SearchBar.styles";

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
  useEffect(() => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      event.key === "Escape" && setCreateModalOpen(false);
    });
    return () => {
      document.removeEventListener("keydown", (event: KeyboardEvent) => event);
    };
  }, [createModalOpen, setCreateModalOpen]);

  return (
    <Form
      component="form"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      }}
      onKeyPress={(event: React.KeyboardEvent<HTMLFormElement>) => {
        event.key === "Enter" && event.preventDefault();
      }}
    >
      <TextField
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
    </Form>
  );
};

export default memo(SearchBar);
