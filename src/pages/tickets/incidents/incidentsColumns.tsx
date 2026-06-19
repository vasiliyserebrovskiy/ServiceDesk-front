import type { IncidentList } from "../../../shared/types/incidentTypes";

export const incidentsColumns = [
  {
    title: "Number",
    render: (incident: IncidentList) => incident.number,
  },
  {
    title: "Opened",
    render: (incident: IncidentList) => incident.openDate,
  },
  {
    title: "Short description",
    render: (incident: IncidentList) => incident.shortDescription,
  },
  {
    title: "Requestor",
    render: (incident: IncidentList) => incident.requesterName,
  },
  {
    title: "Priority",
    render: (incident: IncidentList) => {
      const colors: Record<string, string> = {
        LOW: "text-gray-400",
        MEDIUM: "text-blue-500",
        HIGH: "text-yellow-500",
        CRITICAL: "text-red-500",
      };
      return (
        <span className="flex items-center gap-2">
          <span className={`${colors[incident.priority] ?? ""}`}>●</span>
          {incident.priorityLabel}
        </span>
      );
    },
  },
  {
    title: "Status",
    render: (incident: IncidentList) => incident.statusName,
  },
  {
    title: "Category",
    render: (incident: IncidentList) => incident.categoryName,
  },
  {
    title: "Assignment group",
    render: (incident: IncidentList) => incident.groupName,
  },
  {
    title: "Assigned to",
    render: (incident: IncidentList) => incident.assigneeName,
  },
];
