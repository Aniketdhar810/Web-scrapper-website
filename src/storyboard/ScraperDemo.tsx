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
import { KIITPortalScraper } from "../backend/services/scraper";
import { CaptchaSolver } from "../backend/services/captchaSolver";
import { Progress } from "../components/ui/progress";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

const ScraperDemo = () => {
  const [activeTab, setActiveTab] = useState("scraper");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Create instances for demo
  const scraper = new KIITPortalScraper();
  const captchaSolver = new CaptchaSolver("demo-api-key");

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setProgress(10);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 90));
      }, 300);

      const data = await sapPortalAPI.login({
        rollNumber: "2021KIIT1234",
        password: "password123",
      });

      clearInterval(progressInterval);
      setProgress(100);
      setResult(data);
      setSuccess("Login successful! Student data retrieved.");
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeAttendance = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setProgress(10);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 8, 90));
      }, 300);

      const data = await scraper.scrapeAttendance();

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

  const handleScrapeGrades = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setProgress(10);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 6, 90));
      }, 300);

      const data = await scraper.scrapeGrades();

      clearInterval(progressInterval);
      setProgress(100);
      setResult(data);
      setSuccess("Grades data scraped successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeSchedule = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setProgress(10);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 300);

      const data = await scraper.scrapeSchedule();

      clearInterval(progressInterval);
      setProgress(100);
      setResult(data);
      setSuccess("Schedule data scraped successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSolveCaptcha = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setProgress(10);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 3, 90));
      }, 300);

      // Solve a mock image CAPTCHA
      const solution =
        await captchaSolver.solveImageCaptcha("mock-base64-image");

      clearInterval(progressInterval);
      setProgress(100);
      setResult({ captchaSolution: solution });
      setSuccess("CAPTCHA solved successfully!");
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
      await sapPortalAPI.logout();
      setProgress(100);
      setResult({ message: "Logged out successfully" });
      setSuccess("Logged out successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">SAP Portal Scraper Demo</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="scraper">Scraper</TabsTrigger>
          <TabsTrigger value="captcha">CAPTCHA Solver</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
        </TabsList>

        <TabsContent value="scraper" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SAP Portal Scraper</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button onClick={handleScrapeAttendance} disabled={loading}>
                  {loading ? "Scraping..." : "Scrape Attendance"}
                </Button>
                <Button onClick={handleScrapeGrades} disabled={loading}>
                  {loading ? "Scraping..." : "Scrape Grades"}
                </Button>
                <Button onClick={handleScrapeSchedule} disabled={loading}>
                  {loading ? "Scraping..." : "Scrape Schedule"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="captcha" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CAPTCHA Solver</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button onClick={handleSolveCaptcha} disabled={loading}>
                  {loading ? "Solving..." : "Solve CAPTCHA"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
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

export default ScraperDemo;
