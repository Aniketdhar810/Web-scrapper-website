import { GradeData } from "../types";
import { handleNetworkError } from "../utils/errorHandling";
import { mockGradesData } from "../utils/mockData";
import { isAuthenticated } from "../utils/sessionUtils";

/**
 * Fetch grades data from the SAP portal
 */
export const fetchGrades = async (): Promise<{
  grades: GradeData[];
  cgpa: number;
  semesterGPA: Record<string, number>;
}> => {
  try {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      throw new Error("User is not authenticated");
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1800));

    // In a real implementation, this would be a fetch request to the SAP portal
    // For demo purposes, we'll use mock data
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
    return handleNetworkError(error, "Failed to fetch grades data");
  }
};

/**
 * Export grades data to CSV format
 */
export const exportGradesToCSV = (gradesData: GradeData[]): string => {
  const headers = [
    "Course Code",
    "Course Name",
    "Credits",
    "Grade",
    "Percentage",
    "Semester",
    "Year",
  ];

  const rows = gradesData.map((grade) => [
    grade.courseCode,
    grade.courseName,
    grade.credits.toString(),
    grade.grade,
    grade.percentage.toString(),
    grade.semester,
    grade.year,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
};
