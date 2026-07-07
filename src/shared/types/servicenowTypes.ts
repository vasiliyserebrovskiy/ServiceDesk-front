export interface ServiceNowSettings {
  id: string | null;
  endpoint: string | null;
  username: string | null;
  passwordConfigured: boolean;
}

export type UpdateServiceNowSettings = {
  endpoint: string;
  username: string;
  password: string;
};

export interface ServiceNowSettingsState {
  settings: ServiceNowSettings;
  loading: boolean;
  error: string | null;
}

export const initialState: ServiceNowSettingsState = {
  settings: {
    id: null,
    endpoint: null,
    username: null,
    passwordConfigured: false,
  },
  loading: false,
  error: null,
};

export type ServiceNowSettingsFormValues = {
  endpoint: string;
  username: string;
  password: string;
};
