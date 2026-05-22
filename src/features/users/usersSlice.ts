import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type User,
  type CreateUserDto,
  type UpdateUserDto,
  initialState,
} from "../../shared/types/usersTypes";
import {
  fetchUsers,
  createNewUser,
  fetchUser,
  updateUser,
} from "../../features/users/usersApi";

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

/**
 * Load user by id
 */
export const getUserByIdThunk = createAsyncThunk<User, string>(
  "users/getById",
  async (id) => {
    return await fetchUser(id);
  },
);

/**
 * Update user by id
 */
export const updateUserThunk = createAsyncThunk<
  User,
  { id: string; data: UpdateUserDto }
>("users/update", async ({ id, data }) => {
  return await updateUser(id, data);
});

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
  },
});

export default usersSlice.reducer;
