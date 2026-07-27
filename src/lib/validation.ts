import type { MockUser } from "./mockData";

export interface ValidationError {
  field: string;
  message: string;
}

export interface SignUpData {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
  village: string;
}

export interface LoginData {
  phone: string;
  password: string;
}

/**
 * Validates sign-up form data.
 * Returns an array of errors — empty array means valid.
 */
export function validateSignUp(
  data: SignUpData,
  existingUsers: MockUser[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Name required
  if (!data.name.trim()) {
    errors.push({ field: "name", message: "fieldRequired" });
  }

  // Phone required + format
  if (!data.phone.trim()) {
    errors.push({ field: "phone", message: "fieldRequired" });
  } else if (!/^\d+$/.test(data.phone)) {
    errors.push({ field: "phone", message: "phoneNonNumeric" });
  } else if (data.phone.length !== 10) {
    errors.push({ field: "phone", message: "phoneInvalid" });
  } else if (existingUsers.some((u) => u.phone === data.phone)) {
    errors.push({ field: "phone", message: "duplicatePhone" });
  }

  // Password required + length
  if (!data.password) {
    errors.push({ field: "password", message: "fieldRequired" });
  } else if (data.password.length < 6) {
    errors.push({ field: "password", message: "passwordTooShort" });
  }

  // Confirm password
  if (!data.confirmPassword) {
    errors.push({ field: "confirmPassword", message: "fieldRequired" });
  } else if (data.password && data.confirmPassword !== data.password) {
    errors.push({ field: "confirmPassword", message: "passwordMismatch" });
  }

  return errors;
}

/**
 * Validates login form data.
 * Returns an array of errors — empty array means valid.
 */
export function validateLogin(
  data: LoginData,
  existingUsers: MockUser[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.phone.trim()) {
    errors.push({ field: "phone", message: "fieldRequired" });
  }

  if (!data.password) {
    errors.push({ field: "password", message: "fieldRequired" });
  }

  // If basic format is valid, check against mock database
  if (data.phone.trim() && data.password) {
    const user = existingUsers.find((u) => u.phone === data.phone);
    if (!user) {
      errors.push({ field: "phone", message: "noAccountFound" });
    } else if (user.password !== data.password) {
      errors.push({ field: "password", message: "incorrectPassword" });
    }
  }

  return errors;
}
