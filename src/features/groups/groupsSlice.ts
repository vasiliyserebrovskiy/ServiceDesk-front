import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type Group,
  type CreateGroupDto,
  type UpdateGroupDto,
  initialState,
} from "../../shared/types/groupsTypes";
import {
  fetchGroups,
  createNewGroup,
  updateGroup,
  deleteGroup,
  fetchGroup,
} from "./groupsApi";

/**
 * Load all groups
 */
export const getGroupsThunk = createAsyncThunk<Group[]>(
  "groups/getAll",
  async () => {
    return await fetchGroups();
  },
);

/**
 * Create new group
 */
export const createGroupThunk = createAsyncThunk<Group, CreateGroupDto>(
  "groups/create",
  async (newGroup) => {
    return await createNewGroup(newGroup);
  },
);

/**
 * Update group by id
 */
export const updateGroupByIdThunk = createAsyncThunk<
  Group,
  { id: string; data: UpdateGroupDto }
>("groups/update", async ({ id, data }) => {
  return await updateGroup(id, data);
});

/**
 * Delete group by id
 */
export const deleteGroupByIdThunk = createAsyncThunk<string, string>(
  "groups/deleteById",
  async (id) => {
    await deleteGroup(id);
    return id;
  },
);

/**
 * Get group by id
 */
export const getGroupByIdThunk = createAsyncThunk<Group, string>(
  "groups/getById",
  async (id) => {
    return await fetchGroup(id);
  },
);

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * GET GROUPS
     */
    builder.addCase(getGroupsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getGroupsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.groups = action.payload;
    });

    builder.addCase(getGroupsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch groups";
    });

    /**
     * CREATE GROUP
     */
    builder.addCase(createGroupThunk.fulfilled, (state, action) => {
      state.groups.push(action.payload);
    });

    builder.addCase(createGroupThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to create group";
    });

    /**
     * UPDATE GROUP BY ID
     */
    builder.addCase(updateGroupByIdThunk.fulfilled, (state, action) => {
      const updatedGroup = action.payload;

      const index = state.groups.findIndex((g) => g.id === updatedGroup.id);

      if (index !== -1) {
        state.groups[index] = updatedGroup;
      }
    });

    builder.addCase(updateGroupByIdThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to update group";
    });

    /**
     * DELETE GROUP BY ID
     */
    builder.addCase(deleteGroupByIdThunk.fulfilled, (state, action) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload,
      );
      state.loading = false;
    });

    builder.addCase(deleteGroupByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to delete group";
    });
    builder.addCase(deleteGroupByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    /**
     * GET GROUP BY ID
     */
    builder.addCase(getGroupByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getGroupByIdThunk.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(getGroupByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch group";
    });
  },
});

export default groupsSlice.reducer;
