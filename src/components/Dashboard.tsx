import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  BarChart,
  Calendar,
  Download,
  FileText,
  LogOut,
  User,
} from "lucide-react";

import DataPanel from "./dashboard/DataPanel";
import ExportPanel from "./dashboard/ExportPanel";

interface DashboardProps {
  studentData?: {
    name?: string;
    rollNumber?: string;
    department?: string;
    semester?: string;
    lastUpdated?: string;
    profileImage?: string;
  };
  onLogout?: () => void;
  isLoading?: boolean;
}

const Dashboard = ({
  studentData = {
    name: "John Doe",
    rollNumber: "2021KIIT1234",
    department: "Computer Science and Engineering",
    semester: "Spring 2023",
    lastUpdated: "2023-06-15 14:30",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  onLogout = () => {},
  isLoading = false,
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<string>("attendance");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-bold text-xl text-primary">
            SAP Portal Companion
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img
                src={studentData.profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium hidden md:inline-block">
              {studentData.name}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline-block">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r flex flex-col">
            <div className="p-4">
              <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50">
                <div className="h-16 w-16 rounded-full overflow-hidden mb-3">
                  <img
                    src={studentData.profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-center">{studentData.name}</h3>
                <p className="text-sm text-gray-500 text-center mt-1">
                  {studentData.rollNumber}
                </p>
                <Badge variant="outline" className="mt-2">
                  {studentData.department}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="p-4 flex-1">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                DASHBOARD
              </h3>
              <Tabs
                orientation="vertical"
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                  <TabsTrigger
                    value="attendance"
                    className="justify-start px-3 py-2 h-9 w-full"
                  >
                    <BarChart className="h-4 w-4 mr-2" />
                    Attendance
                  </TabsTrigger>
                  <TabsTrigger
                    value="grades"
                    className="justify-start px-3 py-2 h-9 w-full"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Grades
                  </TabsTrigger>
                  <TabsTrigger
                    value="schedule"
                    className="justify-start px-3 py-2 h-9 w-full"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Separator />

            <div className="p-4">
              <ExportPanel
                availableData={["attendance", "grades", "schedule"]}
                isExporting={false}
              />
            </div>
          </aside>
        )}

        {/* Main Panel */}
        <main className="flex-1 overflow-hidden p-4">
          <div className="h-full flex flex-col">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSidebar}
              className="mb-4 self-start md:hidden"
            >
              {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            </Button>

            <div className="flex-1 overflow-hidden">
              <DataPanel
                activeTab={activeTab}
                onTabChange={handleTabChange}
                studentData={studentData}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
