import { ApiError } from "../types";

/**
 * Handle network errors and format them consistently
 */
export const handleNetworkError = (
  error: any,
  defaultMessage: string,
): never => {
  // Determine error type based on the error
  let errorType: ApiError["type"] = "general";
  let errorMessage = defaultMessage;

  if (error instanceof Error) {
    errorMessage = error.message;

    // Determine error type based on message content
    if (
      errorMessage.includes("authentication") ||
      errorMessage.includes("login") ||
      errorMessage.includes("password")
    ) {
      errorType = "login";
    } else if (
      errorMessage.includes("network") ||
      errorMessage.includes("connection") ||
      errorMessage.includes("offline")
    ) {
      errorType = "connection";
    } else if (errorMessage.includes("maintenance")) {
      errorType = "maintenance";
    } else if (
      errorMessage.includes("timeout") ||
      errorMessage.includes("timed out")
    ) {
      errorType = "timeout";
    }
  }

  // Create a structured error object
  const apiError: ApiError = {
    message: errorMessage,
    type: errorType,
    code: `ERR_${errorType.toUpperCase()}`,
  };

  // Throw the formatted error
  throw apiError;
};

/**
 * Format error for display in UI
 */
export const formatErrorForDisplay = (
  error: any,
): {
  type: ApiError["type"];
  message: string;
} => {
  if (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    "message" in error
  ) {
    return {
      type: error.type as ApiError["type"],
      message: error.message as string,
    };
  }

  // Default error format
  return {
    type: "general",
    message:
      error instanceof Error ? error.message : "An unexpected error occurred",
  };
};
