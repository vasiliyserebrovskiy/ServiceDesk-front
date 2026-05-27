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
