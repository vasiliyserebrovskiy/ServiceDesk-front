import * as Yup from "yup";
import {
  CATEGORY_NAME_MIN_LENGTH,
  CATEGORY_NAME_MAX_LENGTH,
} from "./validationConstants";

export const CategoryValidation = Yup.object({
  name: Yup.string()
    .min(
      CATEGORY_NAME_MIN_LENGTH,
      `Group name must be at least ${CATEGORY_NAME_MIN_LENGTH} characters`,
    )
    .max(
      CATEGORY_NAME_MAX_LENGTH,
      `Group name must be at most ${CATEGORY_NAME_MAX_LENGTH} characters`,
    )
    .required(),

  description: Yup.string(),
  isIncident: Yup.boolean(),
  isProblem: Yup.boolean(),
  isRequest: Yup.boolean(),
  isChange: Yup.boolean(),
});
