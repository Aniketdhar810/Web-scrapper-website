import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChevronLeft, ChevronRight, Filter, Download } from "lucide-react";

interface ScheduleEvent {
  id: string;
  title: string;
  course: string;
  instructor: string;
  location: string;
  startTime: string;
  endTime: string;
  date: Date;
  type: "lecture" | "lab" | "tutorial" | "exam";
}

interface ScheduleSectionProps {
  events?: ScheduleEvent[];
  onFilterChange?: (filters: any) => void;
  onDateChange?: (date: Date) => void;
  onViewChange?: (view: "day" | "week" | "month") => void;
}

const ScheduleSection = ({
  events = [
    {
      id: "1",
      title: "Data Structures",
      course: "CS201",
      instructor: "Dr. Smith",
      location: "Room 301",
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      date: new Date(),
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
      date: new Date(),
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
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      type: "lecture",
    },
    {
      id: "4",
      title: "Algorithms Mid-term Exam",
      course: "CS301",
      instructor: "Dr. Brown",
      location: "Exam Hall 1",
      startTime: "1:00 PM",
      endTime: "3:00 PM",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      type: "exam",
    },
  ],
  onFilterChange = () => {},
  onDateChange = () => {},
  onViewChange = () => {},
}: ScheduleSectionProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Filter events based on selected filters
  const filteredEvents = events.filter((event) => {
    const isCourseMatch =
      courseFilter === "all" || event.course === courseFilter;
    const isTypeMatch = typeFilter === "all" || event.type === typeFilter;
    return isCourseMatch && isTypeMatch;
  });

  // Get unique courses for filter dropdown
  const courses = ["all", ...new Set(events.map((event) => event.course))];
  const eventTypes = ["all", "lecture", "lab", "tutorial", "exam"];

  // Handle date change
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onDateChange(newDate);
    }
  };

  // Handle view change
  const handleViewChange = (newView: "day" | "week" | "month") => {
    setView(newView);
    onViewChange(newView);
  };

  // Navigate to previous/next day/week/month
  const navigatePrevious = () => {
    const newDate = new Date(date);
    if (view === "day") {
      newDate.setDate(date.getDate() - 1);
    } else if (view === "week") {
      newDate.setDate(date.getDate() - 7);
    } else {
      newDate.setMonth(date.getMonth() - 1);
    }
    setDate(newDate);
    onDateChange(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(date);
    if (view === "day") {
      newDate.setDate(date.getDate() + 1);
    } else if (view === "week") {
      newDate.setDate(date.getDate() + 7);
    } else {
      newDate.setMonth(date.getMonth() + 1);
    }
    setDate(newDate);
    onDateChange(newDate);
  };

  // Format date range for display
  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    if (view === "day") {
      return date.toLocaleDateString(undefined, options);
    } else if (view === "week") {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${weekStart.toLocaleDateString(undefined, { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString(undefined, options)}`;
    } else {
      return date.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
    }
  };

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        {/* Header with title and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold">Class Schedule</h2>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course === "all" ? "All Courses" : course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all"
                        ? "All Types"
                        : type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Calendar navigation */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={navigatePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">{formatDateRange()}</span>
            <Button variant="outline" size="icon" onClick={navigateNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Tabs
            value={view}
            onValueChange={(v) =>
              handleViewChange(v as "day" | "week" | "month")
            }
          >
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Calendar view */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {view === "month" ? (
            <div className="col-span-full">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                className="rounded-md border"
              />
            </div>
          ) : view === "week" ? (
            // Week view - show 7 days
            Array.from({ length: 7 }).map((_, index) => {
              const dayDate = new Date(date);
              dayDate.setDate(date.getDate() - date.getDay() + index);

              // Filter events for this day
              const dayEvents = filteredEvents.filter(
                (event) => event.date.toDateString() === dayDate.toDateString(),
              );

              return (
                <Card key={index} className="min-h-[300px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      {dayDate.toLocaleDateString(undefined, {
                        weekday: "short",
                      })}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {dayDate.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2">
                    {dayEvents.length > 0 ? (
                      <div className="space-y-2">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`p-2 rounded-md text-xs ${event.type === "lecture" ? "bg-blue-100" : event.type === "lab" ? "bg-green-100" : event.type === "exam" ? "bg-red-100" : "bg-yellow-100"}`}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div>
                              {event.startTime} - {event.endTime}
                            </div>
                            <div>{event.location}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-sm text-gray-400">
                        No events
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            // Day view - show single day with hourly slots
            <div className="col-span-full">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {date.toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredEvents
                      .filter(
                        (event) =>
                          event.date.toDateString() === date.toDateString(),
                      )
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`p-4 rounded-md border-l-4 ${event.type === "lecture" ? "border-blue-500 bg-blue-50" : event.type === "lab" ? "border-green-500 bg-green-50" : event.type === "exam" ? "border-red-500 bg-red-50" : "border-yellow-500 bg-yellow-50"}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">{event.title}</h3>
                              <p className="text-sm text-gray-600">
                                {event.course} • {event.instructor}
                              </p>
                            </div>
                            <div className="text-sm font-medium">
                              {event.startTime} - {event.endTime}
                            </div>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Location:</span>{" "}
                            {event.location}
                          </div>
                        </div>
                      ))}

                    {filteredEvents.filter(
                      (event) =>
                        event.date.toDateString() === date.toDateString(),
                    ).length === 0 && (
                      <div className="py-8 text-center text-gray-500">
                        No events scheduled for this day
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;
