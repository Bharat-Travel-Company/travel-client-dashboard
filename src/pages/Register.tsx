import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
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

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RegisterData>({
    fullName: "",
    email: "",
    password: "",
    role: "Admin",
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

  // const handleAccountTypeChange = (value: string): void => {
  //   setData({
  //     ...data,
  //     role: value,
  //   });
  // };

  const handleRegister = async (): Promise<void> => {
    const { fullName, email, password } = data;
    if (!fullName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);
    // setError(null);

    try {
      const res = await axios.post(
        `https://travel-backend-nwtf.onrender.com/api/v1/tourist/register`,
        data
      );

      if (res.data.message === "Tourist registered successfully") {
        navigate("/login")
        toast({
          title: "Registration Successful",
          description: "You have successfully registered.",
          variant: "default",
        });
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error during registration", error);
      alert("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 w-full">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to register
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="fullName"
              type="text"
              placeholder="your name"
              required
              onChange={handleChange}
            />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type</Label>
            {/* <Select onValueChange={handleAccountTypeChange} required>
              <SelectTrigger id="accountType">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hotels">Hotels</SelectItem>
                <SelectItem value="activities">List Activities</SelectItem>
                <SelectItem value="cars">Car Services</SelectItem>
              </SelectContent>
            </Select> */}
            <Input value='Admin' readOnly/>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full"
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
          <p className="text-sm text-center text-gray-600">
            Already have an account?
            <Button
              variant="link"
              className="p-0 h-auto font-normal text-blue-600 hover:underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
