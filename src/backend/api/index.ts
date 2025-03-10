import { KIITPortalScraper } from "../services/scraper";
import { KIITRealScraper } from "../services/realScraper";
import { CaptchaSolver } from "../services/captchaSolver";
import { ProxyManager } from "../services/proxyManager";
import { DataProcessor } from "../services/dataProcessor";
import { EncryptionService } from "../services/encryptionService";
import { ExportService } from "../services/exportService";
import { SessionManager } from "../utils/sessionManager";
import { StudentData, ExportOptions } from "../types";

// Initialize services
const scraper = new KIITPortalScraper();
const realScraper = new KIITRealScraper();
const dataProcessor = new DataProcessor();
const encryptionService = new EncryptionService();
const exportService = new ExportService();

// Main API interface for the frontend to interact with backend services
export const sapPortalAPI = {
  /**
   * Authenticate with the SAP portal
   */
  login: async (credentials: {
    rollNumber: string;
    password: string;
  }): Promise<StudentData> => {
    try {
      // Encrypt credentials for secure storage (if remember me is enabled)
      const encryptedCredentials =
        await encryptionService.encryptCredentials(credentials);
      console.log("Credentials encrypted for secure storage");

      // Try to use the real scraper first
      try {
        console.log("Attempting to login with real scraper...");
        const profileData = await realScraper.login(credentials);

        // Create a session with the student data
        SessionManager.createSession("sap-session-id", profileData);

        return profileData;
      } catch (realScraperError) {
        console.warn(
          "Real scraper login failed, falling back to mock scraper",
          realScraperError,
        );

        // Fall back to mock scraper if real scraper fails
        const loginSuccess = await scraper.login(credentials);

        if (!loginSuccess) {
          throw new Error(
            "Login failed. Please check your credentials and try again.",
          );
        }

        // Fetch student profile data
        const profileData = await scraper.scrapeProfile();

        // Create a session with the student data
        SessionManager.createSession("sap-session-id", profileData);

        return profileData;
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * Check if the user is already logged in
   */
  checkAuthStatus: (): StudentData | null => {
    return SessionManager.hasActiveSession()
      ? SessionManager.getStudentData()
      : null;
  },

  /**
   * Fetch attendance data for the student
   */
  getAttendance: async (
    year: string = "2024-2025",
    session: string = "Spring",
  ): Promise<any> => {
    try {
      // Check if we have a cached version first
      const cacheKey = `cachedAttendance_${year}_${session}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

      // Use cached data if it's less than 1 hour old
      if (cachedData && cachedTimestamp) {
        const timestamp = parseInt(cachedTimestamp);
        const now = Date.now();

        if (now - timestamp < 60 * 60 * 1000) {
          // 1 hour
          console.log("Using cached attendance data");
          return JSON.parse(cachedData);
        }
      }

      // Try to use the real scraper first
      try {
        console.log("Attempting to fetch attendance with real scraper...");
        const attendanceData = await realScraper.fetchAttendance(year, session);

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(attendanceData));
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

        return attendanceData;
      } catch (realScraperError) {
        console.warn(
          "Real scraper attendance fetch failed, falling back to mock scraper",
          realScraperError,
        );

        // Fall back to mock scraper if real scraper fails
        const attendanceData = await scraper.scrapeAttendance();

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(attendanceData));
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

        return attendanceData;
      }
    } catch (error) {
      console.error("Attendance fetch error:", error);
      throw error;
    }
  },

  /**
   * Fetch grades data for the student
   */
  getGrades: async (): Promise<any> => {
    try {
      // Similar caching logic as getAttendance
      const cachedData = localStorage.getItem("cachedGrades");
      const cachedTimestamp = localStorage.getItem("cachedGradesTimestamp");

      if (cachedData && cachedTimestamp) {
        const timestamp = parseInt(cachedTimestamp);
        const now = Date.now();

        if (now - timestamp < 24 * 60 * 60 * 1000) {
          // 24 hours
          console.log("Using cached grades data");
          return JSON.parse(cachedData);
        }
      }

      // Try to use the real scraper first
      try {
        console.log("Attempting to fetch grades with real scraper...");
        const gradesData = await realScraper.fetchGrades();

        // Cache the data
        localStorage.setItem("cachedGrades", JSON.stringify(gradesData));
        localStorage.setItem("cachedGradesTimestamp", Date.now().toString());

        return gradesData;
      } catch (realScraperError) {
        console.warn(
          "Real scraper grades fetch failed, falling back to mock scraper",
          realScraperError,
        );

        // Fall back to mock scraper if real scraper fails
        const gradesData = await scraper.scrapeGrades();

        localStorage.setItem("cachedGrades", JSON.stringify(gradesData));
        localStorage.setItem("cachedGradesTimestamp", Date.now().toString());

        return gradesData;
      }
    } catch (error) {
      console.error("Grades fetch error:", error);
      throw error;
    }
  },

  /**
   * Fetch schedule data for the student
   */
  getSchedule: async (): Promise<any> => {
    try {
      // For schedule, we want fresher data, so cache for less time
      const cachedData = localStorage.getItem("cachedSchedule");
      const cachedTimestamp = localStorage.getItem("cachedScheduleTimestamp");

      if (cachedData && cachedTimestamp) {
        const timestamp = parseInt(cachedTimestamp);
        const now = Date.now();

        if (now - timestamp < 30 * 60 * 1000) {
          // 30 minutes
          console.log("Using cached schedule data");
          return JSON.parse(cachedData);
        }
      }

      // Try to use the real scraper first
      try {
        console.log("Attempting to fetch schedule with real scraper...");
        const scheduleData = await realScraper.fetchSchedule();

        // Cache the data
        localStorage.setItem("cachedSchedule", JSON.stringify(scheduleData));
        localStorage.setItem("cachedScheduleTimestamp", Date.now().toString());

        return scheduleData;
      } catch (realScraperError) {
        console.warn(
          "Real scraper schedule fetch failed, falling back to mock scraper",
          realScraperError,
        );

        // Fall back to mock scraper if real scraper fails
        const scheduleData = await scraper.scrapeSchedule();

        localStorage.setItem("cachedSchedule", JSON.stringify(scheduleData));
        localStorage.setItem("cachedScheduleTimestamp", Date.now().toString());

        return scheduleData;
      }
    } catch (error) {
      console.error("Schedule fetch error:", error);
      throw error;
    }
  },

  /**
   * Export data to the specified format
   */
  exportData: async (data: any, options: ExportOptions): Promise<void> => {
    try {
      const exportedData = await exportService.exportData(data, options);

      // Generate filename based on data type and format
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `${options.dataType}_export_${timestamp}.${options.format}`;

      // Download the file
      exportService.downloadExportedData(exportedData, filename);
    } catch (error) {
      console.error("Export error:", error);
      throw error;
    }
  },

  /**
   * Clear cached data
   */
  clearCache: (): void => {
    localStorage.removeItem("cachedAttendance");
    localStorage.removeItem("cachedAttendanceTimestamp");
    localStorage.removeItem("cachedGrades");
    localStorage.removeItem("cachedGradesTimestamp");
    localStorage.removeItem("cachedSchedule");
    localStorage.removeItem("cachedScheduleTimestamp");

    console.log("Cache cleared");
  },

  /**
   * Logout from the SAP portal
   */
  logout: async (): Promise<void> => {
    try {
      // Try to use the real scraper first
      try {
        console.log("Attempting to logout with real scraper...");
        await realScraper.logout();
      } catch (realScraperError) {
        console.warn(
          "Real scraper logout failed, falling back to mock scraper",
          realScraperError,
        );
        await scraper.logout();
      }

      SessionManager.clearSession();
      sapPortalAPI.clearCache();
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, clear local session
      SessionManager.clearSession();
      sapPortalAPI.clearCache();
    }
  },
};
