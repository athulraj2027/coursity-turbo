import React from "react";
import { SidebarDemo } from "../Dashboard";

const DummyExplorePage = ({ header, role }) => {
  return (
    <SidebarDemo header={header} role={role}>
      <div className="p-6">
        {/* 🔄 Loading Skeleton Structure */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 bg-white/5 backdrop-blur-md rounded-2xl p-5 shadow-sm animate-pulse"
            >
              <div className="h-5 bg-gray-300/30 rounded mb-3 w-3/4" />
              <div className="h-3 bg-gray-300/20 rounded mb-4 w-full" />
              <div className="h-3 bg-gray-300/20 rounded mb-2 w-5/6" />
              <div className="space-y-2 mt-4">
                <div className="h-3 bg-gray-300/20 rounded w-1/3" />
                <div className="h-3 bg-gray-300/20 rounded w-1/2" />
                <div className="h-3 bg-gray-300/20 rounded w-2/3" />
              </div>
              <div className="h-9 bg-gray-300/25 rounded-lg mt-5" />
            </div>
          ))}
        </div>
      </div>
    </SidebarDemo>
  );
};

export default DummyExplorePage;
