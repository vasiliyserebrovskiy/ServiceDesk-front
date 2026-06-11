import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getIncidentsStatusesThunk,
  getStatusesThunk,
  createStatusThunk,
  updateStatusByIdThunk,
  deleteStatusByIdThunk,
  getStatusByIdThunk,
} from "../../features/statuses/statusesSlice";
import type { CreateStatusDto, UpdateStatusDto } from "../types/statusTypes";

export const useStatuses = () => {
  const dispatch = useAppDispatch();

  const statuses = useAppSelector((state) => state.statuses.statuses);
  const incidentStatuses = useAppSelector(
    (state) => state.statuses.incidentStatuses,
  );
  const loading = useAppSelector((state) => state.statuses.loading);
  const error = useAppSelector((state) => state.statuses.error);

  /**
   * Load all incidents statuses
   */
  const loadIncidentStatuses = useCallback(() => {
    dispatch(getIncidentsStatusesThunk());
  }, [dispatch]);

  /**
   * Load all statuses
   */
  const loadStatuses = useCallback(() => {
    dispatch(getStatusesThunk());
  }, [dispatch]);

  /**
   * Create new status
   */
  const createStatus = useCallback(
    async (data: CreateStatusDto) => {
      return await dispatch(createStatusThunk(data)).unwrap();
    },
    [dispatch],
  );
  /**
   * Update status by id
   */
  const updateStatusById = useCallback(
    async (id: string, data: UpdateStatusDto) => {
      return await dispatch(updateStatusByIdThunk({ id, data })).unwrap();
    },
    [dispatch],
  );

  /**
   * Delete status by id
   */
  const deleteStatusById = useCallback(
    async (id: string) => {
      return await dispatch(deleteStatusByIdThunk(id)).unwrap();
    },
    [dispatch],
  );

  /**
   * Get status by id
   */
  const getStatusById = useCallback(
    async (id: string) => {
      return await dispatch(getStatusByIdThunk(id)).unwrap();
    },
    [dispatch],
  );
  return {
    statuses,
    incidentStatuses,
    loading,
    error,
    loadIncidentStatuses,
    loadStatuses,
    createStatus,
    updateStatusById,
    deleteStatusById,
    getStatusById,
  };
};
