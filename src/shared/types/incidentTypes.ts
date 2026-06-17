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
