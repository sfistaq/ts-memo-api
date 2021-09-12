//TYPES
import { MemoByStatus } from "../../types/types";
import { FilterType } from "../../types/enums";

//MUI ICONS
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ScheduleIcon from "@material-ui/icons/Schedule";

export const memoByStatusButtons: MemoByStatus[] = [
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
