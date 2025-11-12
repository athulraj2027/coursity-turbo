"use client";

import { SidebarDemo } from "@/components/Dashboard";
import { fetchCourseDetailsApi } from "@/lib/studentApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, DollarSign, User } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CoursePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [course, setCourse] = useState<any>(null);
  const header = "Course Details";
  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchCourseDetailsApi(id as string);
        setCourse(data.course);
      } catch (error: any) {
        console.log("Error  : ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourseDetails();
  }, [id]);

  if (loading)
    return (
      <SidebarDemo header={header} role="student">
        <p className="text-center text-gray-400 mt-10">
          Loading course details...
        </p>
      </SidebarDemo>
    );

  if (error)
    return (
      <SidebarDemo header={header} role="student">
        <p className="text-center text-red-500 mt-10">{error}</p>
      </SidebarDemo>
    );

  if (!course)
    return (
      <SidebarDemo header={header} role="student">
        <p className="text-center text-gray-400 mt-10">No course found.</p>
      </SidebarDemo>
    );

  const teacherName = course.teacher?.user?.username ?? "Unknown";

  return (
    <SidebarDemo header={header} role="student">
      <div className="p-8 flex flex-col lg:flex-row gap-10">
        {/* Left: Course Details */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-black mb-3">{course.name}</h1>
          <p className="text-black mb-6 leading-relaxed">
            {course.description}
          </p>

          <div className="space-y-3 text-sm text-black">
            <p className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-base">
                ₹{course.price.toLocaleString()}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-black" />
              <span className="text-base">
                Starts on {format(new Date(course.startDate), "MMMM d, yyyy")}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <User className="w-4 h-4 text-black" />
              <span className="text-base">Instructor: {teacherName}</span>
            </p>
          </div>

          {/* Enroll Button */}
          <Link href={`/student/checkout/${course.id}`}>
            <Button className="mt-8 py-3 rounded-xl text-base font-medium">
              Enroll Now
            </Button>
          </Link>
        </div>

        {/* Right: Extra Info / Sidebar */}
        <div className="lg:w-80 bg-white/5 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-sm space-y-6 h-fit">
          <h2 className="text-lg font-semibold text-black">Course Overview</h2>
          <ul className="text-black text-sm list-disc list-inside space-y-2">
            <li>Interactive live classes</li>
            <li>Attendance tracking</li>
            <li>Assignments & reports</li>
            <li>Wallet payments supported</li>
          </ul>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-black font-semibold mb-2">Instructor Info</h3>
            <p className="text-black text-sm">
              <strong>{teacherName}</strong>
              <br />
              {course.teacher?.user?.email}
            </p>
          </div>
        </div>
      </div>
    </SidebarDemo>
  );
}
