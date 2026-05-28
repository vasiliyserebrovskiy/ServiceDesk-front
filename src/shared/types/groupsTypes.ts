export interface Group {
  id: string;
  name: string;
  description: string;
  userIds: string[];
}

export type CreateGroupDto = {
  name: string;
  description: string;
  userIds: string[];
};

export type UpdateGroupDto = {
  name: string;
  description: string;
  userIds: string[];
};

export interface GroupState {
  groups: Group[];
  loading: boolean;
  error: string | null;
}

export const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};

export type GroupFormValues = {
  name: string;
  description: string;
  userIds: string[];
};

export type GroupList = {
  name: string;
  description: string;
};
