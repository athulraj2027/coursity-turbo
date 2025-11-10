"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import Link from "next/link";
import { validateCreateCourseForm } from "@/lib/validation";
import { createCourse } from "@/lib/api";
import { useRouter } from "next/navigation";

const CreateCourseForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = React.useState<Date>(new Date("2026-01-01"));
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateCreateCourseForm({
      name,
      description,
      date,
      price,
    });
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const data = await createCourse(name, description, date, price);
      console.log("Course created successfully : ", data);
      // toast success
      router.push(`/teacher`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full  pb-4">
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Use grid layout for form fields */}
          <div className="grid gap-6 xl:grid-cols-2">
            {/* Left side */}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Course name</Label>
                <Input
                  id="name"
                  type="text"
                  className="w-sm"
                  placeholder="Eg: Web development for beginners"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">Price (in ₹)</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  className="w-full max-w-xs"
                  placeholder="Eg: 4999"
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg border max-w-sm"
                  required
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col gap-4">
              <div className="grid gap-2 ">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="w-full h-[150px] "
                  placeholder="Describe what this course covers..."
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="flex flex-col sm:flex-row gap-2 w-full justify-start sm:justify-end mt-4">
                <Button
                  type="submit"
                  variant="submit"
                  className="flex-1 sm:w-[150px]"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Course"}
                </Button>
                <Link href={`/teacher`} className="flex-1 sm:w-[150px]">
                  <Button variant="destructive" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCourseForm;
