"use client";

import CourseCard from "@/components/CourseCard";
import { SidebarDemo } from "@/components/Dashboard";
import { fetchMyCourses } from "@/lib/api";
import { useEffect, useState } from "react";

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

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
        {" "}
        <p className="text-center text-red-500 mt-10">{error}</p>
      </SidebarDemo>
    );
  return (
    <SidebarDemo header={header} role="teacher">
      <div className="">
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              name={course.name}
              description={course.description}
              price={course.price}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded-lg bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded-lg bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </SidebarDemo>
  );
}
