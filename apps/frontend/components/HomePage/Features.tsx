// Features.tsx
import React from "react";
import { InfiniteMovingCardsDemo } from "../ui/InfinityMovingCards";

const Features = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 justify-center items-center py-12 sm:py-16 px-4 text-center">
      <h1 className="tracking-tighter text-3xl sm:text-4xl md:text-5xl font-extrabold">
        Why Coursity?
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed tracking-tighter px-4">
        Powerful tools for teachers and engaging experiences for students — all
        in one platform.
      </p>
      <InfiniteMovingCardsDemo />
      <hr className="w-1/2 sm:w-1/3 md:w-1/4 border-t-2 border-gray-700 opacity-40 my-4 sm:my-6 rounded-full" />
    </div>
  );
};

export default Features;
