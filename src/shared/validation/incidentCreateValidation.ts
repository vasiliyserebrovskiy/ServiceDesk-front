import * as Yup from "yup";

import {
  SHORT_DESCRIPTION_MIN_LENGTH,
  SHORT_DESCRIPTION_MAX_LENGTH,
} from "./validationConstants";

export const IncidentCreateValidation = Yup.object({
  number: Yup.string(),
  requesterId: Yup.string().required(),
  categoryId: Yup.string().required(),
  subcategoryId: Yup.string(),
  statusId: Yup.string().required(),
  priority: Yup.string().required(),
  impact: Yup.string().required(),
  urgency: Yup.string().required(),
  ciId: Yup.string(),
  groupId: Yup.string(),
  assigneeId: Yup.string(),
  shortDescription: Yup.string()
    .min(
      SHORT_DESCRIPTION_MIN_LENGTH,
      `Short description must be at least ${SHORT_DESCRIPTION_MIN_LENGTH} characters`,
    )
    .max(
      SHORT_DESCRIPTION_MAX_LENGTH,
      `Short description must be at most ${SHORT_DESCRIPTION_MAX_LENGTH} characters`,
    )
    .required(),
  description: Yup.string(),
});
