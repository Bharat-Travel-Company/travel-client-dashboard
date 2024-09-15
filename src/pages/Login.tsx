import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleLogin = async (): Promise<void> => {
    const { email, password } = data;
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `https://travel-backend-nwtf.onrender.com/api/v1/tourist/login`,
        data
      );
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        variant: "default",
      });
      setInterval(() => {
        navigate("/hotel-details");
      }, 300);
    } catch (error) {
      setError(error);
      console.error("Error during login", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 w-full">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="user@email.com"
              required
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="your password"
                required
                onChange={handleChange}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Input type="checkbox" id="remember" className="w-4 h-4" />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </Label>
            </div>
            <Button
              variant="link"
              className="p-0 h-auto font-normal text-sm text-blue-600 hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?
            <Button
              variant="link"
              className="p-0 h-auto font-normal text-blue-600 hover:underline"
              onClick={() => navigate("/register")}
            >
              Register here
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
