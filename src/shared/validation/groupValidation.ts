import * as Yup from "yup";
import {
  GROUP_NAME_MIN_LENGTH,
  GROUP_NAME_MAX_LENGTH,
} from "./validationConstants";

export const GroupValidation = Yup.object({
  name: Yup.string()
    .min(
      GROUP_NAME_MIN_LENGTH,
      `Group name must be at least ${GROUP_NAME_MIN_LENGTH} characters`,
    )
    .max(
      GROUP_NAME_MAX_LENGTH,
      `Group name must be at most ${GROUP_NAME_MAX_LENGTH} characters`,
    )
    .required(),

  description: Yup.string(),
});
