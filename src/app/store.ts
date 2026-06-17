import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import errorReducer from "../features/error/errorSlice";
import roleReducer from "../features/roles/roleSlice";
import usersReducer from "../features/users/usersSlice";
import groupsReducer from "../features/groups/groupsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import subcategoriesReducer from "../features/sybcategories/sybcategoriesSlice";
import statusesReducer from "../features/statuses/statusesSlice";
import cisReducer from "../features/cis/cisSlice";
import incidentsReducer from "../features/incidents/incidentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    roles: roleReducer,
    users: usersReducer,
    groups: groupsReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    statuses: statusesReducer,
    cis: cisReducer,
    incidents: incidentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
