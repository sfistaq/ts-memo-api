export const sortArrayOfObjHelper = <T>(
  arr: T[],
  sortBy: keyof T,
  sortDirection: boolean
) => {
  const sorted = [...arr].sort((a: T, b: T) => {
    return a[sortBy]! > b[sortBy]! ? 1 : -1;
  });
  return sortDirection ? sorted : sorted.reverse();
};
