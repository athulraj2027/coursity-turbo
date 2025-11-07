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

const SignUpCard = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="**** ****"
                required
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
                placeholder="**** ****"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-3">
            Sign up
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
