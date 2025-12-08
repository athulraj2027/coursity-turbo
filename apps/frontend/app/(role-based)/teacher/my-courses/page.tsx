"use client";

import { SidebarDemo } from "@/components/Dashboard";
import { fetchMyCourses } from "@/lib/api";
import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TeacherCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("");

  const header = "My Courses";

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchMyCourses(page, 10);
        setCourses(data.courses);
        setTotalPages(Math.ceil(data.total / data.limit));
      } catch (err: any) {
        setError(err.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [page]);

  if (loading)
    return (
      <SidebarDemo header={header} role="teacher">
        <p className="text-center text-gray-500 mt-10">Loading courses...</p>
      </SidebarDemo>
    );

  if (error)
    return (
      <SidebarDemo header={header} role="teacher">
        <p className="text-center text-red-500 mt-10">{error}</p>
      </SidebarDemo>
    );

  return (
    <SidebarDemo header={header} role="teacher">
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
      <div className="mt-6">
        {/* ---------- Table Layout ---------- */}
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  #
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Course Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Description
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Start Date
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Enrollments
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Lectures
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {courses.map((course, index) => (
                <tr
                  key={course.id}
                  onClick={() => router.push(`/teacher/my-courses/${course.id}`)}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-4 py-3 text-gray-600">
                    {index + 1 + (page - 1) * 10}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {course.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 truncate max-w-xs">
                    {course.description}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-800">
                    ${course.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">
                    {new Date(course.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-800">
                    {course._count.enrollments}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-800">
                    {course._count.lectures}
                  </td>
                </tr>
              ))}

              {courses.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- Pagination ---------- */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded-lg bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition"
          >
            Prev
          </button>
          <span className="text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded-lg bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition"
          >
            Next
          </button>
        </div>
      </div>
    </SidebarDemo>
  );
}
