import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getIncidentsThunk,
  createIncidentThunk,
  updateIncidentByIdThunk,
  getIncidentByIdThunk,
} from "../../features/incidents/incidentSlice";
import type {
  CreateIncidentDto,
  UpdateIncidentDto,
} from "../../shared/types/incidentTypes";

import { fetchNextIncidentNumber } from "../../features/incidents/incidentApi";

export const useIncidents = () => {
  const dispatch = useAppDispatch();

  const incidents = useAppSelector((state) => state.incidents.incidents);
  const loading = useAppSelector((state) => state.incidents.loading);
  const error = useAppSelector((state) => state.incidents.error);

  /**
   * Get next incident number
   */
  const getNextIncidentNumber = useCallback(async () => {
    return await fetchNextIncidentNumber();
  }, []);

  /**
   * Load all incidents
   */
  const loadIncidents = useCallback(() => {
    dispatch(getIncidentsThunk());
  }, [dispatch]);

  /**
   * Create new incident
   */
  const createIncident = useCallback(
    async (data: CreateIncidentDto) => {
      return await dispatch(createIncidentThunk(data)).unwrap();
    },
    [dispatch],
  );
  /**
   * Update incident by id
   */
  const updateIncidentById = useCallback(
    async (id: string, data: UpdateIncidentDto) => {
      return await dispatch(updateIncidentByIdThunk({ id, data })).unwrap();
    },
    [dispatch],
  );

  /**
   * Get incident by id
   */
  const getIncidentById = useCallback(
    async (id: string) => {
      return await dispatch(getIncidentByIdThunk(id)).unwrap();
    },
    [dispatch],
  );

  return {
    incidents,
    loading,
    error,
    getNextIncidentNumber,
    loadIncidents,
    createIncident,
    updateIncidentById,
    getIncidentById,
  };
};
