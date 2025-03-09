import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  BarChart,
  BookOpen,
  Calendar,
  Filter,
  GraduationCap,
} from "lucide-react";

interface GradeData {
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  percentage: number;
  semester: string;
  year: string;
}

interface GradesSectionProps {
  grades?: GradeData[];
  cgpa?: number;
  semesterGPA?: Record<string, number>;
  isLoading?: boolean;
}

const GradesSection = ({
  grades = [
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
  ],
  cgpa = 8.7,
  semesterGPA = {
    "Fall 2023": 9.1,
    "Spring 2023": 8.4,
    "Fall 2022": 8.6,
  },
  isLoading = false,
}: GradesSectionProps) => {
  const [selectedSemester, setSelectedSemester] = React.useState<string>("All");

  // Filter grades based on selected semester
  const filteredGrades =
    selectedSemester === "All"
      ? grades
      : grades.filter(
          (grade) => `${grade.semester} ${grade.year}` === selectedSemester,
        );

  // Get unique semesters for filter
  const semesters = [
    "All",
    ...new Set(grades.map((grade) => `${grade.semester} ${grade.year}`)),
  ];

  // Calculate grade distribution
  const gradeDistribution = {
    A: grades.filter((g) => g.grade.startsWith("A")).length,
    B: grades.filter((g) => g.grade.startsWith("B")).length,
    C: grades.filter((g) => g.grade.startsWith("C")).length,
    D: grades.filter((g) => g.grade.startsWith("D")).length,
    F: grades.filter((g) => g.grade === "F").length,
  };

  // Get grade color based on letter grade
  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-500";
    if (grade.startsWith("B")) return "bg-blue-500";
    if (grade.startsWith("C")) return "bg-yellow-500";
    if (grade.startsWith("D")) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Academic Performance</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>

          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((semester) => (
                <SelectItem key={semester} value={semester}>
                  {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              CGPA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{cgpa.toFixed(1)}</div>
              <div className="text-sm text-gray-500">out of 10.0</div>
            </div>
            <Progress value={cgpa * 10} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">
                {grades.reduce((sum, grade) => sum + grade.credits, 0)}
              </div>
              <div className="text-sm text-gray-500">credits earned</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Courses Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{grades.length}</div>
              <div className="text-sm text-gray-500">total courses</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Course Grades
          </TabsTrigger>
          <TabsTrigger value="semester" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Semester GPA
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Grade Distribution
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm bg-gray-50 rounded-t-md">
              <div className="col-span-2">Course Code</div>
              <div className="col-span-4">Course Name</div>
              <div className="col-span-1 text-center">Credits</div>
              <div className="col-span-2 text-center">Grade</div>
              <div className="col-span-2 text-center">Percentage</div>
              <div className="col-span-1 text-center">Semester</div>
            </div>

            {filteredGrades.map((grade, index) => (
              <div
                key={grade.courseCode}
                className={`grid grid-cols-12 gap-4 p-4 text-sm ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-t`}
              >
                <div className="col-span-2 font-medium">{grade.courseCode}</div>
                <div className="col-span-4">{grade.courseName}</div>
                <div className="col-span-1 text-center">{grade.credits}</div>
                <div className="col-span-2 flex justify-center">
                  <Badge className={`${getGradeColor(grade.grade)} text-white`}>
                    {grade.grade}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <Progress value={grade.percentage} className="h-2" />
                    <span className="text-xs">{grade.percentage}%</span>
                  </div>
                </div>
                <div className="col-span-1 text-center text-gray-500">
                  {grade.semester} {grade.year}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="semester" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(semesterGPA).map(([semester, gpa]) => (
              <Card key={semester}>
                <CardHeader>
                  <CardTitle className="text-lg">{semester}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between mb-2">
                    <div className="text-2xl font-bold">{gpa.toFixed(1)}</div>
                    <div className="text-sm text-gray-500">GPA</div>
                  </div>
                  <Progress value={gpa * 10} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(gradeDistribution).map(([grade, count]) => (
                  <div key={grade} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Grade {grade}</div>
                      <div className="text-sm text-gray-500">
                        {count} courses
                      </div>
                    </div>
                    <Progress
                      value={(count / grades.length) * 100}
                      className={`h-2 ${getGradeColor(grade)}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button variant="outline" className="mr-2">
          Download Report
        </Button>
        <Button>View Full Transcript</Button>
      </div>
    </div>
  );
};

export default GradesSection;
