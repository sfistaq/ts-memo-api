import React, { useEffect, memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import CreateIcon from "@mui/icons-material/Create";
import ErrorIcon from "@mui/icons-material/Error";
import * as S from "./SearchBar.styles";

interface Props {
  searchInput: string;
  createModalOpen: boolean;
  setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createButtonDisabled: boolean;
  register: UseFormRegisterReturn;
}

const SearchBar = ({
  searchInput,
  createModalOpen,
  setCreateModalOpen,
  createButtonDisabled,
  register,
}: Props) => {
  useEffect(() => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      event.key === "Escape" && setCreateModalOpen(false);
    });
    return () => {
      document.removeEventListener("keydown", (event: KeyboardEvent) => event);
    };
  }, [createModalOpen, setCreateModalOpen]);

  return (
    <S.Form>
      <S.TextField
        type="search"
        label="search"
        variant="outlined"
        value={searchInput}
        inputProps={{ minLength: 1, maxLength: 50 }}
        {...register}
      />
      <S.Button
        size={createButtonDisabled ? "medium" : "large"}
        variant="contained"
        color="primary"
        onClick={() => setCreateModalOpen(true)}
        endIcon={createButtonDisabled ? <ErrorIcon /> : <CreateIcon />}
        disabled={createButtonDisabled}
      >
        {createButtonDisabled ? "max memos" : "Create"}
      </S.Button>
    </S.Form>
  );
};

export default memo(SearchBar);
