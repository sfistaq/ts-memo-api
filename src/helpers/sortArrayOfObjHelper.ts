import { MemosData } from "../types";

export const sortArrayOfObjHelper = (
  arr: MemosData[],
  sortBy: keyof MemosData,
  sortDirection: boolean
) => {
  const sorted = [...arr].sort((a: MemosData, b: MemosData) => {
    return a[sortBy]! > b[sortBy]! ? 1 : -1;
  });
  return sortDirection ? sorted : sorted.reverse();
};
