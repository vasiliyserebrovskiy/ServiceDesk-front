import Tooltip from "../../../components/tooltip/Tooltip";
import type { IncidentList } from "../../../shared/types/incidentTypes";
import { Cloud, CloudOff } from "lucide-react";

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
    title: "ServiceNow",
    render: (incident: IncidentList) => {
      const isSynced = incident.servicenowSynced;

      const syncedAtLabel = incident.servicenowSyncedAt
        ? new Date(incident.servicenowSyncedAt).toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : null;

      const tooltip = isSynced
        ? `Synced as ${incident.servicenowNumber ?? "—"}${syncedAtLabel ? ` on ${syncedAtLabel}` : ""}`
        : "Not synced to ServiceNow";

      return (
        <Tooltip content={tooltip}>
          <span className="inline-flex cursor-help">
            {isSynced ? (
              <Cloud className="w-4 h-4 text-green-500" />
            ) : (
              <CloudOff className="w-4 h-4 text-gray-300" />
            )}
          </span>
        </Tooltip>
      );
    },
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
