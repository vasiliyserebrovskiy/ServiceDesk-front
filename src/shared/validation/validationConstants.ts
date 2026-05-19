export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 255;
export const EMAIL_MIN_LENGTH = 5;
export const EMAIL_MAX_LENGTH = 255;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*_+=\-/\\.,])[A-Za-z\d~!@#$%^&*_+=\-/\\.,]+$/;

export const EMAIL_REGEX =
  /^(?!\.)[A-Za-z0-9._%+-]+(?<!\.)@(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,6}$/;
