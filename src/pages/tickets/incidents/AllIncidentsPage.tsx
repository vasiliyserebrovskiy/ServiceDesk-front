import { useNavigate } from "react-router-dom";
import { useIncidents } from "../../../shared/hooks/useIncidents";
import { useEffect, useMemo } from "react";
import { useUsers } from "../../../shared/hooks/useUsers";
import { useCategories } from "../../../shared/hooks/useCategories";
import { useStatuses } from "../../../shared/hooks/useStatuses";
import { useGroups } from "../../../shared/hooks/useGroups";
import { DataTable } from "../../../components/tables/DataTable";
import { incidentsColumns } from "./incidentsColumns";
import { priorityLabels } from "../../../shared/types/incidentTypes";
import { useAppSelector } from "../../../app/hooks";

type Props = {
  filter?: "open" | "closed" | "my-open" | "my-closed" | "my-assigned";
};

export default function AllIncidentsPage({ filter }: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const { incidents, loading, loadIncidents } = useIncidents();
  const { users, loadUsers } = useUsers();
  const { categories, loadCategories } = useCategories();
  const { statuses, loadStatuses } = useStatuses();
  const { groups, loadGroups } = useGroups();
  const navigate = useNavigate();

  /**  1. check if incidents list are loaded. If nit load it */
  useEffect(() => {
    loadIncidents();
  }, [loadIncidents]);

  /**  2. Check if we need to load some data from dependency items */
  useEffect(() => {
    const loadDependencies = async () => {
      await Promise.all(
        [
          !users.length && loadUsers(),
          !categories.length && loadCategories(),
          !statuses.length && loadStatuses(),
          !groups.length && loadGroups(),
        ].filter(Boolean),
      );
    };

    loadDependencies();
  }, [
    users.length,
    categories.length,
    statuses.length,
    groups.length,
    loadUsers,
    loadCategories,
    loadStatuses,
    loadGroups,
  ]);

  /**  3 Remap incident */
  const enrichedIncidents = useMemo(() => {
    if (!incidents.length) return [];

    return incidents.map((incident) => {
      const requester = users.find((u) => u.id === incident.requesterId);
      const category = categories.find((c) => c.id === incident.categoryId);
      const status = statuses.find((s) => s.id === incident.statusId);
      const group = groups.find((g) => g.id === incident.groupId);
      const assignee = users.find((u) => u.id === incident.assigneeId);

      return {
        ...incident,
        requesterName: requester
          ? `${requester.firstname} ${requester.lastname}`
          : "(empty)",
        categoryName: category?.name ?? "(empty)",
        statusName: status?.name ?? "(empty)",
        groupName: group?.name ?? "(empty)",
        assigneeName: assignee
          ? `${assignee.firstname} ${assignee.lastname}`
          : "(empty)",
        priorityLabel: priorityLabels[incident.priority] ?? incident.priority,
        openDate: new Date(incident.createdAt).toLocaleString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };
    });
  }, [incidents, users, categories, statuses, groups]);

  /** 4 Loading state */
  if (loading) {
    return <div>Loading incidents...</div>;
  }

  const filtered = enrichedIncidents.filter((i) => {
    if (filter === "open") return i.statusName !== "Closed";
    if (filter === "closed") return i.statusName === "Closed";
    if (filter === "my-open")
      return i.requesterId === user?.id && i.statusName !== "Closed";
    if (filter === "my-closed")
      return (
        (i.requesterId === user?.id || i.assigneeId === user?.id) &&
        i.statusName === "Closed"
      );
    if (filter === "my-assigned")
      return i.assigneeId === user?.id && i.statusName !== "Closed";
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen px-6 bg-gray-50">
      <div className="flex items-center justify-between p-1">
        <h2 className="text-gray-500">All Incidents</h2>
        <div className="flex gap-2">
          {/* New */}
          <button
            onClick={() => navigate("/incidents/create")}
            className="bg-blue-600 text-white px-3 py-0.5 rounded cursor-pointer hover:bg-blue-800 active:scale-95 transition duration-150"
          >
            New
          </button>
        </div>
      </div>
      <div className="flex">
        <DataTable
          data={filtered}
          columns={incidentsColumns}
          getRowId={(filtered) => filtered.id}
          getDetailsLink={(filtered) => `/incidents/${filtered.id}`}
        />
      </div>
    </div>
  );
}
