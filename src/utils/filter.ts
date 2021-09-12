import { MemosData } from "../types/types";
import { FilterType } from "../types/enums";

const filterHelper = (data: MemosData[], searchInput: string) => {
  return data.filter(
    (item: MemosData) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase()) && item
  );
};

export const filterMemoByStatus = (
  data: MemosData[],
  filterBy: FilterType,
  searchInput: string
) => {
  switch (filterBy) {
    case (filterBy = FilterType.All): {
      return filterHelper(data, searchInput);
    }
    case (filterBy = FilterType.Active): {
      //prettier-ignore
      const pendingData = data.filter((item: MemosData) => item.status === "pending");
      return filterHelper(pendingData, searchInput);
    }
    case (filterBy = FilterType.Completed): {
      //prettier-ignore
      const completedData =  data.filter((item: MemosData) => item.status === "completed")
      return filterHelper(completedData, searchInput);
    }
    default:
      return data;
  }
};
