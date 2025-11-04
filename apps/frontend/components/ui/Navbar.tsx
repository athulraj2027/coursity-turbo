"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

const Navbar = () => {
  return (
    <div className="fixed top-0 sm:top-3 w-full backdrop-blur-xs">
      <div className=" px-5 max-w-5xl mx-auto flex 
      justify-between items-center p-3">
        <h1 className="text-2xl font-extrabold text-black cursor-pointer hover:underline">
          Coursity.
        </h1>
        <div>
          <ul className="flex justify-around items-center gap-3">
            <li className=" hover:text-gray-500">
              <Link href={`/`}>Home</Link>
            </li>
            <li className=" hover:text-gray-500">
              <Link href={`/courses`}>Courses</Link>
            </li>
            <li className=" hover:text-gray-500">
              <Link href={`/pricing`}>Pricing</Link>
            </li>
            <li className=" hover:text-gray-500">
              <Link href={`/about`}>About</Link>
            </li>
          </ul>
        </div>
        <Link href="/sign-in">
          <Button className="rounded-xl cursor-pointer px-8 ">Start for free</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
