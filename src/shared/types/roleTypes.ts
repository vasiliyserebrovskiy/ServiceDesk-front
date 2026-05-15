export interface Role {
  id: string;
  name: string;
  description: string;
  defaultRole: boolean;
}

export interface RoleState {
  roles: Role[] | null;
  isLoading: boolean;
}

export type RoleDTO = {
  id: string;
  name: string;
  description: string;
  default_role: boolean;
};
