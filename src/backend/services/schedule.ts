import { ScheduleEvent } from "../types";
import { handleNetworkError } from "../utils/errorHandling";
import { mockScheduleData } from "../utils/mockData";
import { isAuthenticated } from "../utils/sessionUtils";

/**
 * Fetch schedule data from the SAP portal
 */
export const fetchSchedule = async (): Promise<ScheduleEvent[]> => {
  try {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      throw new Error("User is not authenticated");
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // In a real implementation, this would be a fetch request to the SAP portal
    // For demo purposes, we'll use mock data with current dates
    return mockScheduleData.map((event) => {
      // Create a copy of the event to avoid modifying the original mock data
      const updatedEvent = { ...event };

      // For events with relative dates (today, tomorrow, etc.), calculate the actual date
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
    return handleNetworkError(error, "Failed to fetch schedule data");
  }
};

/**
 * Export schedule data to CSV format
 */
export const exportScheduleToCSV = (scheduleData: ScheduleEvent[]): string => {
  const headers = [
    "Date",
    "Title",
    "Course",
    "Instructor",
    "Location",
    "Start Time",
    "End Time",
    "Type",
  ];

  const rows = scheduleData.map((event) => [
    event.date.toLocaleDateString(),
    event.title,
    event.course,
    event.instructor,
    event.location,
    event.startTime,
    event.endTime,
    event.type,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
};
