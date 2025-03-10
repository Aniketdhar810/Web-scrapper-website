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
import { sapPortalAPI } from "../backend/api";

const BackendDemo = () => {
  const [activeTab, setActiveTab] = useState("auth");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sapPortalAPI.login({
        rollNumber: "2021KIIT1234",
        password: "password123",
      });
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAttendance = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sapPortalAPI.getAttendance();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchGrades = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sapPortalAPI.getGrades();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sapPortalAPI.getSchedule();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await sapPortalAPI.logout();
      setResult({ message: "Logged out successfully" });
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Backend API Demo</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="data">Data Retrieval</TabsTrigger>
        </TabsList>

        <TabsContent value="auth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Button onClick={handleLogin} disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <Button
                  onClick={handleLogout}
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Retrieval API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button onClick={handleFetchAttendance} disabled={loading}>
                  {loading ? "Fetching..." : "Get Attendance"}
                </Button>
                <Button onClick={handleFetchGrades} disabled={loading}>
                  {loading ? "Fetching..." : "Get Grades"}
                </Button>
                <Button onClick={handleFetchSchedule} disabled={loading}>
                  {loading ? "Fetching..." : "Get Schedule"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
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

export default BackendDemo;
