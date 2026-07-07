import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getServiceNowSettingsThunk,
  updateServiceNowSettingsThunk,
} from "../../features/servicenowSettings/servicenowSettingsSlice";
import type { UpdateServiceNowSettings } from "../../shared/types/servicenowTypes";

export const useServiceNowSettings = () => {
  const dispatch = useAppDispatch();

  const settings = useAppSelector((state) => state.servicenowSettings.settings);
  const loading = useAppSelector((state) => state.servicenowSettings.loading);
  const error = useAppSelector((state) => state.servicenowSettings.error);

  /**
   * Load ServiceNow settings
   */
  const loadServiceNowSettings = useCallback(() => {
    dispatch(getServiceNowSettingsThunk());
  }, [dispatch]);

  /**
   * Update ServiceNow settings
   */
  const updateServiceNowSettings = useCallback(
    async (data: UpdateServiceNowSettings) => {
      return await dispatch(updateServiceNowSettingsThunk({ data })).unwrap();
    },
    [dispatch],
  );

  return {
    settings,
    loading,
    error,
    loadServiceNowSettings,
    updateServiceNowSettings,
  };
};
