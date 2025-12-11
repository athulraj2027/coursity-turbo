"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateCouponForm = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState(0);
  const [usageLimit, setUsageLimit] = useState(100);
  const [expiryDate, setExpiryDate] = React.useState<Date>(
    new Date("2025-12-31")
  );
  const [applicableCourses, setApplicableCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!code || code.length < 3) {
      setError("Coupon code must be at least 3 characters");
      return;
    }
    if (discountValue <= 0) {
      setError("Discount value must be greater than 0");
      return;
    }
    if (discountType === "percentage" && discountValue > 100) {
      setError("Percentage discount cannot exceed 100%");
      return;
    }
    if (usageLimit <= 0) {
      setError("Usage limit must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      // Replace with actual API call
      // const data = await createCoupon({ code, description, discountType, discountValue, usageLimit, expiryDate, applicableCourses });
      console.log("Coupon created successfully");
      toast.success("Coupon created successfully!");
      router.push(`/teacher/coupons`);
    } catch (error: any) {
      setError(error.message);
      toast.error("Failed to create coupon");
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
                <Label htmlFor="code" className="text-sm font-medium">
                  Coupon Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  type="text"
                  className="h-11 font-mono uppercase"
                  placeholder="e.g., SUMMER2024"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Use uppercase letters and numbers only
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountType" className="text-sm font-medium">
                  Discount Type <span className="text-red-500">*</span>
                </Label>
                <Select value={discountType} onValueChange={setDiscountType}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountValue" className="text-sm font-medium">
                  Discount Value <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {discountType === "percentage" ? "%" : "₹"}
                  </span>
                  <Input
                    id="discountValue"
                    type="number"
                    min={0}
                    max={discountType === "percentage" ? 100 : undefined}
                    className="h-11 pl-8"
                    placeholder={discountType === "percentage" ? "20" : "500"}
                    value={discountValue || ""}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {discountType === "percentage"
                    ? "Enter percentage between 1-100"
                    : "Enter fixed amount in INR"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="usageLimit" className="text-sm font-medium">
                  Usage Limit <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="usageLimit"
                  type="number"
                  min={1}
                  className="h-11"
                  placeholder="100"
                  value={usageLimit || ""}
                  onChange={(e) => setUsageLimit(Number(e.target.value))}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Maximum number of times this coupon can be used
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="min-h-[120px] resize-none"
                  placeholder="Optional: Add a description for this coupon (e.g., 'Summer sale discount for new students')"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {description.length}/200 characters
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-sm font-medium">
                  Expiry Date <span className="text-red-500">*</span>
                </Label>
                <div className="flex justify-center lg:justify-start">
                  <Calendar
                    mode="single"
                    selected={expiryDate}
                    onSelect={(newDate) => newDate && setExpiryDate(newDate)}
                    className="rounded-lg border shadow-sm"
                    disabled={(date) => date < new Date()}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Selected:{" "}
                  {expiryDate.toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="courses" className="text-sm font-medium">
                  Applicable Courses (Optional)
                </Label>
                <Input
                  id="courses"
                  type="text"
                  className="h-11"
                  placeholder="Leave empty to apply to all courses"
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  You can select specific courses after creation
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
            <Link href={`/teacher/coupons`} className="flex-1 sm:flex-initial">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-32 h-11"
                disabled={loading}
              >
                Cancel
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
                "Create Coupon"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCouponForm;
