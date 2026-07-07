import * as Yup from "yup";

export const updateServiceNowSettingsValidation = Yup.object({
  endpoint: Yup.string()
    .required("Required")
    .url("Must be a valid URL")
    .matches(/^https:\/\//, "Endpoint must use HTTPS"),
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});
