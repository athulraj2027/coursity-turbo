import React from "react";

interface MiniHeaderProps {
  heading: string;
  children?: React.ReactNode;
}

const MiniHeader: React.FC<MiniHeaderProps> = ({ heading, children }) => {
  return (
    <div className="w-full h-[20%] tracking-tighter flex justify-around items-center bg-gray-300 p-8 text-white mt-16">
      <h1
        className="text-4xl font-extrabold text-transparent"
        style={{
          WebkitTextStroke: "1px black", // outline color and thickness
          WebkitTextFillColor: "white", // text fill color
        }}
      >
        {heading}
      </h1>
      {children}
    </div>
  );
};

export default MiniHeader;
