import { MemoByStatus } from "../../types/types";
import { FilterType } from "../../types/enums";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ScheduleIcon from "@mui/icons-material/Schedule";

export const bottomButtons: MemoByStatus[] = [
  {
    id: 1,
    name: "All",
    sortProperty: FilterType.All,
    icon: <FormatListBulletedIcon />,
  },
  {
    id: 2,
    name: "Active",
    sortProperty: FilterType.Active,
    icon: <ScheduleIcon />,
  },
  {
    id: 3,
    name: "Completed",
    sortProperty: FilterType.Completed,
    icon: <AssignmentTurnedInIcon />,
  },
];
