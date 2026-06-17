import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type Incident,
  type CreateIncidentDto,
  type UpdateIncidentDto,
  initialState,
} from "../../shared/types/incidentTypes";
import {
  fetchIncidents,
  createNewIncident,
  updateIncident,
  fetchIncidentById,
} from "./incidentApi";

/**
 * Load all incidents
 */
export const getIncidentsThunk = createAsyncThunk<Incident[]>(
  "incidents/getAll",
  async () => {
    return await fetchIncidents();
  },
);

/**
 * Create new incident
 */
export const createIncidentThunk = createAsyncThunk<
  Incident,
  CreateIncidentDto
>("incidents/create", async (newStatus) => {
  return await createNewIncident(newStatus);
});

/**
 * Update incident by id
 */
export const updateIncidentByIdThunk = createAsyncThunk<
  Incident,
  { id: string; data: UpdateIncidentDto }
>("incidents/update", async ({ id, data }) => {
  return await updateIncident(id, data);
});

/**
 * Get incident by id
 */
export const getIncidentByIdThunk = createAsyncThunk<Incident, string>(
  "incidents/getById",
  async (id) => {
    return await fetchIncidentById(id);
  },
);

const incidentsSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * GET ALL INCIDENTS
     */
    builder.addCase(getIncidentsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getIncidentsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.incidents = action.payload;
    });

    builder.addCase(getIncidentsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch incidents";
    });

    /**
     * CREATE INCIDENT
     */
    builder.addCase(createIncidentThunk.fulfilled, (state, action) => {
      state.incidents.push(action.payload);
    });

    builder.addCase(createIncidentThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to create incident";
    });

    /**
     * UPDATE INCIDENT BY ID
     */
    builder.addCase(updateIncidentByIdThunk.fulfilled, (state, action) => {
      const updatedIncident = action.payload;

      const index = state.incidents.findIndex(
        (i) => i.id === updatedIncident.id,
      );

      if (index !== -1) {
        state.incidents[index] = updatedIncident;
      }
    });

    builder.addCase(updateIncidentByIdThunk.rejected, (state, action) => {
      state.error = action.error.message ?? "Failed to update incident";
    });

    /**
     * GET INCIDENT BY ID
     */
    builder.addCase(getIncidentByIdThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getIncidentByIdThunk.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(getIncidentByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch incident by id";
    });
  },
});

export default incidentsSlice.reducer;
