"use client";
import React from "react";
import {
  BookOpen,
  Video,
  BarChart,
  Search,
  ClipboardCheck,
} from "lucide-react";
import AppWorkingCard from "./AppWorkingCard";

const HowItWorks = () => {
  const teacherSteps = [
    {
      step: "1",
      title: "Create a Course",
      description:
        "Teachers can easily create and manage courses, set schedules, and define pricing.",
      icon: BookOpen,
    },
    {
      step: "2",
      title: "Host Live Lectures",
      description:
        "Go live with students using WebRTC-powered video calls, chat, and whiteboard tools.",
      icon: Video,
    },
    {
      step: "3",
      title: "Track Performance",
      description:
        "View analytics for attendance, engagement, and homework submissions.",
      icon: BarChart,
    },
  ];

  const studentSteps = [
    {
      step: "1",
      title: "Enroll in a Course",
      description:
        "Browse available courses, apply coupons, and securely enroll using integrated payment options.",
      icon: Search,
    },
    {
      step: "2",
      title: "Attend Live Classes",
      description:
        "Join interactive sessions powered by WebRTC — with video, chat, and whiteboard tools for real-time learning.",
      icon: Video,
    },
    {
      step: "3",
      title: "Track Your Progress",
      description:
        "Access attendance reports, homework submissions, and personalized analytics to monitor your growth.",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="tracking-tighter text-4xl sm:text-5xl font-extrabold mb-10">
          How Coursity Works
        </h1>

        {/* Grid Container */}
        <div className="grid md:grid-cols-2 gap-10 tracking-tighter">
          {/* Teacher Column */}
          <div className="flex flex-col gap-6 items-center">
            <h2 className="text-4xl font-bold mb-4 tracking-tighter">
              For Teachers
            </h2>
            <AppWorkingCard steps={teacherSteps} />
          </div>

          {/* Student Column */}
          <div className="flex flex-col gap-6 items-center">
            <h2 className="text-4xl font-bold mb-4 tracking-tighter">
              For Students
            </h2>
            <AppWorkingCard steps={studentSteps} />
          </div>
        </div>

        {/* Divider Line */}
        <hr className="w-1/4 mx-auto border-t-2 border-gray-700 opacity-40 my-10 rounded-full" />
      </div>
    </section>
  );
};

export default HowItWorks;
