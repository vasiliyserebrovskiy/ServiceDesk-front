import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import errorReducer from "../features/error/errorSlice";
import roleReducer from "../features/roles/roleSlice";
import usersReducer from "../features/users/usersSlice";
import groupsReducer from "../features/groups/groupsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import subcategoriesReducer from "../features/sybcategories/sybcategoriesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    roles: roleReducer,
    users: usersReducer,
    groups: groupsReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
