import { NestJsErrorResponse } from "@/interfaces/NestJsErrorResponse";

// Description: This file contains the error codes and their corresponding messages from the server
export enum ErrorCode {
  USERNAME_OR_EMAIL_EXISTS = "user.error.username_or_email_exists",
  USER_NOT_FOUND = "user.error.not_found",
  INVALID_PASSWORD = "user.error.invalid_password",
}

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.USERNAME_OR_EMAIL_EXISTS]:
    "Користувач з таким ім'ям або електронною поштою вже існує",
  [ErrorCode.USER_NOT_FOUND]: "Користувача не знайдено",
  [ErrorCode.INVALID_PASSWORD]: "Невірний Email або пароль",
};

export const getErrorMessage = (
  error: NestJsErrorResponse | string,
): string => {
  if (typeof error === "string") {
    return error;
  }
  const errorCode = error?.trace?.response?.error;

  if (errorCode && ERROR_MESSAGES[errorCode as ErrorCode]) {
    return ERROR_MESSAGES[errorCode as ErrorCode];
  }

  return "Невідома помилка";
};
