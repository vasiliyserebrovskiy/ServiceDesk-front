import * as Yup from "yup";
import {
  STATUS_NAME_MIN_LENGTH,
  STATUS_NAME_MAX_LENGTH,
} from "./validationConstants";

export const StatusValidation = Yup.object({
  name: Yup.string()
    .min(
      STATUS_NAME_MIN_LENGTH,
      `Status name must be at least ${STATUS_NAME_MIN_LENGTH} characters`,
    )
    .max(
      STATUS_NAME_MAX_LENGTH,
      `Status name must be at most ${STATUS_NAME_MAX_LENGTH} characters`,
    )
    .required(),

  description: Yup.string(),
  isIncident: Yup.boolean(),
  isProblem: Yup.boolean(),
  isRequest: Yup.boolean(),
  isChange: Yup.boolean(),
  isTask: Yup.boolean(),
});
