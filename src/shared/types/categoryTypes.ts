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
  loading: boolean;
  error: string | null;
}

export const initialState: CategoryState = {
  categories: [],
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
  name: string;
  description: string;
  isIncident: boolean;
  isProblem: boolean;
  isRequest: boolean;
  isChange: boolean;
};
