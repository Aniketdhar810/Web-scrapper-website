/**
 * Utility for managing user sessions
 */
export class SessionManager {
  private static readonly SESSION_KEY = "sapSession";
  private static readonly STUDENT_DATA_KEY = "studentData";
  private static readonly SESSION_EXPIRY_KEY = "sapSessionExpiry";
  private static readonly DEFAULT_EXPIRY_HOURS = 2;

  /**
   * Create a new session
   * @param sessionId Session ID from the SAP portal
   * @param studentData Student data to store
   * @param expiryHours Number of hours until the session expires
   */
  public static createSession(
    sessionId: string,
    studentData: any,
    expiryHours: number = SessionManager.DEFAULT_EXPIRY_HOURS,
  ): void {
    // Store session ID
    sessionStorage.setItem(SessionManager.SESSION_KEY, sessionId);

    // Store student data
    localStorage.setItem(
      SessionManager.STUDENT_DATA_KEY,
      JSON.stringify(studentData),
    );

    // Set expiry time
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + expiryHours);
    localStorage.setItem(
      SessionManager.SESSION_EXPIRY_KEY,
      expiryTime.toISOString(),
    );

    console.log(`Session created, expires in ${expiryHours} hours`);
  }

  /**
   * Check if the user has an active session
   */
  public static hasActiveSession(): boolean {
    const sessionId = sessionStorage.getItem(SessionManager.SESSION_KEY);
    if (!sessionId) return false;

    // Check if session has expired
    const expiryTimeStr = localStorage.getItem(
      SessionManager.SESSION_EXPIRY_KEY,
    );
    if (!expiryTimeStr) return false;

    const expiryTime = new Date(expiryTimeStr);
    const now = new Date();

    return now < expiryTime;
  }

  /**
   * Get the current session ID
   */
  public static getSessionId(): string | null {
    return sessionStorage.getItem(SessionManager.SESSION_KEY);
  }

  /**
   * Get the stored student data
   */
  public static getStudentData<T = any>(): T | null {
    const dataStr = localStorage.getItem(SessionManager.STUDENT_DATA_KEY);
    if (!dataStr) return null;

    try {
      return JSON.parse(dataStr) as T;
    } catch (error) {
      console.error("Error parsing student data:", error);
      return null;
    }
  }

  /**
   * Update the stored student data
   * @param newData New student data to store
   */
  public static updateStudentData(newData: any): void {
    const currentData = SessionManager.getStudentData() || {};
    const updatedData = { ...currentData, ...newData };

    localStorage.setItem(
      SessionManager.STUDENT_DATA_KEY,
      JSON.stringify(updatedData),
    );
  }

  /**
   * Extend the session expiry time
   * @param additionalHours Additional hours to extend the session by
   */
  public static extendSession(additionalHours: number = 2): void {
    if (!SessionManager.hasActiveSession()) return;

    const expiryTimeStr = localStorage.getItem(
      SessionManager.SESSION_EXPIRY_KEY,
    );
    if (!expiryTimeStr) return;

    const expiryTime = new Date(expiryTimeStr);
    expiryTime.setHours(expiryTime.getHours() + additionalHours);

    localStorage.setItem(
      SessionManager.SESSION_EXPIRY_KEY,
      expiryTime.toISOString(),
    );

    console.log(`Session extended by ${additionalHours} hours`);
  }

  /**
   * Clear the current session
   */
  public static clearSession(): void {
    sessionStorage.removeItem(SessionManager.SESSION_KEY);
    localStorage.removeItem(SessionManager.STUDENT_DATA_KEY);
    localStorage.removeItem(SessionManager.SESSION_EXPIRY_KEY);

    console.log("Session cleared");
  }

  /**
   * Get the remaining session time in minutes
   */
  public static getRemainingSessionTime(): number {
    if (!SessionManager.hasActiveSession()) return 0;

    const expiryTimeStr = localStorage.getItem(
      SessionManager.SESSION_EXPIRY_KEY,
    );
    if (!expiryTimeStr) return 0;

    const expiryTime = new Date(expiryTimeStr);
    const now = new Date();

    const diffMs = expiryTime.getTime() - now.getTime();
    return Math.max(0, Math.floor(diffMs / (1000 * 60)));
  }
}
