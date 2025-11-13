"use client";

import { SidebarDemo } from "@/components/Dashboard";
import { fetchAllCoursesApi } from "@/lib/studentApi";
import { useEffect, useState } from "react";
import { Calendar, User, DollarSign } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DummyExplorePage from "@/components/Dummy/DummyExplorePage";
import ErrorFetchingPage from "@/components/Dummy/ErrorFetchingPage";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");

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

  if (loading) return <DummyExplorePage role="student" header={header} />;

  if (error)
    return <ErrorFetchingPage header={header} role="student" error={error} />;

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
        {/* 🧭 Courses Grid */}
        {courses.length === 0 ? (
          <p className="text-center text-black mt-10">No courses found yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="border border-gray-300 bg-white/5 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md hover:border-gray-700 transition-all duration-200"
              >
                <CardHeader className="pb-2">
                  <h2 className="text-lg font-semibold text-black line-clamp-1">
                    {course.name}
                  </h2>
                  <p className="text-sm text-black line-clamp-2">
                    {course.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-2 text-sm text-black">
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
                </CardContent>

                <CardFooter>
                  <Link
                    href={`/student/explore-courses/${course.id}`}
                    className="w-full"
                  >
                    <Button className="w-full text-sm font-medium py-2 transition">
                      View
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* 📄 Pagination */}
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
