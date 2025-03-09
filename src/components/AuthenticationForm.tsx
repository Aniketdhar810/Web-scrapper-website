import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Eye, EyeOff, Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const loginSchema = z.object({
  rollNumber: z.string().min(1, "Roll number is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface AuthenticationFormProps {
  onLogin?: (credentials: {
    rollNumber: string;
    password: string;
  }) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const AuthenticationForm = ({
  onLogin = async () => {},
  isLoading = false,
  error = null,
}: AuthenticationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rollNumber: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    await onLogin(values);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <Card className="border-0 shadow-none">
        <CardHeader className="space-y-1 text-center bg-primary text-white py-6">
          <CardTitle className="text-2xl font-bold">KIIT SAP Portal</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Enter your roll number"
                          {...field}
                          disabled={isLoading}
                          className="pl-10"
                        />
                      </FormControl>
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          disabled={isLoading}
                          className="pl-10"
                        />
                      </FormControl>
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-7 w-7"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground bg-gray-50 p-6">
          <div>
            <span>Trouble logging in? </span>
            <a
              href="#"
              className="underline text-primary hover:text-primary/80"
            >
              Contact support
            </a>
          </div>
          <div className="text-xs">
            This is a secure portal. Your credentials are encrypted and never
            stored.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthenticationForm;
