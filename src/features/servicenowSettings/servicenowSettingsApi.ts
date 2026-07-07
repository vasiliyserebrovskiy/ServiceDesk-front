import { api } from "../../api/axios";
import type {
  ServiceNowSettings,
  UpdateServiceNowSettings,
} from "../../shared/types/servicenowTypes";

// Get ServiceNow settings
export const fetchServiceNowSettings =
  async (): Promise<ServiceNowSettings> => {
    const { data } = await api.get<ServiceNowSettings>(
      "/v1/servicenow/settings",
    );
    return data;
  };

// Update ServiceNow settings
export const updateServiceNowSettings = async (
  newSettings: UpdateServiceNowSettings,
): Promise<ServiceNowSettings> => {
  const { data } = await api.put("/v1/servicenow/settings", newSettings);
  return data;
};
