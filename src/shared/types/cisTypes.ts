export interface CI {
  id: string;
  name: string;
  description: string;
  type: string;
  manufacturer: string;
  serialNumber: string;
  model: string;
}

export type CreateCIDto = {
  name: string;
  description: string;
  type: string;
  manufacturer: string;
  serialNumber: string;
  model: string;
};

export type UpdateCIDto = {
  name: string;
  description: string;
  type: string;
  manufacturer: string;
  serialNumber: string;
  model: string;
};

export interface CIState {
  cis: CI[];
  loading: boolean;
  error: string | null;
}

export const initialState: CIState = {
  cis: [],
  loading: false,
  error: null,
};

export type CIFormValues = {
  name: string;
  description: string;
  type: string;
  manufacturer: string;
  serialNumber: string;
  model: string;
};

export type CIList = {
  id: string;
  name: string;
  description: string;
  type: string;
  manufacturer: string;
  serialNumber: string;
  model: string;
};
