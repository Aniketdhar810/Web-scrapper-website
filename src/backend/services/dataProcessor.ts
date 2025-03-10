import { CourseAttendance, GradeData, ScheduleEvent } from "../types";

/**
 * Service for processing and formatting scraped data
 */
export class DataProcessor {
  /**
   * Process attendance data from raw HTML
   * @param html Raw HTML from the attendance page
   */
  public processAttendanceData(html: string): CourseAttendance[] {
    try {
      console.log("Processing attendance data...");

      // In a real implementation, this would:
      // 1. Parse the HTML using a library like Cheerio
      // 2. Extract the attendance data using selectors
      // 3. Format the data into the CourseAttendance structure

      // For demo purposes, return mock data
      return [
        {
          courseCode: "CSE101",
          courseName: "Introduction to Computer Science",
          attendancePercentage: 85,
          totalClasses: 24,
          attendedClasses: 20,
          status: "good",
          lastUpdated: new Date().toLocaleDateString(),
        },
        {
          courseCode: "MAT201",
          courseName: "Advanced Mathematics",
          attendancePercentage: 72,
          totalClasses: 18,
          attendedClasses: 13,
          status: "warning",
          lastUpdated: new Date(Date.now() - 86400000).toLocaleDateString(),
        },
        {
          courseCode: "PHY102",
          courseName: "Physics Fundamentals",
          attendancePercentage: 65,
          totalClasses: 20,
          attendedClasses: 13,
          status: "danger",
          lastUpdated: new Date(Date.now() - 172800000).toLocaleDateString(),
        },
      ];
    } catch (error) {
      console.error("Error processing attendance data:", error);
      throw new Error("Failed to process attendance data");
    }
  }

  /**
   * Process grades data from raw HTML
   * @param html Raw HTML from the grades page
   */
  public processGradesData(html: string): {
    grades: GradeData[];
    cgpa: number;
    semesterGPA: Record<string, number>;
  } {
    try {
      console.log("Processing grades data...");

      // In a real implementation, this would parse the HTML and extract grades

      // For demo purposes, return mock data
      return {
        grades: [
          {
            courseCode: "CSE101",
            courseName: "Introduction to Computer Science",
            credits: 4,
            grade: "A",
            percentage: 92,
            semester: "Fall",
            year: "2023",
          },
          {
            courseCode: "MAT201",
            courseName: "Calculus II",
            credits: 3,
            grade: "B+",
            percentage: 87,
            semester: "Fall",
            year: "2023",
          },
          {
            courseCode: "PHY101",
            courseName: "Physics I",
            credits: 4,
            grade: "A-",
            percentage: 89,
            semester: "Fall",
            year: "2023",
          },
        ],
        cgpa: 8.7,
        semesterGPA: {
          "Fall 2023": 9.1,
          "Spring 2023": 8.4,
          "Fall 2022": 8.6,
        },
      };
    } catch (error) {
      console.error("Error processing grades data:", error);
      throw new Error("Failed to process grades data");
    }
  }

  /**
   * Process schedule data from raw HTML
   * @param html Raw HTML from the schedule page
   */
  public processScheduleData(html: string): ScheduleEvent[] {
    try {
      console.log("Processing schedule data...");

      // In a real implementation, this would parse the HTML and extract schedule

      // For demo purposes, return mock data with current dates
      const today = new Date();

      return [
        {
          id: "1",
          title: "Data Structures",
          course: "CS201",
          instructor: "Dr. Smith",
          location: "Room 301",
          startTime: "10:00 AM",
          endTime: "11:30 AM",
          date: today,
          type: "lecture",
        },
        {
          id: "2",
          title: "Database Systems Lab",
          course: "CS302",
          instructor: "Prof. Johnson",
          location: "Lab 102",
          startTime: "2:00 PM",
          endTime: "4:00 PM",
          date: today,
          type: "lab",
        },
        {
          id: "3",
          title: "Software Engineering",
          course: "CS401",
          instructor: "Dr. Williams",
          location: "Room 205",
          startTime: "9:00 AM",
          endTime: "10:30 AM",
          date: new Date(today.getTime() + 86400000), // Tomorrow
          type: "lecture",
        },
      ];
    } catch (error) {
      console.error("Error processing schedule data:", error);
      throw new Error("Failed to process schedule data");
    }
  }

  /**
   * Calculate attendance status based on percentage
   * @param percentage Attendance percentage
   */
  public calculateAttendanceStatus(
    percentage: number,
  ): "good" | "warning" | "danger" {
    if (percentage >= 80) {
      return "good";
    } else if (percentage >= 70) {
      return "warning";
    } else {
      return "danger";
    }
  }

  /**
   * Convert grade letter to GPA points
   * @param grade Grade letter (e.g., "A", "B+")
   */
  public gradeToPoints(grade: string): number {
    const gradeMap: Record<string, number> = {
      "A+": 10.0,
      A: 9.0,
      "A-": 8.5,
      "B+": 8.0,
      B: 7.5,
      "B-": 7.0,
      "C+": 6.5,
      C: 6.0,
      "C-": 5.5,
      "D+": 5.0,
      D: 4.5,
      F: 0.0,
    };

    return gradeMap[grade] || 0;
  }

  /**
   * Calculate CGPA from grades
   * @param grades List of grade data
   */
  public calculateCGPA(grades: GradeData[]): number {
    if (grades.length === 0) return 0;

    let totalPoints = 0;
    let totalCredits = 0;

    for (const grade of grades) {
      const points = this.gradeToPoints(grade.grade);
      totalPoints += points * grade.credits;
      totalCredits += grade.credits;
    }

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }
}
