/**
 * Utility functions for handling CSRF tokens
 */

/**
 * Extract CSRF token from HTML content
 * @param html HTML content to extract token from
 */
export function extractCSRFToken(html: string): string | null {
  try {
    // Common patterns for CSRF tokens in forms
    const patterns = [
      /<input[^>]*name=["']csrf[_-]token["'][^>]*value=["']([^"']+)["'][^>]*>/i,
      /<input[^>]*value=["']([^"']+)["'][^>]*name=["']csrf[_-]token["'][^>]*>/i,
      /<meta[^>]*name=["']csrf[_-]token["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']csrf[_-]token["'][^>]*>/i,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // Look for other common token patterns if the above didn't match
    const otherPatterns = [
      /_token["']\s*:\s*["']([^"']+)["']/i, // JavaScript object property
      /var\s+csrfToken\s*=\s*["']([^"']+)["']/i, // JavaScript variable
      /data-csrf["']\s*=\s*["']([^"']+)["']/i, // data attribute
    ];

    for (const pattern of otherPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  } catch (error) {
    console.error("Error extracting CSRF token:", error);
    return null;
  }
}

/**
 * Generate headers with CSRF token
 * @param csrfToken CSRF token to include in headers
 */
export function generateCSRFHeaders(csrfToken: string): Record<string, string> {
  return {
    "X-CSRF-Token": csrfToken,
    "X-Requested-With": "XMLHttpRequest",
  };
}

/**
 * Add CSRF token to form data
 * @param formData Form data to add token to
 * @param csrfToken CSRF token to add
 */
export function addCSRFToFormData(
  formData: FormData,
  csrfToken: string,
): FormData {
  formData.append("csrf_token", csrfToken);
  return formData;
}
