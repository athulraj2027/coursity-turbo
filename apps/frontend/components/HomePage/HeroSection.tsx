import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center min-h-screen text-center px-4">
      <h1 className="tracking-tighter text-6xl font-bold sm:w-[60%] md:w-[50%] mx-[10%]">
        Scalable Live Classroom System — Built from Scratch
      </h1>
      <h1 className="text-md sm:text-xl tracking-tighter font-light mx-[10%] sm:w-[80%] md:w-[40%]">
        A full-stack live course management platform where teachers host
        interactive classes with video, chat, whiteboard, and analytics — all
        powered by Next.js, WebRTC, Prisma, and PostgreSQL.
      </h1>
      <Button className="px-12">Get Started</Button>
      <hr className="w-1/4 border-t-2 border-gray-700 opacity-40 my-6 rounded-full" />
    </div>
  );
};

export default HeroSection;
