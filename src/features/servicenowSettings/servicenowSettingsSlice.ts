import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type ServiceNowSettings,
  type UpdateServiceNowSettings,
  initialState,
} from "../../shared/types/servicenowTypes";
import {
  fetchServiceNowSettings,
  updateServiceNowSettings,
} from "./servicenowSettingsApi";

/**
 * Load ServiceNow settings
 */
export const getServiceNowSettingsThunk = createAsyncThunk<ServiceNowSettings>(
  "servicenowSettings/get",
  async () => {
    return await fetchServiceNowSettings();
  },
);

/**
 * Update ServiceNow settings
 */

export const updateServiceNowSettingsThunk = createAsyncThunk<
  ServiceNowSettings,
  { data: UpdateServiceNowSettings }
>("servicenowSettings/update", async ({ data }) => {
  return await updateServiceNowSettings(data);
});

const servicenowSettingsSlice = createSlice({
  name: "servicenowSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * GET SERVICENOW SETTINGS
     */
    builder.addCase(getServiceNowSettingsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getServiceNowSettingsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload;
    });

    builder.addCase(getServiceNowSettingsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message ?? "Failed to fetch ServiceNow settings";
    });

    /**
     * UPDATE SERVICENOW SETTINGS
     */
    builder.addCase(
      updateServiceNowSettingsThunk.fulfilled,
      (state, action) => {
        state.settings = action.payload;
      },
    );

    builder.addCase(updateServiceNowSettingsThunk.rejected, (state, action) => {
      state.error =
        action.error.message ?? "Failed to update ServiceNow settings";
    });
  },
});

export default servicenowSettingsSlice.reducer;
