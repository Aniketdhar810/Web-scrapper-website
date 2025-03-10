/**
 * Service for solving CAPTCHAs encountered during scraping
 */
export class CaptchaSolver {
  private apiKey: string;
  private serviceUrl: string;
  private timeout: number = 60000; // 60 seconds timeout

  constructor(
    apiKey: string,
    service: "2captcha" | "anticaptcha" = "2captcha",
  ) {
    this.apiKey = apiKey;

    // Set the appropriate service URL based on the selected service
    if (service === "2captcha") {
      this.serviceUrl = "https://2captcha.com/in.php";
    } else {
      this.serviceUrl = "https://api.anti-captcha.com/createTask";
    }
  }

  /**
   * Solve a standard image CAPTCHA
   * @param imageBase64 The CAPTCHA image encoded as base64
   */
  public async solveImageCaptcha(imageBase64: string): Promise<string> {
    try {
      console.log("Submitting image CAPTCHA to solving service...");

      // In a real implementation, this would:
      // 1. Submit the CAPTCHA to the solving service
      // 2. Poll for the result until it's ready or timeout
      // 3. Return the solved text

      // For demo purposes, simulate the process
      await this.simulateProcessingDelay();

      // Generate a random CAPTCHA solution for demo
      const mockSolution = this.generateMockSolution();
      console.log(`CAPTCHA solved: ${mockSolution}`);

      return mockSolution;
    } catch (error) {
      console.error("Error solving image CAPTCHA:", error);
      throw new Error("Failed to solve CAPTCHA. Please try again later.");
    }
  }

  /**
   * Solve a reCAPTCHA v2
   * @param siteKey The reCAPTCHA site key
   * @param pageUrl The URL of the page containing the reCAPTCHA
   */
  public async solveRecaptchaV2(
    siteKey: string,
    pageUrl: string,
  ): Promise<string> {
    try {
      console.log(
        `Submitting reCAPTCHA v2 (${siteKey}) from ${pageUrl} to solving service...`,
      );

      // In a real implementation, this would:
      // 1. Submit the reCAPTCHA details to the solving service
      // 2. Poll for the result until it's ready or timeout
      // 3. Return the g-recaptcha-response token

      // For demo purposes, simulate the process
      await this.simulateProcessingDelay(15000); // reCAPTCHA takes longer

      // Generate a mock reCAPTCHA token
      const mockToken = this.generateMockRecaptchaToken();
      console.log("reCAPTCHA solved, token received");

      return mockToken;
    } catch (error) {
      console.error("Error solving reCAPTCHA:", error);
      throw new Error("Failed to solve reCAPTCHA. Please try again later.");
    }
  }

  /**
   * Solve a hCaptcha
   * @param siteKey The hCaptcha site key
   * @param pageUrl The URL of the page containing the hCaptcha
   */
  public async solveHCaptcha(
    siteKey: string,
    pageUrl: string,
  ): Promise<string> {
    try {
      console.log(
        `Submitting hCaptcha (${siteKey}) from ${pageUrl} to solving service...`,
      );

      // Similar to reCAPTCHA but for hCaptcha
      await this.simulateProcessingDelay(12000);

      const mockToken = this.generateMockHCaptchaToken();
      console.log("hCaptcha solved, token received");

      return mockToken;
    } catch (error) {
      console.error("Error solving hCaptcha:", error);
      throw new Error("Failed to solve hCaptcha. Please try again later.");
    }
  }

  /**
   * Simulate processing delay for demo purposes
   */
  private async simulateProcessingDelay(
    maxDelay: number = 5000,
  ): Promise<void> {
    const delay = Math.floor(Math.random() * maxDelay) + 2000;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  /**
   * Generate a mock CAPTCHA solution for demo purposes
   */
  private generateMockSolution(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const length = Math.floor(Math.random() * 3) + 4; // 4-6 characters

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return result;
  }

  /**
   * Generate a mock reCAPTCHA token for demo purposes
   */
  private generateMockRecaptchaToken(): string {
    return (
      "03AGdBq" +
      Array(90)
        .fill(0)
        .map(() => {
          const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
          return chars.charAt(Math.floor(Math.random() * chars.length));
        })
        .join("")
    );
  }

  /**
   * Generate a mock hCaptcha token for demo purposes
   */
  private generateMockHCaptchaToken(): string {
    return (
      "P1_eyJ0eX" +
      Array(100)
        .fill(0)
        .map(() => {
          const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
          return chars.charAt(Math.floor(Math.random() * chars.length));
        })
        .join("")
    );
  }
}
