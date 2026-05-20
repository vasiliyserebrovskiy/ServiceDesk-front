import type { UsersList } from "../../shared/types/usersTypes";

export const userColumns = [
  {
    title: "First Name",
    render: (user: UsersList) => user.firstname,
  },
  {
    title: "Email",
    render: (user: UsersList) => user.email,
  },
  {
    title: "Role",
    render: (user: UsersList) => user.roleName,
  },
];
