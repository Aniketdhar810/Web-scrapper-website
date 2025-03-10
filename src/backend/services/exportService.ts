import {
  CourseAttendance,
  GradeData,
  ScheduleEvent,
  ExportOptions,
} from "../types";

/**
 * Service for exporting data to various formats
 */
export class ExportService {
  /**
   * Export data based on the provided options
   * @param data Data to export
   * @param options Export options
   */
  public async exportData(
    data: any,
    options: ExportOptions,
  ): Promise<string | Blob> {
    const { dataType, format } = options;

    // Generate content based on data type
    let content = "";
    switch (dataType) {
      case "attendance":
        content = this.exportAttendanceToCSV(data as CourseAttendance[]);
        break;
      case "grades":
        content = this.exportGradesToCSV(data.grades as GradeData[]);
        break;
      case "schedule":
        content = this.exportScheduleToCSV(data as ScheduleEvent[]);
        break;
      default:
        throw new Error(`Unsupported data type: ${dataType}`);
    }

    // Convert to the requested format
    switch (format) {
      case "csv":
        return content;
      case "json":
        return JSON.stringify(data, null, 2);
      case "pdf":
        // In a real implementation, this would use a PDF generation library
        return this.generatePDF(data, dataType);
      case "excel":
        // In a real implementation, this would use an Excel generation library
        return this.generateExcel(data, dataType);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Export attendance data to CSV format
   * @param attendanceData Attendance data to export
   */
  public exportAttendanceToCSV(attendanceData: CourseAttendance[]): string {
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

    return this.generateCSV(headers, rows);
  }

  /**
   * Export grades data to CSV format
   * @param gradesData Grades data to export
   */
  public exportGradesToCSV(gradesData: GradeData[]): string {
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

    return this.generateCSV(headers, rows);
  }

  /**
   * Export schedule data to CSV format
   * @param scheduleData Schedule data to export
   */
  public exportScheduleToCSV(scheduleData: ScheduleEvent[]): string {
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

    return this.generateCSV(headers, rows);
  }

  /**
   * Generate CSV content from headers and rows
   * @param headers CSV headers
   * @param rows CSV data rows
   */
  private generateCSV(headers: string[], rows: string[][]): string {
    // Escape CSV values to handle commas and quotes
    const escapeCSV = (value: string) => {
      if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const headerRow = headers.map(escapeCSV).join(",");
    const dataRows = rows.map((row) => row.map(escapeCSV).join(","));

    return [headerRow, ...dataRows].join("\n");
  }

  /**
   * Generate a PDF file from data
   * @param data Data to include in the PDF
   * @param dataType Type of data being exported
   */
  private generatePDF(data: any, dataType: string): Blob {
    // In a real implementation, this would use a PDF generation library like jsPDF
    // For demo purposes, return a text blob with a message
    const content = `PDF export for ${dataType} would be generated here\n\nData: ${JSON.stringify(data, null, 2)}`;
    return new Blob([content], { type: "text/plain" });
  }

  /**
   * Generate an Excel file from data
   * @param data Data to include in the Excel file
   * @param dataType Type of data being exported
   */
  private generateExcel(data: any, dataType: string): Blob {
    // In a real implementation, this would use an Excel generation library like ExcelJS
    // For demo purposes, return a text blob with a message
    const content = `Excel export for ${dataType} would be generated here\n\nData: ${JSON.stringify(data, null, 2)}`;
    return new Blob([content], { type: "text/plain" });
  }

  /**
   * Download the exported data as a file
   * @param data Data to download
   * @param filename Name of the file to download
   */
  public downloadExportedData(data: string | Blob, filename: string): void {
    const blob =
      data instanceof Blob
        ? data
        : new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
