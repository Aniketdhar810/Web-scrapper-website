# SAP Portal Companion Backend

This directory contains the backend functionality for the SAP Portal Companion application. It handles authentication, data retrieval, and processing from the KIIT SAP Portal.

## Directory Structure

- `/api`: Main API interface for the frontend to interact with backend services
- `/services`: Core services for authentication and data retrieval
  - `auth.ts`: Handles authentication with the SAP portal
  - `attendance.ts`: Retrieves and processes attendance data
  - `grades.ts`: Retrieves and processes grades data
  - `schedule.ts`: Retrieves and processes schedule data
- `/types`: TypeScript type definitions
- `/utils`: Utility functions
  - `errorHandling.ts`: Error handling utilities
  - `exportUtils.ts`: Data export utilities
  - `mockData.ts`: Mock data for development and testing
  - `sessionUtils.ts`: Session management utilities

## Implementation Notes

This is a client-side implementation that simulates backend functionality. In a production environment, sensitive operations like authentication and data scraping would be handled by a secure server-side implementation to protect user credentials and handle anti-bot measures.

For demonstration purposes, this implementation uses:

1. Mock data to simulate responses from the SAP portal
2. Local storage and session storage for persistence
3. Simulated network delays to mimic real-world behavior

## Security Considerations

In a real-world implementation, consider the following security measures:

1. Never store passwords in local storage or session storage
2. Use HTTPS for all communications
3. Implement proper session management with secure cookies
4. Consider using a server-side proxy for sensitive operations
5. Implement rate limiting to prevent abuse
6. Add CAPTCHA handling capabilities for authentication
