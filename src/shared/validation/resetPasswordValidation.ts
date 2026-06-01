import * as Yup from "yup";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "./validationConstants";
export const ResetPasswordValidation = Yup.object({
  newPassword: Yup.string()
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
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Required"),
});
