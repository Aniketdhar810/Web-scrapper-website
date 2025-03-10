import { handleNetworkError } from "../utils/errorHandling";
import { mockAttendanceData } from "../utils/mockData";
import { mockGradesData } from "../utils/mockData";
import { mockScheduleData } from "../utils/mockData";
import { isAuthenticated } from "../utils/sessionUtils";
import { ApiError } from "../types";

/**
 * Main scraper service for KIIT SAP Portal
 * This would use a headless browser in a real implementation
 */
export class KIITPortalScraper {
  private baseUrl = "https://kiitportal.kiituniversity.net/irj/portal";
  private sessionId: string | null = null;
  private userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
  private proxyList: string[] = [];
  private currentProxy: string | null = null;
  private captchaSolverApiKey: string | null = null;
  private maxRetries = 3;
  private loginAttempts = 0;

  constructor(captchaApiKey?: string, proxies?: string[]) {
    if (captchaApiKey) {
      this.captchaSolverApiKey = captchaApiKey;
    }

    if (proxies && proxies.length > 0) {
      this.proxyList = proxies;
      this.rotateProxy();
    }
  }

  /**
   * Authenticate with the SAP portal
   */
  public async login(credentials: {
    rollNumber: string;
    password: string;
  }): Promise<boolean> {
    try {
      // In a real implementation, this would:
      // 1. Initialize a headless browser (Puppeteer/Playwright)
      // 2. Navigate to the login page
      // 3. Handle any CAPTCHA using the solver service
      // 4. Input credentials and submit the form
      // 5. Check for successful login
      // 6. Store cookies/session information

      // For demo purposes, we'll simulate the process
      console.log(
        `Attempting to log in to ${this.baseUrl} with roll number ${credentials.rollNumber}`,
      );

      if (this.loginAttempts >= this.maxRetries) {
        throw this.createError(
          "Too many failed login attempts. Please try again later.",
          "login",
        );
      }

      this.loginAttempts++;

      // Simulate network delay
      await this.simulateNetworkDelay();

      // Check if credentials are provided
      if (!credentials.rollNumber || !credentials.password) {
        throw this.createError(
          "Roll number and password are required",
          "login",
        );
      }

      // For demo purposes, any non-empty credentials will work
      this.sessionId = `sap-session-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      sessionStorage.setItem("sapSession", this.sessionId);

      console.log("Login successful, session established");
      this.loginAttempts = 0;
      return true;
    } catch (error) {
      // If login fails, rotate proxy and retry if attempts remain
      this.rotateProxy();
      if (error instanceof Error) {
        throw this.createError(error.message, "login");
      }
      throw error;
    }
  }

  /**
   * Scrape attendance data from the portal
   */
  public async scrapeAttendance(): Promise<any> {
    try {
      this.ensureAuthenticated();

      // In a real implementation, this would:
      // 1. Navigate to the attendance page
      // 2. Wait for the page to load completely (including JS rendering)
      // 3. Extract the attendance data using selectors
      // 4. Parse and format the data

      console.log("Scraping attendance data...");
      await this.simulateNetworkDelay(1500);

      // For demo purposes, return mock data
      return mockAttendanceData;
    } catch (error) {
      return this.handleScrapingError(
        error,
        "Failed to scrape attendance data",
      );
    }
  }

  /**
   * Scrape grades data from the portal
   */
  public async scrapeGrades(): Promise<any> {
    try {
      this.ensureAuthenticated();

      console.log("Scraping grades data...");
      await this.simulateNetworkDelay(1800);

      // For demo purposes, return mock data
      return {
        grades: mockGradesData,
        cgpa: 8.7,
        semesterGPA: {
          "Fall 2023": 9.1,
          "Spring 2023": 8.4,
          "Fall 2022": 8.6,
        },
      };
    } catch (error) {
      return this.handleScrapingError(error, "Failed to scrape grades data");
    }
  }

  /**
   * Scrape schedule data from the portal
   */
  public async scrapeSchedule(): Promise<any> {
    try {
      this.ensureAuthenticated();

      console.log("Scraping schedule data...");
      await this.simulateNetworkDelay(1200);

      // For demo purposes, return mock data with current dates
      return mockScheduleData.map((event) => {
        // Create a copy of the event to avoid modifying the original mock data
        const updatedEvent = { ...event };

        // For events with relative days, calculate the actual date
        if (event.relativeDay === 0) {
          updatedEvent.date = new Date();
        } else if (event.relativeDay > 0) {
          const date = new Date();
          date.setDate(date.getDate() + event.relativeDay);
          updatedEvent.date = date;
        }

        return updatedEvent;
      });
    } catch (error) {
      return this.handleScrapingError(error, "Failed to scrape schedule data");
    }
  }

  /**
   * Scrape student profile data from the portal
   */
  public async scrapeProfile(): Promise<any> {
    try {
      this.ensureAuthenticated();

      console.log("Scraping profile data...");
      await this.simulateNetworkDelay(1000);

      // For demo purposes, return mock data
      return {
        name: "John Doe",
        rollNumber: "2021KIIT1234",
        department: "Computer Science and Engineering",
        semester: "Spring 2023",
        email: "john.doe@kiit.ac.in",
        phone: "+91 9876543210",
        address: "KIIT University, Bhubaneswar, Odisha",
        admissionYear: "2021",
        program: "B.Tech",
        batch: "2021-2025",
        currentYear: "3",
        feeStatus: "Paid",
        lastUpdated: new Date().toLocaleString(),
      };
    } catch (error) {
      return this.handleScrapingError(error, "Failed to scrape profile data");
    }
  }

  /**
   * Logout from the portal
   */
  public async logout(): Promise<void> {
    try {
      if (!this.sessionId) {
        console.log("No active session to logout from");
        return;
      }

      console.log("Logging out from SAP portal...");
      await this.simulateNetworkDelay(500);

      // Clear session
      this.sessionId = null;
      sessionStorage.removeItem("sapSession");
      localStorage.removeItem("studentData");

      console.log("Logout successful");
    } catch (error) {
      console.error("Error during logout:", error);
      // Even if logout fails, clear local session
      this.sessionId = null;
      sessionStorage.removeItem("sapSession");
      localStorage.removeItem("studentData");
    }
  }

  /**
   * Solve CAPTCHA using external service
   * In a real implementation, this would use a service like 2Captcha or Anti-Captcha
   */
  private async solveCaptcha(captchaUrl: string): Promise<string> {
    if (!this.captchaSolverApiKey) {
      throw this.createError("CAPTCHA solver not configured", "general");
    }

    console.log(`Solving CAPTCHA from ${captchaUrl}...`);
    await this.simulateNetworkDelay(2000);

    // In a real implementation, this would send the CAPTCHA to a solving service
    // For demo purposes, return a mock solution
    return "MOCK_CAPTCHA_SOLUTION";
  }

  /**
   * Rotate to a different proxy
   */
  private rotateProxy(): void {
    if (this.proxyList.length === 0) {
      this.currentProxy = null;
      return;
    }

    const randomIndex = Math.floor(Math.random() * this.proxyList.length);
    this.currentProxy = this.proxyList[randomIndex];
    console.log(`Rotated to proxy: ${this.currentProxy}`);
  }

  /**
   * Ensure the user is authenticated before making requests
   */
  private ensureAuthenticated(): void {
    if (!isAuthenticated()) {
      throw this.createError("User is not authenticated", "login");
    }

    // In a real implementation, this would also check if the session is still valid
    // and refresh it if necessary
  }

  /**
   * Handle scraping errors consistently
   */
  private handleScrapingError(error: any, defaultMessage: string): never {
    if (error instanceof Error) {
      // Check if it's a session error and try to refresh the session
      if (
        error.message.includes("session") ||
        error.message.includes("authentication")
      ) {
        // Clear session and force re-login
        this.sessionId = null;
        sessionStorage.removeItem("sapSession");
      }

      throw this.createError(
        error.message,
        this.determineErrorType(error.message),
      );
    }

    throw this.createError(defaultMessage, "general");
  }

  /**
   * Create a standardized error object
   */
  private createError(message: string, type: string): ApiError {
    return {
      message,
      type: type as any,
      code: `ERR_${type.toUpperCase()}`,
    };
  }

  /**
   * Determine error type based on error message
   */
  private determineErrorType(message: string): string {
    if (
      message.includes("authentication") ||
      message.includes("login") ||
      message.includes("password")
    ) {
      return "login";
    } else if (
      message.includes("network") ||
      message.includes("connection") ||
      message.includes("offline")
    ) {
      return "connection";
    } else if (message.includes("maintenance")) {
      return "maintenance";
    } else if (message.includes("timeout") || message.includes("timed out")) {
      return "timeout";
    }
    return "general";
  }

  /**
   * Simulate network delay for demo purposes
   */
  private async simulateNetworkDelay(maxDelay: number = 1000): Promise<void> {
    const delay = Math.floor(Math.random() * maxDelay) + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
