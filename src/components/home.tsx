import React, { useState } from "react";
import AuthenticationForm from "./AuthenticationForm";
import Dashboard from "./Dashboard";
import LoadingOverlay from "./LoadingOverlay";
import ErrorNotification from "./ErrorNotification";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<
    "login" | "connection" | "maintenance" | "timeout" | "general"
  >("general");
  const [studentData, setStudentData] = useState({
    name: "John Doe",
    rollNumber: "2021KIIT1234",
    department: "Computer Science and Engineering",
    semester: "Spring 2023",
    lastUpdated: "2023-06-15 14:30",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  });

  const handleLogin = async (credentials: {
    rollNumber: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      // Import the API dynamically to avoid circular dependencies
      const { sapPortalAPI } = await import("../backend/api");

      // Attempt to login with the SAP portal API
      if (credentials.rollNumber && credentials.password) {
        try {
          const userData = await sapPortalAPI.login(credentials);
          setIsAuthenticated(true);
          setStudentData({
            ...studentData,
            name: userData.name || "Student",
            rollNumber: userData.rollNumber || credentials.rollNumber,
            department:
              userData.department || "Computer Science and Engineering",
            semester: userData.semester || "Spring 2023",
            lastUpdated: userData.lastUpdated || new Date().toLocaleString(),
            profileImage:
              userData.profileImage ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.rollNumber}`,
          });
        } catch (apiError: any) {
          setErrorType(apiError.type || "login");
          setError(
            apiError.message ||
              "Authentication failed. Please check your credentials and try again.",
          );
        }
      } else {
        setErrorType("login");
        setError("Please enter both roll number and password.");
      }
    } catch (err: any) {
      setErrorType("connection");
      setError(
        err.message || "Failed to connect to the SAP portal. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {isLoading && (
        <LoadingOverlay
          isLoading={isLoading}
          message="Connecting to SAP Portal and retrieving your data..."
          progress={0}
        />
      )}

      <div className="flex-1 flex items-center justify-center p-4">
        {!isAuthenticated ? (
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary">
                KIIT SAP Portal Companion
              </h1>
              <p className="text-gray-600 mt-2">
                Securely access your student information from the KIIT SAP
                portal
              </p>
            </div>

            {error && (
              <ErrorNotification
                type={errorType}
                message={error}
                onRetry={handleRetry}
                onDismiss={() => setError(null)}
              />
            )}

            <AuthenticationForm
              onLogin={handleLogin}
              isLoading={isLoading}
              error={error}
            />

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                This companion app helps you access your SAP portal data more
                efficiently.
              </p>
              <p className="mt-2">
                It securely connects to the official KIIT SAP portal on your
                behalf.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full">
            <Dashboard
              studentData={studentData}
              onLogout={handleLogout}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>

      <footer className="bg-white py-4 border-t text-center text-sm text-gray-500">
        <div className="container mx-auto">
          <p>
            © {new Date().getFullYear()} KIIT SAP Portal Companion | Not
            affiliated with KIIT University
          </p>
          <p className="mt-1">
            This is an unofficial tool designed to enhance the SAP portal
            experience
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
