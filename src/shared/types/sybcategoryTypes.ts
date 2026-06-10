export interface Subcategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

export type CreateSubcategoryDto = {
  name: string;
  description: string;
  categoryId: string;
};

export type UpdateSubcategoryDto = {
  name: string;
  description: string;
  categoryId: string;
};

export interface SubcategoryState {
  subcategories: Subcategory[];
  subcategoriesByCategoryId: Subcategory[];
  loading: boolean;
  error: string | null;
}

export const initialState: SubcategoryState = {
  subcategories: [],
  subcategoriesByCategoryId: [],
  loading: false,
  error: null,
};

export type SubcategoryFormValues = {
  name: string;
  description: string;
  categoryId: string;
};

export type SubcategoryList = {
  id: string;
  name: string;
  description: string;
  categoryName: string;
};
