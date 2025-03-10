import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { KIITRealScraper } from "../backend/services/realScraper";

const RealScraperDemo = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [credentials, setCredentials] = useState({
    rollNumber: "",
    password: "",
  });

  const [year, setYear] = useState("2024-2025");
  const [session, setSession] = useState("Spring");

  // Create instance for demo
  const realScraper = new KIITRealScraper();

  const handleLogin = async () => {
    if (!credentials.rollNumber || !credentials.password) {
      setError("Please enter both roll number and password.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    setProgress(10);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 90));
      }, 300);

      const data = await realScraper.login(credentials);

      clearInterval(progressInterval);
      setProgress(100);
      setResult(data);
      setSuccess("Login successful! Student data retrieved.");
      setActiveTab("attendance"); // Automatically switch to attendance tab after login
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAttendance = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setProgress(10);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 8, 90));
      }, 300);

      const data = await realScraper.fetchAttendance(year, session);

      clearInterval(progressInterval);
      setProgress(100);
      setResult(data);
      setSuccess("Attendance data scraped successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setProgress(50);

    try {
      await realScraper.logout();
      setProgress(100);
      setResult({ message: "Logged out successfully" });
      setSuccess("Logged out successfully!");
      setActiveTab("login"); // Switch back to login tab after logout
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">
        KIIT SAP Portal Real Scraper Demo
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SAP Portal Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    placeholder="Enter your roll number"
                    value={credentials.rollNumber}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        rollNumber: e.target.value,
                      })
                    }
                    disabled={loading}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    disabled={loading}
                  />
                </div>

                <Button onClick={handleLogin} disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="grid gap-2">
                  <Label htmlFor="year">Academic Year</Label>
                  <select
                    id="year"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    disabled={loading}
                  >
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="session">Session</Label>
                  <select
                    id="session"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                    disabled={loading}
                  >
                    <option value="Spring">Spring</option>
                    <option value="Fall">Fall</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button onClick={handleFetchAttendance} disabled={loading}>
                  {loading ? "Fetching..." : "Fetch Attendance"}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {loading && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Progress</h3>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 mt-1">{progress}% complete</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mt-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Result</h3>
          <div className="p-4 bg-gray-50 rounded-md overflow-auto max-h-96">
            <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealScraperDemo;
