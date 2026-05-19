import * as Yup from "yup";
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  EMAIL_REGEX,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "./validationConstants";

export const UserValidation = Yup.object({
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

  password: Yup.string()
    .required("Password is required")
    .min(
      PASSWORD_MIN_LENGTH,
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    )
    .max(
      PASSWORD_MAX_LENGTH,
      `Password must be at most ${PASSWORD_MAX_LENGTH} characters`,
    )
    .matches(
      PASSWORD_REGEX,
      "Password must contain at least one uppercase, one lowercase, one digit and one special character (~!@#$%^&*_-+=/\\.,) and no spaces",
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),

  role: Yup.string().required("Required"),

  description: Yup.string(),

  avatarUrl: Yup.string(),
});
