import type { RoleState, Role } from "../../shared/types/roleTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const initialState: RoleState = {
  roles: [],
  isLoading: false,
};

const authSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
    },

    clearRoles: (state) => {
      state.roles = [];
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setRoles, clearRoles, setLoading } = authSlice.actions;
export default authSlice.reducer;

export const selectRoles = (state: RootState) => state.roles.roles;
export const selectRolesLoading = (state: RootState) => state.roles.isLoading;
