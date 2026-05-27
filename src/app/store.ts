import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import errorReducer from "../features/error/errorSlice";
import roleReducer from "../features/roles/roleSlice";
import usersReducer from "../features/users/usersSlice";
import groupsReducer from "../features/groups/groupsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    roles: roleReducer,
    users: usersReducer,
    groups: groupsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
