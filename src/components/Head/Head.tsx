import type { MemosData, HeadData } from "../../@types/memo";
import React, { memo } from "react";
import { TableHead, TableSortLabel } from "@mui/material";
import * as S from "./HeadStyles";

interface Props {
  sortByProperty: keyof MemosData;
  setSortByProperty: React.Dispatch<React.SetStateAction<keyof MemosData>>;
  sortDirection: boolean;
  setSortDirection: React.Dispatch<React.SetStateAction<boolean>>;
}

const Head = ({
  sortByProperty,
  setSortByProperty,
  sortDirection,
  setSortDirection,
}: Props) => {
  const sortDirectionHandler = (sortBy: keyof MemosData) => {
    setSortDirection((prev: boolean) => !prev);
    setSortByProperty(sortBy);
  };

  const sortDirectionIndicator = (sortBy: keyof MemosData) => {
    return sortByProperty === sortBy && sortDirection ? "asc" : "desc";
  };

  const sortLabel = (name: keyof MemosData) => (
    <TableSortLabel
      active={sortByProperty === name}
      direction={sortDirectionIndicator(name)}
    />
  );

  const headData: HeadData[] = [
    {
      id: 1,
      title: "status",
      jsx: (
        <S.Status>
          status
          {sortLabel("status")}
        </S.Status>
      ),
    },
    {
      id: 2,
      title: "title",
      jsx: (
        <S.Title>
          title
          {sortLabel("title")}
        </S.Title>
      ),
    },
    {
      id: 3,
      title: "due_on",
      jsx: (
        <S.Date>
          create date
          {sortLabel("due_on")}
        </S.Date>
      ),
    },
  ];

  return (
    <TableHead component="thead">
      <S.HeadWrapper>
        {headData.map(({ jsx, id, title }: HeadData) => {
          return React.cloneElement(jsx, {
            key: id,
            onClick: () => {
              sortDirectionHandler(title);
            },
          });
        })}
      </S.HeadWrapper>
    </TableHead>
  );
};

export default memo(Head);
