"use client";

import { SidebarDemo } from "@/components/Dashboard";
import { fetchMyScheduledClasses } from "@/lib/api";
import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import TableDummyComponent from "@/components/TableDummyComponent";

export default function ScheduledClasses() {
  const router = useRouter();
  const [lectures, setLectures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // ✅ FIX: Start with true
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const header = "My Lectures";
  const itemsPerPage = 10;

  const startLecture = async (lectureId: string) => {
    window.open(`/teacher/lecture/${lectureId}`, "_blank");
  };

  useEffect(() => {
    const fetchLectures = async () => {
      setLoading(true);
      try {
        const data = await fetchMyScheduledClasses();
        setLectures(data.lectures || []);
        setTotalPages(Math.ceil((data.lectures?.length || 0) / itemsPerPage));
      } catch (error) {
        console.error("Failed to fetch lectures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  const editLecture = async (lectureId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/teacher/lectures/edit/${lectureId}`);
  };

  const dltLecture = async (lectureId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      console.log("Delete lecture:", lectureId);
    } catch (error) {
      console.error("Failed to delete lecture:", error);
    }
  };

  const handleStartLecture = (lectureId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    startLecture(lectureId);
  };

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecture.course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedLectures = filteredLectures.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) return <TableDummyComponent header={header} />;

  return (
    <SidebarDemo header={header} role="teacher">
      {/* Search and sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 backdrop-blur-md rounded-2xl p-4 mb-6">
        {/* Search */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Input
            type="text"
            placeholder="Search lectures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              <DropdownMenuLabel>Sort Lectures</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="newest">
                  Newest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">
                  Oldest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="upcoming">
                  Upcoming First
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="status">
                  By Status
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
              setSearchQuery("");
            }}
          >
            Clear
          </Button>

          {/* Create New Lecture */}
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => router.push("/teacher/lectures/create")}
          >
            + New Lecture
          </Button>
        </div>
      </div>

      <div className="mt-6">
        {/* ---------- Table ---------- */}
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  #
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Lecture Title
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Course
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Start Time
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedLectures.map((lecture, index) => (
                <tr
                  key={lecture.id}
                  onClick={() => router.push(`/teacher/lectures/${lecture.id}`)}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-4 py-3 text-gray-600">
                    {index + 1 + (page - 1) * itemsPerPage}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {lecture.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {lecture.course.name}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">
                    {format(new Date(lecture.startTime), "MMM d, yyyy • HH:mm")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lecture.status === "NOT_STARTED"
                          ? "bg-yellow-100 text-yellow-700"
                          : lecture.status === "LIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {lecture.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        onClick={(e) => handleStartLecture(lecture.id, e)}
                        className="h-8 px-3 text-xs"
                      >
                        Start
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => editLecture(lecture.id, e)}
                        className="h-8 px-3 text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => dltLecture(lecture.id, e)}
                        className="h-8 px-3 text-xs"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedLectures.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No lectures found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
