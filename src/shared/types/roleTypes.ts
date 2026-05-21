export interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  defaultRole: boolean;
}

export interface RoleState {
  roles: Role[];
  isLoading: boolean;
}

export type RoleDto = {
  id: string;
  name: string;
  display_name: string;
  description: string;
  default_role: boolean;
};
