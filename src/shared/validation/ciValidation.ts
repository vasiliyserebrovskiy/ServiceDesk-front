import * as Yup from "yup";
import {
  CI_NAME_MIN_LENGTH,
  CI_NAME_MAX_LENGTH,
  CI_MODEL_MAX_LENGTH,
  CI_SERIAL_NUMBER_MAX_LENGTH,
  CI_MANUFACTURER_MAX_LENGTH,
  CI_TYPE_MAX_LENGTH,
} from "./validationConstants";

export const ciValidation = Yup.object({
  name: Yup.string()
    .min(
      CI_NAME_MIN_LENGTH,
      `Configuration item name must be at least ${CI_NAME_MIN_LENGTH} characters`,
    )
    .max(
      CI_NAME_MAX_LENGTH,
      `Configuration item name must be at most ${CI_NAME_MAX_LENGTH} characters`,
    )
    .required(),

  description: Yup.string(),
  type: Yup.string().max(
    CI_TYPE_MAX_LENGTH,
    `Configuration item type must be at most ${CI_TYPE_MAX_LENGTH} characters`,
  ),
  manufacturer: Yup.string().max(
    CI_MANUFACTURER_MAX_LENGTH,
    `Configuration item manufacturer must be at most ${CI_MANUFACTURER_MAX_LENGTH} characters`,
  ),
  serialNumber: Yup.string().max(
    CI_SERIAL_NUMBER_MAX_LENGTH,
    `Configuration item serial number must be at most ${CI_SERIAL_NUMBER_MAX_LENGTH} characters`,
  ),
  model: Yup.string().max(
    CI_MODEL_MAX_LENGTH,
    `Configuration item model must be at most ${CI_MODEL_MAX_LENGTH} characters`,
  ),
});
