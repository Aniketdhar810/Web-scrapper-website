import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Download, FileText, BarChart, Table, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import AttendanceSection from "./AttendanceSection";
import GradesSection from "./GradesSection";
import ScheduleSection from "./ScheduleSection";

interface DataPanelProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  studentData?: {
    name?: string;
    rollNumber?: string;
    department?: string;
    semester?: string;
    lastUpdated?: string;
  };
}

const DataPanel = ({
  activeTab = "attendance",
  onTabChange = () => {},
  studentData = {
    name: "John Doe",
    rollNumber: "2021KIIT1234",
    department: "Computer Science and Engineering",
    semester: "Spring 2023",
    lastUpdated: "2023-06-15 14:30",
  },
}: DataPanelProps) => {
  const [selectedSection, setSelectedSection] = useState<string>(activeTab);

  const handleTabChange = (value: string) => {
    setSelectedSection(value);
    onTabChange(value);
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Student Info Header */}
      <div className="bg-gray-50 p-4 border-b">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold">{studentData.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <span>Roll: {studentData.rollNumber}</span>
              <span>•</span>
              <span>{studentData.department}</span>
              <span>•</span>
              <span>{studentData.semester}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Last updated: {studentData.lastUpdated}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export All Data
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Tabs
          value={selectedSection}
          onValueChange={handleTabChange}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="border-b bg-gray-50">
            <div className="container mx-auto">
              <TabsList className="h-12">
                <TabsTrigger
                  value="attendance"
                  className="flex items-center gap-2 h-full"
                >
                  <BarChart className="h-4 w-4" />
                  Attendance
                </TabsTrigger>
                <TabsTrigger
                  value="grades"
                  className="flex items-center gap-2 h-full"
                >
                  <FileText className="h-4 w-4" />
                  Grades
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="flex items-center gap-2 h-full"
                >
                  <Table className="h-4 w-4" />
                  Schedule
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <TabsContent
              value="attendance"
              className="h-full mt-0 border-none p-0"
            >
              <AttendanceSection
                semester={studentData.semester}
                department={studentData.department}
              />
            </TabsContent>

            <TabsContent value="grades" className="h-full mt-0 border-none p-0">
              <GradesSection />
            </TabsContent>

            <TabsContent
              value="schedule"
              className="h-full mt-0 border-none p-0"
            >
              <ScheduleSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default DataPanel;
