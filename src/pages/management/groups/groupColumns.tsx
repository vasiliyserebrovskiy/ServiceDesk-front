import type { GroupList } from "../../../shared/types/groupsTypes";

export const groupColumns = [
  {
    title: "Name",
    render: (group: GroupList) => group.name,
  },
  {
    title: "Description",
    render: (group: GroupList) => group.description,
  },
];
// I think that we need to truncate description in future
