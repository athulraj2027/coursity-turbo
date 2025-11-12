import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { validateCreateLectureForm } from "@/lib/validation";
import { createLecture } from "@/lib/api";

interface CreateLectureFormProps {
  courseId: string;
  onClose: () => void;
}

const CreateLectureForm: React.FC<CreateLectureFormProps> = ({
  courseId,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationError = validateCreateLectureForm({ title, time });
    if (verificationError) {
      setError(verificationError);
      return;
    }
    try {
      await createLecture(courseId, title, time);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <Card className="w-[300px]">
        <CardHeader className="text-xl font-extrabold">New Lecture</CardHeader>
        <CardContent className="flex flex-col gap-3">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                className="text-sm"
                placeholder="Eg :- Introduction to trigonometry"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="time-picker">Time (24 hr format)</Label>
              <Input
                type="time"
                id="time-picker"
                step={60}
                defaultValue="10:30"
                onChange={(e) => setTime(e.target.value)}
                className="bg-background w-fit appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div className="flex gap-3 mt-2">
                <Button className="w-[150px]" disabled={loading}>
                  Confirm
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateLectureForm;
