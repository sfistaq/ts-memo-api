import React, { memo } from "react";

import { MemosData, HeadData } from "../../types/types";

import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import useStyles from "./HeadStyles";

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
  const classes = useStyles();

  const headData: HeadData[] = [
    {
      id: 1,
      title: "status",
      class: classes.headStatus,
    },
    {
      id: 2,
      title: "title",
      class: classes.headName,
    },
    {
      id: 3,
      title: "due_on",
      class: classes.headDate,
    },
  ];

  const sortDirectionHandler = (sortBy: keyof MemosData) => {
    setSortDirection((prev: boolean) => !prev);
    setSortByProperty(sortBy);
  };

  const sortDirectionIndicator = (sortBy: keyof MemosData) => {
    return sortByProperty === sortBy && sortDirection ? "asc" : "desc";
  };

  return (
    <TableHead component="thead">
      <TableRow component="tr" className={classes.head}>
        {headData.map((item: HeadData) => (
          <TableCell
            key={item.id}
            className={item.class}
            onClick={() => sortDirectionHandler(item.title)}
          >
            {item.title === "due_on" ? "create date" : item.title}
            <TableSortLabel
              active={sortByProperty === item.title}
              direction={sortDirectionIndicator(item.title)}
            />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default memo(Head);
