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
import { validateSigninForm } from "@/lib/validation";
import { signinUser } from "@/lib/api";
import Cookies from "js-cookie";
import { toast } from "sonner";

const SignInCard = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateSigninForm({ email, password });
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const data = await signinUser(email, password);
      console.log("Signed in successfully :", data);
      toast.success("Signed in successfully");
      const role = data.user.role as string;
      Cookies.set("coursity_token", data.token);
      router.push(`/${role.toLowerCase()}`);
    } catch (err: any) {
      setError("Signing in failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm tracking-tighter">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold">Sign in </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Signing you in" : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-1">
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
        <p>
          First time here?
          <Link href={`/sign-up`} className="text-blue-700">
            Create Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInCard;
