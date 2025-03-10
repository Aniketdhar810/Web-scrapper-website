/**
 * Check if the user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!sessionStorage.getItem("sapSession");
};

/**
 * Get the session token
 */
export const getSessionToken = (): string | null => {
  return sessionStorage.getItem("sapSession");
};

/**
 * Clear session data
 */
export const clearSession = (): void => {
  sessionStorage.removeItem("sapSession");
  localStorage.removeItem("studentData");
};
