// Student data types
export interface StudentData {
  name: string;
  rollNumber: string;
  department: string;
  semester: string;
  lastUpdated: string;
  profileImage: string;
}

// Course attendance types
export interface CourseAttendance {
  courseCode: string;
  courseName: string;
  attendancePercentage: number;
  totalClasses: number;
  attendedClasses: number;
  status: "good" | "warning" | "danger";
  lastUpdated: string;
}

// Grade data types
export interface GradeData {
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  percentage: number;
  semester: string;
  year: string;
}

// Schedule event types
export interface ScheduleEvent {
  id: string;
  title: string;
  course: string;
  instructor: string;
  location: string;
  startTime: string;
  endTime: string;
  date: Date;
  type: "lecture" | "lab" | "tutorial" | "exam";
  relativeDay?: number; // Used for mock data to set relative dates
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  type?: "login" | "connection" | "maintenance" | "timeout" | "general";
}

// Export options
export interface ExportOptions {
  dataType: string;
  format: string;
  includeHeaders: boolean;
  dateRange?: {
    from: Date | null;
    to: Date | null;
  };
}
