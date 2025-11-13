import React from "react";
import { SidebarDemo } from "../Dashboard";

const ErrorFetchingPage = ({ header, role, error }) => {
  return (
    <SidebarDemo header={header} role={role}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md w-full shadow-sm">
          <h2 className="text-red-600 text-lg font-semibold mb-2">
            Something went wrong
          </h2>
          <p className="text-red-500 text-sm mb-4">
            {error || "Unable to load courses. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    </SidebarDemo>
  );
};

export default ErrorFetchingPage;
