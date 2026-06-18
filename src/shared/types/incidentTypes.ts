export interface Incident {
  id: string;
  number: string;
  requesterId: string;
  categoryId: string;
  subcategoryId: string;
  statusId: string;
  priority: string;
  impact: string;
  urgency: string;
  ciId: string;
  groupId: string;
  assigneeId: string;
  shortDescription: string;
  description: string;
  servicenowNumber: string;
  servicenowSynced: boolean;
  servicenowSyncedAt: string;
}

export type NextIncidentNumber = {
  number: string;
};

export type CreateIncidentDto = {
  number: string;
  requesterId: string;
  categoryId: string;
  subcategoryId: string;
  statusId: string;
  priority: string;
  impact: string;
  urgency: string;
  ciId: string;
  groupId: string;
  assigneeId: string;
  shortDescription: string;
  description: string;
};

export type UpdateIncidentDto = {
  requesterId: string;
  categoryId: string;
  subcategoryId: string;
  statusId: string;
  priority: string;
  impact: string;
  urgency: string;
  ciId: string;
  groupId: string;
  assigneeId: string;
  shortDescription: string;
  description: string;
};

export interface IncidentState {
  incidents: Incident[];
  loading: boolean;
  error: string | null;
}

export const initialState: IncidentState = {
  incidents: [],
  loading: false,
  error: null,
};

export type IncidentCreateFormValues = {
  number: string;
  requesterId: string;
  categoryId: string;
  subcategoryId: string;
  statusId: string;
  priority: string;
  impact: string;
  urgency: string;
  ciId: string;
  groupId: string;
  assigneeId: string;
  shortDescription: string;
  description: string;
};

export type IncidentUpdateFormValues = {
  requesterId: string;
  categoryId: string;
  subcategoryId: string;
  statusId: string;
  priority: string;
  impact: string;
  urgency: string;
  ciId: string;
  groupId: string;
  assigneeId: string;
  shortDescription: string;
  description: string;
};

export type IncidentList = {
  id: string;
  number: string;
  requesterId: string;
  categoryId: string;
  subcategoryId: string;
  statusId: string;
  priority: string;
  impact: string;
  urgency: string;
  ciId: string;
  groupId: string;
  assigneeId: string;
  shortDescription: string;
  description: string;
  servicenowNumber: string;
  servicenowSynced: boolean;
  servicenowSyncedAt: string;
};

export const impactOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
];

export const urgencyOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
];

export const calculatePriority = (impact: string, urgency: string): string => {
  if (impact === "CRITICAL" || urgency === "CRITICAL") return "CRITICAL";
  if (impact === "HIGH" && urgency === "HIGH") return "CRITICAL";
  if (impact === "HIGH" && urgency === "MEDIUM") return "HIGH";
  if (impact === "HIGH" && urgency === "LOW") return "MEDIUM";
  if (impact === "MEDIUM" && urgency === "HIGH") return "HIGH";
  if (impact === "MEDIUM" && urgency === "MEDIUM") return "MEDIUM";
  if (impact === "MEDIUM" && urgency === "LOW") return "LOW";
  if (impact === "LOW" && urgency === "HIGH") return "MEDIUM";
  if (impact === "LOW" && urgency === "MEDIUM") return "LOW";
  return "LOW";
};

export const priorityLabels: Record<string, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};
