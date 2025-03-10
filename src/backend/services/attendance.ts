import { CourseAttendance } from "../types";
import { handleNetworkError } from "../utils/errorHandling";
import { mockAttendanceData } from "../utils/mockData";
import { isAuthenticated } from "../utils/sessionUtils";

/**
 * Fetch attendance data from the SAP portal
 */
export const fetchAttendance = async (): Promise<CourseAttendance[]> => {
  try {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      throw new Error("User is not authenticated");
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real implementation, this would be a fetch request to the SAP portal
    // For demo purposes, we'll use mock data
    return mockAttendanceData;
  } catch (error) {
    return handleNetworkError(error, "Failed to fetch attendance data");
  }
};

/**
 * Export attendance data to CSV format
 */
export const exportAttendanceToCSV = (
  attendanceData: CourseAttendance[],
): string => {
  const headers = [
    "Course Code",
    "Course Name",
    "Attendance Percentage",
    "Total Classes",
    "Attended Classes",
    "Status",
    "Last Updated",
  ];

  const rows = attendanceData.map((course) => [
    course.courseCode,
    course.courseName,
    course.attendancePercentage.toString(),
    course.totalClasses.toString(),
    course.attendedClasses.toString(),
    course.status,
    course.lastUpdated,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
};
