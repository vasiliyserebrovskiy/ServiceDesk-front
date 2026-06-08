export interface Category {
  id: string;
  name: string;
  description: string;
  isIncident: boolean;
  isProblem: boolean;
  isRequest: boolean;
  isChange: boolean;
}

export type CreateCategoryDto = {
  name: string;
  description: string;
  isIncident: boolean;
  isProblem: boolean;
  isRequest: boolean;
  isChange: boolean;
};

export type UpdateCategoryDto = {
  name: string;
  description: string;
  isIncident: boolean;
  isProblem: boolean;
  isRequest: boolean;
  isChange: boolean;
};

export interface CategoryState {
  categories: Category[];
  incidentCategories: Category[];
  loading: boolean;
  error: string | null;
}

export const initialState: CategoryState = {
  categories: [],
  incidentCategories: [],
  loading: false,
  error: null,
};

export type CategoryFormValues = {
  name: string;
  description: string;
  isIncident: boolean;
  isProblem: boolean;
  isRequest: boolean;
  isChange: boolean;
};

export type CategoryList = {
  id: string;
  name: string;
  description: string;
  isIncident: boolean;
  isProblem: boolean;
  isRequest: boolean;
  isChange: boolean;
};
