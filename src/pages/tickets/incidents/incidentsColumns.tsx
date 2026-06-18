import type { IncidentList } from "../../../shared/types/incidentTypes";

export const incidentsColumns = [
  {
    title: "Number",
    render: (incident: IncidentList) => incident.number,
  },
  //   TODO:Opened date
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
    render: (incident: IncidentList) => incident.priorityLabel,
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
