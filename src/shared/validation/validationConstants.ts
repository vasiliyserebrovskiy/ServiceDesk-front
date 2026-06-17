export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 255;
export const EMAIL_MIN_LENGTH = 5;
export const EMAIL_MAX_LENGTH = 255;
export const GROUP_NAME_MIN_LENGTH = 2;
export const GROUP_NAME_MAX_LENGTH = 200;
export const CATEGORY_NAME_MIN_LENGTH = 2;
export const CATEGORY_NAME_MAX_LENGTH = 255;
export const SUBCATEGORY_NAME_MIN_LENGTH = 2;
export const SUBCATEGORY_NAME_MAX_LENGTH = 255;
export const STATUS_NAME_MIN_LENGTH = 2;
export const STATUS_NAME_MAX_LENGTH = 255;
export const CI_NAME_MIN_LENGTH = 2;
export const CI_NAME_MAX_LENGTH = 255;
export const CI_TYPE_MAX_LENGTH = 150;
export const CI_MANUFACTURER_MAX_LENGTH = 150;
export const CI_SERIAL_NUMBER_MAX_LENGTH = 150;
export const CI_MODEL_MAX_LENGTH = 150;
export const SHORT_DESCRIPTION_MIN_LENGTH = 10;
export const SHORT_DESCRIPTION_MAX_LENGTH = 255;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*_+=\-/\\.,])[A-Za-z\d~!@#$%^&*_+=\-/\\.,]+$/;

export const EMAIL_REGEX =
  /^(?!\.)[A-Za-z0-9._%+-]+(?<!\.)@(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,6}$/;
