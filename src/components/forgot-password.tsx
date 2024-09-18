import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const naviagte = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // const formData = new FormData(event.currentTarget);
    // const email = formData.get("email") as string;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulated success
      toast({
        title: "Reset Instructions Sent",
        description:
          "Password reset instructions have been sent to your email.",
        duration: 5000,
      });
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred. Please try again. -> ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 w-full">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you instructions to reset
            your password
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Reset Instructions
            </Button>
            <div className="flex justify-between w-full text-sm">
              <Button
                variant="link"
                className="p-0 h-auto font-normal text-blue-600 hover:underline"
                onClick={() => naviagte("/login")}
              >
                Back to Login
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto font-normal text-blue-600 hover:underline"
                onClick={()=>naviagte("/register")}
              >
                Create New Account
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
