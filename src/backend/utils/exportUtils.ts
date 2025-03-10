import { ExportOptions } from "../types";
import { exportAttendanceToCSV } from "../services/attendance";
import { exportGradesToCSV } from "../services/grades";
import { exportScheduleToCSV } from "../services/schedule";

/**
 * Export data based on the provided options
 */
export const exportData = async (
  data: any,
  options: ExportOptions,
): Promise<string | Blob> => {
  const { dataType, format } = options;

  // Generate CSV content based on data type
  let csvContent = "";
  switch (dataType) {
    case "attendance":
      csvContent = exportAttendanceToCSV(data);
      break;
    case "grades":
      csvContent = exportGradesToCSV(data);
      break;
    case "schedule":
      csvContent = exportScheduleToCSV(data);
      break;
    default:
      throw new Error(`Unsupported data type: ${dataType}`);
  }

  // Convert to the requested format
  switch (format) {
    case "csv":
      return csvContent;
    case "json":
      return JSON.stringify(data, null, 2);
    case "pdf":
      // In a real implementation, this would use a PDF generation library
      // For demo purposes, we'll just return a message
      return new Blob([`PDF export for ${dataType} would be generated here`], {
        type: "text/plain",
      });
    case "excel":
      // In a real implementation, this would use an Excel generation library
      // For demo purposes, we'll just return the CSV content
      return csvContent;
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
};

/**
 * Download the exported data as a file
 */
export const downloadExportedData = (
  data: string | Blob,
  filename: string,
): void => {
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
};
