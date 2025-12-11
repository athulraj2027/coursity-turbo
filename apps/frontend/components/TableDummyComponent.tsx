"use client";

import { SidebarDemo } from "@/components/Dashboard";

export default function TableDummyComponent({ header }: { header: string }) {
  return (
    <SidebarDemo header={header} role="teacher">
      <div className="mt-6 animate-pulse">
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 animate-pulse">
              <tr>
                {/* # */}
                <th className="px-4 py-3">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                </th>

                {/* Course Name */}
                <th className="px-4 py-3">
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </th>

                {/* Description */}
                <th className="px-4 py-3">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </th>

                {/* Price */}
                <th className="px-4 py-3 text-center">
                  <div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div>
                </th>

                {/* Start Date */}
                <th className="px-4 py-3 text-center">
                  <div className="h-4 w-20 bg-gray-200 rounded mx-auto"></div>
                </th>

                {/* Enrollments */}
                <th className="px-4 py-3 text-center">
                  <div className="h-4 w-20 bg-gray-200 rounded mx-auto"></div>
                </th>

                {/* Lectures */}
                <th className="px-4 py-3 text-center">
                  <div className="h-4 w-20 bg-gray-200 rounded mx-auto"></div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i}>
                  {/* 1. Index */}
                  <td className="px-4 py-3">
                    <div className="w-6 h-4 bg-gray-200 rounded"></div>
                  </td>

                  {/* 2. Course Name */}
                  <td className="px-4 py-3">
                    <div className="w-40 h-4 bg-gray-200 rounded"></div>
                  </td>

                  {/* 3. Description */}
                  <td className="px-4 py-3">
                    <div className="w-64 h-4 bg-gray-200 rounded"></div>
                  </td>

                  {/* 4. Price */}
                  <td className="px-4 py-3 text-center">
                    <div className="mx-auto w-16 h-4 bg-gray-200 rounded"></div>
                  </td>

                  {/* 5. Start Date */}
                  <td className="px-4 py-3 text-center">
                    <div className="mx-auto w-20 h-4 bg-gray-200 rounded"></div>
                  </td>

                  {/* 6. Enrollments */}
                  <td className="px-4 py-3 text-center">
                    <div className="mx-auto w-12 h-4 bg-gray-200 rounded"></div>
                  </td>

                  {/* 7. Lectures */}
                  <td className="px-4 py-3 text-center">
                    <div className="mx-auto w-12 h-4 bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </SidebarDemo>
  );
}
