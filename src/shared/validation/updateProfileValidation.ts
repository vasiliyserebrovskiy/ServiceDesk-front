import * as Yup from "yup";
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  EMAIL_REGEX,
} from "./validationConstants";

export const updateProfileValidation = Yup.object({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  email: Yup.string()
    .required("Email is required")
    .min(
      EMAIL_MIN_LENGTH,
      `Email must be at least ${EMAIL_MIN_LENGTH} characters`,
    )
    .max(
      EMAIL_MAX_LENGTH,
      `Email must be at most ${EMAIL_MAX_LENGTH} characters`,
    )
    .matches(EMAIL_REGEX, "Invalid email format"),
  description: Yup.string(),
  avatarUrl: Yup.string(),
});
