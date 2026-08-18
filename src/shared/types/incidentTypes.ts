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
  servicenowNumber: string | null;
  servicenowSynced: boolean;
  servicenowSyncedAt: string | null;
  createdAt: string;
  closeComment: string | null;
  actualStart: string | null;
  actualEnd: string | null;
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
  syncToServiceNow: boolean;
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
  closeComment: string | null;
  actualStart: string | null;
  actualEnd: string | null;
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
  syncToServiceNow: boolean;
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
  closeComment: string;
  actualStart: string;
  actualEnd: string;
};

export type IncidentList = {
  id: string;
  number: string;
  requesterName: string;
  categoryName: string;
  statusName: string;
  priority: string;
  priorityLabel: string;
  impact: string;
  urgency: string;
  groupName: string;
  assigneeName: string;
  shortDescription: string;
  description: string;
  servicenowNumber: string | null;
  servicenowSynced: boolean;
  servicenowSyncedAt: string | null;
  openDate: string;
};

// Constants and functions for Incident form
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
  LOW: "4 - Low",
  MEDIUM: "3 - Medium",
  HIGH: "2 - High",
  CRITICAL: "1 - Critical",
};
