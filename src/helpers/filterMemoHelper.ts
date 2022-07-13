import type { MemosData } from "../@types/memo";
import { FilterType } from "../helpers";

const filterHelper = (data: MemosData[], searchInput: string) => {
  return data.filter(
    (item: MemosData) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase()) && item
  );
};

export const filterMemoHelper = (
  data: MemosData[],
  filterBy: FilterType,
  searchInput: string
) => {
  switch (filterBy) {
    case FilterType.All: {
      return filterHelper(data, searchInput);
    }
    case FilterType.Active: {
      const pendingData = data.filter(
        (item: MemosData) => item.status === "pending"
      );
      return filterHelper(pendingData, searchInput);
    }
    case FilterType.Completed: {
      const completedData = data.filter(
        (item: MemosData) => item.status === "completed"
      );
      return filterHelper(completedData, searchInput);
    }
    default:
      return data;
  }
};
