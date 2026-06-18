import * as Yup from "yup";

import {
  SHORT_DESCRIPTION_MIN_LENGTH,
  SHORT_DESCRIPTION_MAX_LENGTH,
} from "./validationConstants";

export const IncidentCreateValidation = Yup.object({
  number: Yup.string(),
  requesterId: Yup.string().required("Requester is a required field"),
  categoryId: Yup.string().required("Category is a required field"),
  subcategoryId: Yup.string(),
  statusId: Yup.string().required("Status is a required field"),
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
    .required("Shord description is a required field"),
  description: Yup.string(),
});
