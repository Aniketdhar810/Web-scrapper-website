import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Calendar, Clock, Filter, Download } from "lucide-react";

interface CourseAttendance {
  courseCode: string;
  courseName: string;
  attendancePercentage: number;
  totalClasses: number;
  attendedClasses: number;
  status: "good" | "warning" | "danger";
  lastUpdated: string;
}

interface AttendanceSectionProps {
  courses?: CourseAttendance[];
  semester?: string;
  department?: string;
}

const AttendanceSection = ({
  courses = [
    {
      courseCode: "CSE101",
      courseName: "Introduction to Computer Science",
      attendancePercentage: 85,
      totalClasses: 24,
      attendedClasses: 20,
      status: "good" as const,
      lastUpdated: "2023-06-15",
    },
    {
      courseCode: "MAT201",
      courseName: "Advanced Mathematics",
      attendancePercentage: 72,
      totalClasses: 18,
      attendedClasses: 13,
      status: "warning" as const,
      lastUpdated: "2023-06-14",
    },
    {
      courseCode: "PHY102",
      courseName: "Physics Fundamentals",
      attendancePercentage: 65,
      totalClasses: 20,
      attendedClasses: 13,
      status: "danger" as const,
      lastUpdated: "2023-06-13",
    },
    {
      courseCode: "ENG103",
      courseName: "Technical Communication",
      attendancePercentage: 90,
      totalClasses: 15,
      attendedClasses: 14,
      status: "good" as const,
      lastUpdated: "2023-06-15",
    },
    {
      courseCode: "CSE205",
      courseName: "Data Structures and Algorithms",
      attendancePercentage: 78,
      totalClasses: 22,
      attendedClasses: 17,
      status: "warning" as const,
      lastUpdated: "2023-06-14",
    },
  ],
  semester = "Spring 2023",
  department = "Computer Science and Engineering",
}: AttendanceSectionProps) => {
  const [view, setView] = useState<"card" | "list">("card");
  const [filter, setFilter] = useState<"all" | "good" | "warning" | "danger">(
    "all",
  );

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "good":
        return "default";
      case "warning":
        return "secondary";
      case "danger":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Attendance Overview</h2>
          <p className="text-gray-500">
            {semester} - {department}
          </p>
        </div>
        <div className="flex space-x-4">
          <Select
            value={filter}
            onValueChange={(value: any) => setFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="good">Good Standing</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="danger">Critical</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex bg-gray-100 rounded-md">
            <Button
              variant={view === "card" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("card")}
              className="rounded-r-none"
            >
              Card View
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              className="rounded-l-none"
            >
              List View
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="current">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="previous">Previous Semesters</TabsTrigger>
          <TabsTrigger value="overall">Overall Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {view === "card" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className={`h-2 ${getStatusColor(course.status)}`} />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {course.courseCode}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          {course.courseName}
                        </p>
                      </div>
                      <Badge variant={getStatusVariant(course.status)}>
                        {course.attendancePercentage}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress
                      value={course.attendancePercentage}
                      className="h-2 mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>
                        Attended: {course.attendedClasses}/{course.totalClasses}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.lastUpdated}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border-b">Course Code</th>
                    <th className="text-left p-3 border-b">Course Name</th>
                    <th className="text-center p-3 border-b">Attendance</th>
                    <th className="text-center p-3 border-b">Classes</th>
                    <th className="text-center p-3 border-b">Status</th>
                    <th className="text-center p-3 border-b">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{course.courseCode}</td>
                      <td className="p-3 border-b">{course.courseName}</td>
                      <td className="p-3 border-b text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-medium">
                            {course.attendancePercentage}%
                          </span>
                          <Progress
                            value={course.attendancePercentage}
                            className="h-1.5 w-24 mt-1"
                          />
                        </div>
                      </td>
                      <td className="p-3 border-b text-center">
                        {course.attendedClasses}/{course.totalClasses}
                      </td>
                      <td className="p-3 border-b text-center">
                        <Badge variant={getStatusVariant(course.status)}>
                          {course.status === "good"
                            ? "Good"
                            : course.status === "warning"
                              ? "Warning"
                              : "Critical"}
                        </Badge>
                      </td>
                      <td className="p-3 border-b text-center text-sm text-gray-500">
                        {course.lastUpdated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Attendance Data
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="previous">
          <div className="p-8 text-center text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Previous Semester Data</h3>
            <p>Historical attendance data will be displayed here.</p>
          </div>
        </TabsContent>

        <TabsContent value="overall">
          <div className="p-8 text-center text-gray-500">
            <Filter className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Overall Statistics</h3>
            <p>
              Comprehensive attendance statistics across all semesters will be
              displayed here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceSection;
