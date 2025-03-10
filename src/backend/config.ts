/**
 * Configuration for the SAP Portal scraper
 */
export const config = {
  // SAP Portal URLs
  portal: {
    baseUrl: "https://kiitportal.kiituniversity.net/irj/portal",
    loginUrl: "https://kiitportal.kiituniversity.net/irj/portal/login",
    attendanceUrl:
      "https://kiitportal.kiituniversity.net/irj/portal/attendance",
    gradesUrl: "https://kiitportal.kiituniversity.net/irj/portal/grades",
    scheduleUrl: "https://kiitportal.kiituniversity.net/irj/portal/schedule",
    profileUrl: "https://kiitportal.kiituniversity.net/irj/portal/profile",
  },

  // Scraper settings
  scraper: {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 2000, // 2 seconds
  },

  // Session settings
  session: {
    expiryHours: 2,
    renewBeforeExpiryMinutes: 10,
  },

  // Cache settings
  cache: {
    attendanceTTL: 60 * 60 * 1000, // 1 hour
    gradesTTL: 24 * 60 * 60 * 1000, // 24 hours
    scheduleTTL: 30 * 60 * 1000, // 30 minutes
  },

  // CAPTCHA solver settings
  captcha: {
    service: "2captcha", // or "anticaptcha"
    apiKey: process.env.CAPTCHA_API_KEY || "",
    timeout: 60000, // 60 seconds
  },

  // Proxy settings
  proxy: {
    enabled: false,
    rotationStrategy: "round-robin", // or "random", "least-used"
    maxConsecutiveFailures: 3,
    banDuration: 30 * 60 * 1000, // 30 minutes
  },

  // Security settings
  security: {
    encryptCredentials: true,
    encryptionAlgorithm: "AES-GCM",
  },

  // Export settings
  export: {
    defaultFormat: "csv",
    availableFormats: ["csv", "json", "pdf", "excel"],
  },

  // Debug settings
  debug: {
    enabled: process.env.NODE_ENV === "development",
    logRequests: true,
    logResponses: false,
    saveScreenshots: false,
    screenshotPath: "./screenshots",
  },
};
