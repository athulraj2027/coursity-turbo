"use client";

import { SidebarDemo } from "@/components/Dashboard";
import { fetchMyScheduledClasses } from "@/lib/api";
import { useEffect, useState } from "react";
import { Calendar, Clock, BookOpen, Radio } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function ScheduledClasses() {
  const [lectures, setLectures] = useState([]);
  const header = "My Lectures";

  const startLecture = async (lectureId: string) => {};
  useEffect(() => {
    const fetchLectures = async () => {
      const data = await fetchMyScheduledClasses();
      setLectures(data.lectures || []);
    };
    fetchLectures();
  }, []);

  return (
    <SidebarDemo header={header} role="teacher">
      <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lectures.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No scheduled lectures yet.
          </p>
        ) : (
          lectures.map((lec) => (
            <div
              key={lec.id}
              className="border rounded-2xl shadow-sm p-5 hover:shadow-md transition-all bg-white/5 backdrop-blur-sm"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                {lec.course.name}
              </h2>

              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {lec.course.description}
              </p>

              <div className="mt-4 space-y-2 text-sm text-gray-300">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {lec.title}
                </p>

                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {format(new Date(lec.startTime), "MMM d, yyyy • HH:mm")}
                </p>

                <p className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-gray-400" />
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      lec.status === "NOT_STARTED"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : lec.status === "LIVE"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {lec.status}
                  </span>
                </p>
                <Button onClick={() => startLecture(lec.id)}>Start</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </SidebarDemo>
  );
}
