"use client";

import { SidebarDemo } from "@/components/Dashboard";
import { fetchAllCoursesApi } from "@/lib/studentApi";
import { useEffect, useState } from "react";
import { Calendar, User, DollarSign, Search } from "lucide-react";
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const header = "Explore Courses";

  useEffect(() => {
    const fetchAllCourses = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchAllCoursesApi(page, 10);
        setCourses(data.data || []);
        setTotalPages(data.pagination.totalPages);
      } catch (error: any) {
        setError(error.message || "Failed to fetch courses");
        setCourses([]);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchAllCourses();
  }, [page]);

  const filteredAndSortedCourses = () => {
    let filtered = [...courses];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.teacher?.user?.username?.toLowerCase().includes(query)
      );
    }

    switch (sort) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        break;
      case "lowToHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  };

  const displayedCourses = filteredAndSortedCourses();

  if (initialLoad && loading) {
    return <DummyExplorePage role="student" header={header} />;
  }

  if (error) {
    return <ErrorFetchingPage header={header} role="student" error={error} />;
  }

  return (
    <SidebarDemo header={header} role="student">
      {/* Search + Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-gray-300 rounded-xl p-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border border-gray-400 text-black"
          />
        </div>

        {/* Sort */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="text-sm border-gray-500 text-black"
            >
              {sort ? `Sort: ${sort}` : "Sort By"}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 bg-white border border-gray-300">
            <DropdownMenuLabel className="text-black">
              Sort Courses
            </DropdownMenuLabel>
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

        {(sort || searchQuery) && (
          <Button
            variant="ghost"
            onClick={() => {
              setSort("");
              setSearchQuery("");
            }}
            className="text-black"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="p-4">
        {/* Pagination Loading */}
        {loading && !initialLoad && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          </div>
        )}

        {/* No Courses */}
        {!loading && displayedCourses.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">No courses found.</p>
          </div>
        ) : (
          !loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {displayedCourses.map((course) => (
                <Card
                  key={course.id}
                  className="border border-gray-400 bg-white rounded-xl shadow hover:shadow-md transition-all"
                >
                  <CardHeader className="pb-2">
                    <h2 className="text-lg font-semibold text-black line-clamp-1">
                      {course.name}
                    </h2>
                    <p className="text-sm text-gray-700 line-clamp-2 mt-1">
                      {course.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-2 text-sm text-black">
                    <p className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-black" />
                      <span className="font-medium">
                        ₹{course.price.toLocaleString()}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-black" />
                      {formatDate(course.startDate)}
                    </p>
                    <p className="flex items-center gap-2">
                      <User className="w-4 h-4 text-black" />
                      {course.teacher?.user?.username ?? "Unknown"}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-4">
                    <Link
                      href={`/student/explore-courses/${course.id}`}
                      className="w-full"
                    >
                      <Button className="w-full py-2 bg-black text-white hover:bg-gray-800">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )
        )}

        {/* Pagination */}
        {!loading && courses.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              disabled={page === 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="border border-gray-500 text-black bg-white"
            >
              Previous
            </Button>

            <span className="text-black font-medium">
              Page {page} of {totalPages}
            </span>

            <Button
              disabled={page === totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="border border-gray-500 text-black bg-white"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </SidebarDemo>
  );
}
