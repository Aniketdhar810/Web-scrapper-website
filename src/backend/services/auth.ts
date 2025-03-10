import { StudentData } from "../types";
import { handleNetworkError } from "../utils/errorHandling";
import { mockStudentData } from "../utils/mockData";

/**
 * Login to the SAP portal
 * In a real implementation, this would use fetch or axios to make a request to the SAP portal
 */
export const loginToSAP = async (credentials: {
  rollNumber: string;
  password: string;
}): Promise<StudentData> => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo purposes, we'll use mock data
    // In a real implementation, this would be a fetch request to the SAP portal
    if (credentials.rollNumber && credentials.password) {
      // Store session information
      const sessionToken = `mock-token-${Date.now()}`;
      sessionStorage.setItem("sapSession", sessionToken);

      // Generate student data based on the roll number
      const studentData: StudentData = {
        ...mockStudentData,
        name: generateNameFromRoll(credentials.rollNumber),
        rollNumber: credentials.rollNumber,
        profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.rollNumber}`,
      };

      // Store student data in localStorage for persistence
      localStorage.setItem("studentData", JSON.stringify(studentData));

      return studentData;
    } else {
      throw new Error("Please enter both roll number and password.");
    }
  } catch (error) {
    return handleNetworkError(error, "Authentication failed");
  }
};

/**
 * Check if the user is already logged in
 */
export const checkAuthStatus = (): StudentData | null => {
  const sessionToken = sessionStorage.getItem("sapSession");
  const studentDataStr = localStorage.getItem("studentData");

  if (sessionToken && studentDataStr) {
    try {
      return JSON.parse(studentDataStr);
    } catch (e) {
      return null;
    }
  }

  return null;
};

/**
 * Generate a name from roll number for demo purposes
 */
const generateNameFromRoll = (rollNumber: string): string => {
  const firstNames = [
    "John",
    "Jane",
    "Alex",
    "Sarah",
    "Rahul",
    "Priya",
    "Amit",
    "Neha",
  ];
  const lastNames = [
    "Doe",
    "Smith",
    "Johnson",
    "Williams",
    "Sharma",
    "Patel",
    "Kumar",
    "Singh",
  ];

  // Use the roll number to deterministically select a name
  const sum = rollNumber
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const firstName = firstNames[sum % firstNames.length];
  const lastName = lastNames[(sum * 2) % lastNames.length];

  return `${firstName} ${lastName}`;
};
