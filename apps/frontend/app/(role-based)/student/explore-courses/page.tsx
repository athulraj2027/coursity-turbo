"use client";

import { SidebarDemo } from "@/components/Dashboard";
import { fetchAllCoursesApi } from "@/lib/studentApi";
import { useEffect, useState } from "react";
import { Calendar, User, DollarSign } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const header = "Explore Courses";

  useEffect(() => {
    const fetchAllCourses = async () => {
      setLoading(true);
      try {
        const data = await fetchAllCoursesApi(page, 10);
        setCourses(data.data || []);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCourses();
  }, [page]);

  if (loading)
    return (
      <SidebarDemo header={header} role="student">
        <p className="text-center text-gray-500 mt-10">Loading courses...</p>
      </SidebarDemo>
    );

  if (error)
    return (
      <SidebarDemo header={header} role="student">
        <p className="text-center text-red-500 mt-10">{error}</p>
      </SidebarDemo>
    );

  return (
    <SidebarDemo header={header} role="student">
      <div className="p-6">
        {/* 🧭 Courses Grid */}
        {courses.length === 0 ? (
          <p className="text-center text-black mt-10">No courses found yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border border-gray-800 bg-white/5 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-700 transition-all duration-200"
              >
                <h2 className="text-lg font-semibold text-black mb-1 line-clamp-1">
                  {course.name}
                </h2>
                <p className="text-sm text-black line-clamp-2 mb-3">
                  {course.description}
                </p>

                <div className="space-y-2 text-sm text-black">
                  <p className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-black" />₹
                    {course.price.toLocaleString()}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-black" />
                    {format(new Date(course.startDate), "MMM d, yyyy")}
                  </p>
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4 text-black" />
                    {course.teacher?.user?.username ?? "Unknown"}
                  </p>
                </div>
                <Link href={`/student/explore-courses/${course.id}`}>
                  <Button className="mt-4 w-full text-sm font-medium py-2 transition">
                    View
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* 📄 Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </SidebarDemo>
  );
}
