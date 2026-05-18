import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type User,
  type CreateUserDto,
  initialState,
} from "../../shared/types/usersTypes";
import { fetchUsers, createNewUser } from "../../features/users/usersApi";

/**
 * Load all users
 */
export const getUsersThunk = createAsyncThunk<User[]>(
  "users/getAll",
  async () => {
    return await fetchUsers();
  },
);

/**
 * Create new user
 */
export const createUserThunk = createAsyncThunk<User, CreateUserDto>(
  "users/create",
  async (newUser) => {
    return await createNewUser(newUser);
  },
);

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
  },
});

export default usersSlice.reducer;
