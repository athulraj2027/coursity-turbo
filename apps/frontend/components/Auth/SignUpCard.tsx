"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateSignupForm } from "@/lib/validation";
import { signupUser } from "@/lib/api";
import { useSignupStore } from "@/store/signupStore";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const SignUpCard = () => {
  const router = useRouter();
  const { setSignupData } = useSignupStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateSignupForm({
      username,
      email,
      password,
      confirmPassword,
      role,
    });
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setLoading(true);
      const data = await signupUser(email);
      setSignupData({ username, email, password, role });
      console.log("✅ Email sent successfully:", data);
      router.push(`/verify-otp`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setRole(value);
  };

  return (
    <Card className="w-full max-w-sm tracking-tighter">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold">
          Create account
        </CardTitle>
        <CardDescription>Enter your details to create account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="grid gap-1">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="yourname123"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-1 text-gray-700">
              <Label htmlFor="role">Role</Label>
              <RadioGroup
                value={role}
                onValueChange={handleChange}
                defaultValue=""
                className="flex "
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="STUDENT" id="option-one" />
                  <Label htmlFor="STUDENT">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TEACHER" id="TEACHER" />
                  <Label htmlFor="TEACHER">Teacher</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-1">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <div className="flex items-center">
                <Label htmlFor="confirm-password">Confirm password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button type="submit" className="w-full mt-3" disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-1">
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
        <p>
          Has account already?
          <Link href={`/sign-in`} className="text-blue-700">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpCard;
