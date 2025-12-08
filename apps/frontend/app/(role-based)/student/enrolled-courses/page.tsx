"use client";

import { SidebarDemo } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { fetchEnrolledCoursesApi } from "@/lib/studentApi";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import DummyExplorePage from "@/components/Dummy/DummyExplorePage";

export default function StudentMainPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");
  const header = "Enrolled Courses";

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchEnrolledCoursesApi();
        setEnrollments(data.courses);
        setTotalPages(Math.ceil(data.total / data.limit));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [page]);

  if (loading) return <DummyExplorePage header={header} role="student" />;

  return (
    <SidebarDemo header={header} role="student">
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
      <div className="p-6">
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && enrollments.length === 0 && (
          <p className="text-black">You are not enrolled in any courses yet.</p>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {enrollments &&
            enrollments.map((enrollment) => {
              const { course, status, enrolledAt, enrollmentId } = enrollment;

              return (
                <Card
                  key={course.id}
                  className="shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 rounded-2xl"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-black">
                      {course.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {course.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-2 text-sm text-black">
                    <p>
                      <strong>Teacher:</strong> {course.teacher.name} (
                      {course.teacher.email})
                    </p>
                    <p>
                      <strong>Lectures:</strong> {course.lecturesCount}
                    </p>
                    <p>
                      <strong>Status:</strong> {status}
                    </p>
                    <p>
                      <strong>Enrolled On:</strong>{" "}
                      {new Date(enrolledAt).toLocaleDateString()}
                    </p>

                    <Link href={`/student/enrolled-courses/${enrollmentId}`}>
                      <Button className="mt-3 w-full">View Stats</Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="bg-gray-900 text-gray-300 border-gray-700 disabled:opacity-50 hover:bg-gray-800"
          >
            Prev
          </Button>

          <span className="text-gray-400">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="bg-gray-900 text-gray-300 border-gray-700 disabled:opacity-50 hover:bg-gray-800"
          >
            Next
          </Button>
        </div>
      </div>
    </SidebarDemo>
  );
}
