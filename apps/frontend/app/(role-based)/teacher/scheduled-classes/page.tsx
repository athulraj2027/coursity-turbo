"use client";

import { SidebarDemo } from "@/components/Dashboard";
import { fetchMyScheduledClasses } from "@/lib/api";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Clock, BookOpen, Radio } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function ScheduledClasses() {
  const [lectures, setLectures] = useState<any[]>([]);
  const [sort, setSort] = useState("");
  const header = "My Lectures";

  const startLecture = async (lectureId: string) => {
    window.open(`/teacher/lecture/${lectureId}`, "_blank");
  };
  useEffect(() => {
    const fetchLectures = async () => {
      const data = await fetchMyScheduledClasses();
      setLectures(data.lectures || []);
    };
    fetchLectures();
  }, []);

  const editLecture = async (lectureId: string) => {
    try {
      // const data = await
    } catch (error) {}
  };
  const dltLecture = async (lectureId: string) => {
    try {
    } catch (error) {}
  };

  return (
    <SidebarDemo header={header} role="teacher">
      {/* Search and sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 backdrop-blur-md rounded-2xl p-4 mb-6">
        {/* Search */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Input
            type="text"
            placeholder="Search courses..."
            className="px-3 py-2 bg-transparent border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 w-[300px] focus:ring-gray-500"
          />
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm">
                {sort ? `Sort: ${sort}` : "Sort By"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Sort Courses</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="newest">
                  Newest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">
                  Oldest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="lowToHigh">
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="highToLow">
                  Price: High to Low
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filters */}
          <Button
            className="text-red-600"
            variant="ghost"
            onClick={() => {
              setSort("");
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {lectures.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No scheduled lectures yet.
          </p>
        ) : (
          lectures.map((lec) => (
            <Card
              key={lec.id}
              className="rounded-2xl   shadow-md hover:shadow-md transition-all bg-white backdrop-blur-sm border border-gray-200"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-black" />
                  {lec.course.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 text-sm text-black">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-black" />
                  {lec.title}
                </p>

                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-black" />
                  {format(new Date(lec.startTime), "MMM d, yyyy • HH:mm")}
                </p>

                <p className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-black" />
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

                <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={() => startLecture(lec.id)}>
                    Start
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => editLecture(lec.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => dltLecture(lec.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </SidebarDemo>
  );
}
