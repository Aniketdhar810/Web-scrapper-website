import React, { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { AlertCircle, CheckCircle, Loader2, XCircle } from "lucide-react";

interface LoadingOverlayProps {
  isLoading?: boolean;
  status?: "idle" | "loading" | "success" | "error";
  message?: string;
  progress?: number;
  error?: string;
  onRetry?: () => void;
  onClose?: () => void;
}

const LoadingOverlay = ({
  isLoading = true,
  status = "loading",
  message = "Processing your request...",
  progress = 0,
  error = "",
  onRetry = () => {},
  onClose = () => {},
}: LoadingOverlayProps) => {
  const [visible, setVisible] = useState(isLoading);
  const [currentProgress, setCurrentProgress] = useState(progress);

  // Simulate progress if no progress is provided
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === "loading" && progress === 0) {
      interval = setInterval(() => {
        setCurrentProgress((prev) => {
          // Slow down as it approaches 90%
          const increment = prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 1 : 0.5;
          const newProgress = Math.min(prev + increment, 90);
          return newProgress;
        });
      }, 500);
    } else {
      setCurrentProgress(progress);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, progress]);

  // Update visibility based on isLoading prop
  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else {
      // Add a small delay before hiding to allow animations to complete
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  // If not visible, don't render anything
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            {status === "loading" && (
              <div className="relative">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {Math.round(currentProgress)}%
                </div>
              </div>
            )}
            {status === "success" && (
              <CheckCircle className="h-12 w-12 text-green-500" />
            )}
            {status === "error" && (
              <XCircle className="h-12 w-12 text-red-500" />
            )}
            {status === "idle" && (
              <AlertCircle className="h-12 w-12 text-yellow-500" />
            )}
          </div>

          <h3 className="text-lg font-semibold text-center mb-2">
            {status === "loading" && "Processing"}
            {status === "success" && "Success"}
            {status === "error" && "Error"}
            {status === "idle" && "Waiting"}
          </h3>

          <p className="text-gray-600 text-center mb-4">{message}</p>

          {status === "loading" && (
            <div className="mb-4">
              <Progress value={currentProgress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Connecting to SAP Portal</span>
                <span>{Math.round(currentProgress)}%</span>
              </div>
            </div>
          )}

          {status === "error" && error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            {status === "error" && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            )}
            {(status === "success" || status === "error") && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {status === "loading" && (
          <div className="bg-gray-50 px-6 py-3 border-t">
            <div className="flex items-center text-xs text-gray-500">
              <Loader2 className="h-3 w-3 mr-2 animate-spin" />
              <span>
                Please wait while we securely connect to the SAP Portal and
                retrieve your data. This may take a moment...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
