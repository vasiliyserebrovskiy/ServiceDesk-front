import * as Yup from "yup";
import {
  SUBCATEGORY_NAME_MIN_LENGTH,
  SUBCATEGORY_NAME_MAX_LENGTH,
} from "./validationConstants";

export const SubcategoryValidation = Yup.object({
  name: Yup.string()
    .min(
      SUBCATEGORY_NAME_MIN_LENGTH,
      `Subcategory name must be at least ${SUBCATEGORY_NAME_MIN_LENGTH} characters`,
    )
    .max(
      SUBCATEGORY_NAME_MAX_LENGTH,
      `Subcategory name must be at most ${SUBCATEGORY_NAME_MAX_LENGTH} characters`,
    )
    .required(),

  description: Yup.string(),
  categoryId: Yup.string().required("Category is required"),
});
