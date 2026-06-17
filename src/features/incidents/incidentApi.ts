import { api } from "../../api/axios";
import type {
  Incident,
  NextIncidentNumber,
  CreateIncidentDto,
  UpdateIncidentDto,
} from "../../shared/types/incidentTypes";

// Get next incident number
export const fetchNextIncidentNumber =
  async (): Promise<NextIncidentNumber> => {
    const { data } = await api.get("/v1/incidents/next-number");
    return data;
  };

// Get all incidents
export const fetchIncidents = async (): Promise<Incident[]> => {
  const { data } = await api.get("/v1/incidents");
  return data;
};

// Create new incident
export const createNewIncident = async (
  newIncident: CreateIncidentDto,
): Promise<Incident> => {
  const { data } = await api.post("/v1/incidents", newIncident);
  return data;
};

// Update new incident
export const updateIncident = async (
  id: string,
  payload: UpdateIncidentDto,
): Promise<Incident> => {
  const { data } = await api.put(`/v1/incidents/${id}`, payload);
  return data;
};

// Get incident by id
export const fetchIncidentById = async (id: string): Promise<Incident> => {
  const { data } = await api.get(`/v1/incidents/${id}`);
  return data;
};
