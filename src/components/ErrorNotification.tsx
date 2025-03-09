import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { XCircle, AlertTriangle, Info, WifiOff, Clock } from "lucide-react";

export type ErrorType =
  | "login"
  | "connection"
  | "maintenance"
  | "timeout"
  | "general";

export interface ErrorNotificationProps {
  type?: ErrorType;
  title?: string;
  message?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onRetry?: () => void;
  onDismiss?: () => void;
  showDialog?: boolean;
}

const ErrorNotification = ({
  type = "general",
  title = "An error occurred",
  message = "Something went wrong. Please try again later.",
  isOpen = true,
  onClose = () => {},
  onRetry = () => {},
  onDismiss = () => {},
  showDialog = false,
}: ErrorNotificationProps) => {
  const [dialogOpen, setDialogOpen] = useState(isOpen);

  // Update dialog state when isOpen prop changes
  useEffect(() => {
    setDialogOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setDialogOpen(false);
    onClose();
  };

  const handleRetry = () => {
    setDialogOpen(false);
    onRetry();
  };

  const handleDismiss = () => {
    setDialogOpen(false);
    onDismiss();
  };

  const getErrorIcon = () => {
    switch (type) {
      case "login":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "connection":
        return <WifiOff className="h-5 w-5 text-destructive" />;
      case "maintenance":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "timeout":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getErrorTitle = () => {
    if (title) return title;

    switch (type) {
      case "login":
        return "Authentication Failed";
      case "connection":
        return "Connection Error";
      case "maintenance":
        return "Portal Under Maintenance";
      case "timeout":
        return "Request Timeout";
      default:
        return "An error occurred";
    }
  };

  const getErrorMessage = () => {
    if (message) return message;

    switch (type) {
      case "login":
        return "Your roll number or password is incorrect. Please check your credentials and try again.";
      case "connection":
        return "Unable to connect to the SAP portal. Please check your internet connection and try again.";
      case "maintenance":
        return "The SAP portal is currently under maintenance. Please try again later.";
      case "timeout":
        return "The request took too long to complete. This might be due to high traffic or network issues.";
      default:
        return "Something went wrong. Please try again later.";
    }
  };

  const getSuggestedAction = () => {
    switch (type) {
      case "login":
        return "Double-check your roll number and password. If you've forgotten your password, use the 'Forgot Password' option.";
      case "connection":
        return "Check your internet connection, refresh the page, or try again in a few minutes.";
      case "maintenance":
        return "The portal should be back online soon. Please check back later or contact IT support if this persists.";
      case "timeout":
        return "Try again during off-peak hours or check if there are any announced maintenance periods.";
      default:
        return "Refresh the page or try again later. If the problem persists, please contact support.";
    }
  };

  const getVariant = () => {
    return type === "login" || type === "connection"
      ? "destructive"
      : "default";
  };

  if (showDialog) {
    return (
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <div className="flex items-center justify-center mb-2">
              {getErrorIcon()}
            </div>
            <AlertDialogTitle>{getErrorTitle()}</AlertDialogTitle>
            <AlertDialogDescription>{getErrorMessage()}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-gray-50 p-4 rounded-md my-4">
            <h4 className="text-sm font-medium mb-2">Suggested Action:</h4>
            <p className="text-sm text-gray-600">{getSuggestedAction()}</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDismiss}>
              Dismiss
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRetry}>
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Alert variant={getVariant()} className="mb-4 bg-white">
      <div className="flex items-start">
        <div className="mr-3">{getErrorIcon()}</div>
        <div>
          <AlertTitle>{getErrorTitle()}</AlertTitle>
          <AlertDescription>{getErrorMessage()}</AlertDescription>

          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Suggested Action:</span>{" "}
              {getSuggestedAction()}
            </p>
            <div className="flex space-x-2 mt-2">
              <Button variant="outline" size="sm" onClick={handleDismiss}>
                Dismiss
              </Button>
              <Button size="sm" onClick={handleRetry}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default ErrorNotification;
