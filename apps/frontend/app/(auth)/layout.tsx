import Navbar from "@/components/ui/Navbar";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen  ">
      <Navbar />
      {children}
    </div>
  );
}
