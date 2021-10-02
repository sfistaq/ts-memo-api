import React, { memo } from "react";
import { MemosData, HeadData } from "../../types/types";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import { HeadWrapper, Status, Title, Date } from "./HeadStyles";

interface Props {
  sortByProperty: keyof MemosData;
  setSortByProperty: React.Dispatch<React.SetStateAction<keyof MemosData>>;
  sortDirection: boolean;
  setSortDirection: React.Dispatch<React.SetStateAction<boolean>>;
}

const Head: React.FC<Props> = ({
  sortByProperty,
  setSortByProperty,
  sortDirection,
  setSortDirection,
}) => {
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
        <Status>
          status
          {sortLabel("status")}
        </Status>
      ),
    },
    {
      id: 2,
      title: "title",
      jsx: (
        <Title>
          title
          {sortLabel("title")}
        </Title>
      ),
    },
    {
      id: 3,
      title: "due_on",
      jsx: (
        <Date>
          create date
          {sortLabel("due_on")}
        </Date>
      ),
    },
  ];

  return (
    <TableHead component="thead">
      <HeadWrapper>
        {headData.map((item: HeadData) => {
          return React.cloneElement(item.jsx, {
            key: item.id,
            onClick: () => {
              sortDirectionHandler(item.title);
            },
          });
        })}
      </HeadWrapper>
    </TableHead>
  );
};

export default memo(Head);
