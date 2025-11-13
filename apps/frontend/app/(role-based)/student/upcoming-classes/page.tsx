"use client";

import { SidebarDemo } from "@/components/Dashboard";
import DummyExplorePage from "@/components/Dummy/DummyExplorePage";
import { Button } from "@/components/ui/button";
import { fetchUpcomingClassesApi } from "@/lib/studentApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function UpcomingClassesPage() {
  const header = "Upcoming Classes";
  const [lectures, setLectures] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpcomingClasses = async () => {
      try {
        setLoading(true);
        const data = await fetchUpcomingClassesApi();
        setLectures(data.lectures);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcomingClasses();
  }, []);

  if (loading) return <DummyExplorePage header={header} role={`student`} />;
  return (
    <SidebarDemo header={header} role="student">
      <div className="p-6">
        {error && <p className="text-red-600">{error}</p>}

        {/* No Classes */}
        {!loading && !error && lectures.length === 0 && (
          <p className="text-black text-center">No upcoming classes found.</p>
        )}

        {/* Lectures Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {lectures.map((lecture) => {
            const { id, title, startTime, status, course } = lecture;
            const teacher = course.teacher.user;

            return (
              <Card
                key={id}
                className="border border-gray-300 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-200"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-black mb-1">
                    {title}
                  </CardTitle>
                  <p className="text-black text-sm">
                    <strong>Course:</strong> {course.name}
                  </p>
                </CardHeader>

                <CardContent className="text-black text-sm space-y-1">
                  <p>
                    <strong>Teacher:</strong> {teacher.username} (
                    {teacher.email})
                  </p>
                  <p>
                    <strong>Start Time:</strong>{" "}
                    {new Date(startTime).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="uppercase">{status}</span>
                  </p>

                  {status === "STARTED" && (
                    <div className="pt-3">
                      <Button className="w-full">Join Class</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </SidebarDemo>
  );
}
