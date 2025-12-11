"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[20rem] sm:h-[22rem] tracking-tighter rounded-md flex flex-col antialiased bg-white dark:bg-black w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-5xl dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      />
    </div>
  );
}

const testimonials = [
  {
    head: "Live Classes (WebRTC)",
    body: "Host interactive video sessions with chat and whiteboard tools.",
  },
  {
    head: "Role-Based Dashboards",
    body: "Teachers, students, and admins get tailored views and insights.",
  },
  {
    head: "Course Management",
    body: "Create, schedule, and manage paid or free courses with ease.",
  },
  {
    head: "Real-Time Analytics",
    body: "Track attendance, engagement, and progress automatically.",
  },
  {
    head: "Secure Authentication",
    body: "Custom made role-based access and JWT protection.",
  },
  {
    head: "Payments & Coupons",
    body: "Integrated Razorpay payments and custom coupon system.",
  },
];
