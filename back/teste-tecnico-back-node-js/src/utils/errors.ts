type AppErrorTypes = "TextNotFoundError" | "AIServiceError" | "ValidationError";

export interface AppError {
  type: AppErrorTypes;
  message: string;
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
  if (type === "TextNotFoundError") return 400;
  if (type === "AIServiceError") return 503;
  if (type === "ValidationError") return 422;

  return 400;
}

export function textNotFoundError(message?: string): AppError {
  return { type: "TextNotFoundError", message: message || "No text has been uploaded yet." };
}

export function aiServiceError(message?: string): AppError {
  return { type: "AIServiceError", message: message || "AI service is unavailable." };
}

export function validationError(message?: string): AppError {
  return { type: "ValidationError", message: message || "Invalid request data." };
}
