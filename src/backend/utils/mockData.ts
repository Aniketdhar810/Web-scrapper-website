import {
  CourseAttendance,
  GradeData,
  ScheduleEvent,
  StudentData,
} from "../types";

// Mock student data
export const mockStudentData: StudentData = {
  name: "John Doe",
  rollNumber: "2021KIIT1234",
  department: "Computer Science and Engineering",
  semester: "Spring 2023",
  lastUpdated: new Date().toLocaleString(),
  profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

// Mock attendance data
export const mockAttendanceData: CourseAttendance[] = [
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
    lastUpdated: new Date(Date.now() - 86400000).toLocaleDateString(), // Yesterday
  },
  {
    courseCode: "PHY102",
    courseName: "Physics Fundamentals",
    attendancePercentage: 65,
    totalClasses: 20,
    attendedClasses: 13,
    status: "danger",
    lastUpdated: new Date(Date.now() - 172800000).toLocaleDateString(), // 2 days ago
  },
  {
    courseCode: "ENG103",
    courseName: "Technical Communication",
    attendancePercentage: 90,
    totalClasses: 15,
    attendedClasses: 14,
    status: "good",
    lastUpdated: new Date().toLocaleDateString(),
  },
  {
    courseCode: "CSE205",
    courseName: "Data Structures and Algorithms",
    attendancePercentage: 78,
    totalClasses: 22,
    attendedClasses: 17,
    status: "warning",
    lastUpdated: new Date(Date.now() - 86400000).toLocaleDateString(), // Yesterday
  },
];

// Mock grades data
export const mockGradesData: GradeData[] = [
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
  {
    courseCode: "ENG102",
    courseName: "Technical Writing",
    credits: 2,
    grade: "A",
    percentage: 94,
    semester: "Spring",
    year: "2023",
  },
  {
    courseCode: "CSE201",
    courseName: "Data Structures",
    credits: 4,
    grade: "B",
    percentage: 83,
    semester: "Spring",
    year: "2023",
  },
];

// Mock schedule data
export const mockScheduleData: ScheduleEvent[] = [
  {
    id: "1",
    title: "Data Structures",
    course: "CS201",
    instructor: "Dr. Smith",
    location: "Room 301",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    date: new Date(), // Will be replaced with current date
    type: "lecture",
    relativeDay: 0, // Today
  },
  {
    id: "2",
    title: "Database Systems Lab",
    course: "CS302",
    instructor: "Prof. Johnson",
    location: "Lab 102",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    date: new Date(), // Will be replaced with current date
    type: "lab",
    relativeDay: 0, // Today
  },
  {
    id: "3",
    title: "Software Engineering",
    course: "CS401",
    instructor: "Dr. Williams",
    location: "Room 205",
    startTime: "9:00 AM",
    endTime: "10:30 AM",
    date: new Date(), // Will be replaced with tomorrow's date
    type: "lecture",
    relativeDay: 1, // Tomorrow
  },
  {
    id: "4",
    title: "Algorithms Mid-term Exam",
    course: "CS301",
    instructor: "Dr. Brown",
    location: "Exam Hall 1",
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    date: new Date(), // Will be replaced with day after tomorrow's date
    type: "exam",
    relativeDay: 2, // Day after tomorrow
  },
  {
    id: "5",
    title: "Computer Networks",
    course: "CS405",
    instructor: "Dr. Garcia",
    location: "Room 401",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    date: new Date(), // Will be replaced with day after tomorrow's date
    type: "lecture",
    relativeDay: 2, // Day after tomorrow
  },
];
