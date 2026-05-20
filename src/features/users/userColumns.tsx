import type { UsersList } from "../../shared/types/usersTypes";

export const userColumns = [
  {
    title: "Email",
    render: (user: UsersList) => user.email,
  },
  {
    title: "Name",
    render: (user: UsersList) => user.name,
  },

  {
    title: "Role",
    render: (user: UsersList) => user.roleName,
  },
  {
    title: "Active",
    render: (user: UsersList) => (user.isActive ? "Yes" : "No"),
  },
  {
    title: "Blocked",
    render: (user: UsersList) => (user.isBlocked ? "Yes" : "No"),
  },
];
