import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type Status,
  type CreateStatusDto,
  type UpdateStatusDto,
  initialState,
} from "../../shared/types/statusTypes";
import {
  fetchIncidentsStatuses,
  fetchStatuses,
  createNewStatus,
  updateStatus,
  deleteStatus,
  fetchStatusById,
} from "./statusesApi";

/**
 * Load all incident statuses
 */
export const getIncidentsStatusesThunk = createAsyncThunk<Status[]>(
  "statuses/getIncidentAll",
  async () => {
    return await fetchIncidentsStatuses();
  },
);

/**
 * Load all  statuses
 */
export const getStatusesThunk = createAsyncThunk<Status[]>(
  "statuses/getAll",
  async () => {
    return await fetchStatuses();
  },
);

/**
 * Create new status
 */
export const createStatusThunk = createAsyncThunk<Status, CreateStatusDto>(
  "statuses/create",
  async (newStatus) => {
    return await createNewStatus(newStatus);
  },
);

/**
 * Update status by id
 */
export const updateStatusByIdThunk = createAsyncThunk<
  Status,
  { id: string; data: UpdateStatusDto }
>("statuses/update", async ({ id, data }) => {
  return await updateStatus(id, data);
});

/**
 * Delete status by id
 */
export const deleteStatusByIdThunk = createAsyncThunk<string, string>(
  "statuses/deleteById",
  async (id) => {
    await deleteStatus(id);
    return id;
  },
);

/**
 * Get status by id
 */
export const getStatusByIdThunk = createAsyncThunk<Status, string>(
  "statuses/getById",
  async (id) => {
    return await fetchStatusById(id);
  },
);

const statusesSlice = createSlice({
  name: "statuses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * GET INCIDENT STATUSES
     */
    builder.addCase(getIncidentsStatusesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getIncidentsStatusesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.incidentStatuses = action.payload;
    });

    builder.addCase(getIncidentsStatusesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message ?? "Failed to fetch incidents statuses";
    });

    /**
     * GET ALL STATUSES
     */
    builder.addCase(getStatusesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getStatusesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.statuses = action.payload;
    });

    builder.addCase(getStatusesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch statuses";
    });

    /**
     * CREATE STATUS
     */
    builder.addCase(createStatusThunk.fulfilled, (state, action) => {
      state.statuses.push(action.payload);
    });

    builder.addCase(createStatusThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to create status";
    });

    /**
     * UPDATE STATUSES BY ID
     */
    builder.addCase(updateStatusByIdThunk.fulfilled, (state, action) => {
      const updatedStatus = action.payload;

      const index = state.statuses.findIndex((c) => c.id === updatedStatus.id);

      if (index !== -1) {
        state.statuses[index] = updatedStatus;
      }
    });

    builder.addCase(updateStatusByIdThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to update status";
    });

    /**
     * DELETE STATUS BY ID
     */
    builder.addCase(deleteStatusByIdThunk.fulfilled, (state, action) => {
      state.statuses = state.statuses.filter(
        (status) => status.id !== action.payload,
      );
      state.loading = false;
    });

    builder.addCase(deleteStatusByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to delete status";
    });
    builder.addCase(deleteStatusByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    /**
     * GET STATUS BY ID
     */
    builder.addCase(getStatusByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getStatusByIdThunk.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(getStatusByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch status by id";
    });
  },
});

export default statusesSlice.reducer;
