import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../../shared/types/usersTypes";
import {
  getUsersThunk,
  createUserThunk,
  getUserByIdThunk,
  updateUserThunk,
  changeUserPasswordThunk,
  resetUserPasswordThunk,
} from "./usersThunks";

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * GET USERS
     */
    builder.addCase(getUsersThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(getUsersThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch users";
    });

    /**
     * CREATE USER
     */
    builder.addCase(createUserThunk.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });

    builder.addCase(createUserThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to create user";
    });

    /**
     * GET USER BY ID
     */
    builder.addCase(getUserByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUserByIdThunk.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(getUserByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch user";
    });

    /**
     * UPDATE USER BY ID
     */
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      const updatedUser = action.payload;

      const index = state.users.findIndex((u) => u.id === updatedUser.id);

      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    });

    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to update user";
    });

    /**
     * CHANGE PASSWORD
     */
    builder.addCase(changeUserPasswordThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(changeUserPasswordThunk.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(changeUserPasswordThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to change password";
    });

    /**
     * RESET PASSWORD
     */
    builder.addCase(resetUserPasswordThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(resetUserPasswordThunk.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(resetUserPasswordThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to reset password";
    });
  },
});

export default usersSlice.reducer;
