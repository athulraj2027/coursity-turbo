"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
 
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import Link from "next/link";
import { validateCreateCourseForm } from "@/lib/validation";
import { createCourse } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      toast.success("Course created successfully!");
      router.push(`/teacher/my-courses?sortBy=&search=&page=1`);
    } catch (error: any) {
      setError(error.message);
      toast.error("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Course Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  className="h-11"
                  placeholder="e.g., Web Development for Beginners"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">
                  Price (INR) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    id="price"
                    type="number"
                    min={0}
                    className="h-11 pl-8"
                    placeholder="4999"
                    value={price || ""}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Set to 0 for free courses
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  className="min-h-[180px] resize-none"
                  placeholder="Describe what students will learn in this course, the topics covered, and any prerequisites..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {description.length}/500 characters
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <div className="flex justify-center lg:justify-start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="rounded-lg border shadow-sm"
                    disabled={(date) => date < new Date()}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Selected:{" "}
                  {date.toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8 pt-6 border-t">
            <Link
              href={`/teacher/my-courses`}
              className="flex-1 sm:flex-initial"
            >
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-32 h-11"
                disabled={loading}
              >
                Go Back
              </Button>
            </Link>
            <Button
              type="submit"
              className="flex-1 sm:flex-initial sm:w-40 h-11 font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Course"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCourseForm;
