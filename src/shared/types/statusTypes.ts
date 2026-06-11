export interface Status {
  id: string;
  name: string;
  description: string;
  isIncident: boolean;
  isProblem: boolean;
  isRequest: boolean;
  isChange: boolean;
  isTask: boolean;
}

export type CreateStatusDto = {
  name: string;
  description: string;
  isIncident: boolean;
  isProblem: boolean;
  isRequest: boolean;
  isChange: boolean;
  isTask: boolean;
};

export type UpdateStatusDto = {
  name: string;
  description: string;
  isIncident: boolean;
  isProblem: boolean;
  isRequest: boolean;
  isChange: boolean;
  isTask: boolean;
};

export interface StatusState {
  statuses: Status[];
  incidentStatuses: Status[];
  loading: boolean;
  error: string | null;
}

export const initialState: StatusState = {
  statuses: [],
  incidentStatuses: [],
  loading: false,
  error: null,
};

export type StatusFormValues = {
  name: string;
  description: string;
  isIncident: boolean;
  isProblem: boolean;
  isRequest: boolean;
  isChange: boolean;
  isTask: boolean;
};

export type StatusList = {
  id: string;
  name: string;
  description: string;
  isIncident: boolean;
  isProblem: boolean;
  isRequest: boolean;
  isChange: boolean;
  isTask: boolean;
};
