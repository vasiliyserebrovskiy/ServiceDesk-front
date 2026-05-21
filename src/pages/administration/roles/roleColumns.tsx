import type { Column } from "../../../components/tables/DataTable";
import type { Role } from "../../../shared/types/roleTypes";

export const roleColumns: Column<Role>[] = [
  {
    title: "Name",
    render: (role) => <span className="text-gray-800">{role.displayName}</span>,
  },

  {
    title: "Description",
    render: (role) => <span className="text-gray-600">{role.description}</span>,
  },

  {
    title: "Default",
    render: (role) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          role.defaultRole
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {role.defaultRole ? "Yes" : "No"}
      </span>
    ),
  },
];
