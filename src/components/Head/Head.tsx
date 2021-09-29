import React, { memo } from "react";
import { MemosData } from "../../types/types";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";

import { HeadWrapper, Status, Title, Date } from "./HeadStyles";

interface Props {
  sortByProperty: keyof MemosData;
  setSortByProperty: React.Dispatch<React.SetStateAction<keyof MemosData>>;
  sortDirection: boolean;
  setSortDirection: React.Dispatch<React.SetStateAction<boolean>>;
}

//  interface HeadData {
//   id: number;
//   title: keyof MemosData;
//   jsx: React.JSX;
// }

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

  return (
    <TableHead component="thead">
      <HeadWrapper>
        <Status onClick={() => sortDirectionHandler("status")}>
          status
          <TableSortLabel
            active={sortByProperty === "status"}
            direction={sortDirectionIndicator("status")}
          />
        </Status>
        <Title onClick={() => sortDirectionHandler("title")}>
          title
          <TableSortLabel
            active={sortByProperty === "title"}
            direction={sortDirectionIndicator("title")}
          />
        </Title>
        <Date onClick={() => sortDirectionHandler("due_on")}>
          create date
          <TableSortLabel
            active={sortByProperty === "due_on"}
            direction={sortDirectionIndicator("due_on")}
          />
        </Date>
      </HeadWrapper>
    </TableHead>
  );
};

export default memo(Head);
