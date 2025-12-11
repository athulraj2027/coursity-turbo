"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

const Navbar = () => {
  return (
    <div className="fixed z-20 tracking-tighter top-0 sm:top-3 w-full backdrop-blur-xs">
      <div
        className=" px-5 max-w-5xl mx-auto flex 
      justify-between items-center p-3"
      >
        <Link href={`/`}>
          {" "}
          <h1 className="text-2xl font-extrabold text-black cursor-pointer hover:underline">
            Coursity.
          </h1>
        </Link>

        <div>
          <ul className="flex justify-around items-center gap-3">
            <li className=" hover:text-gray-500">
              <Link href={`/`}>Home</Link>
            </li>
            <li className=" hover:text-gray-500">
              <Link href={`/`}>Courses</Link>
            </li>
            <li className=" hover:text-gray-500">
              <Link href={`/`}>Pricing</Link>
            </li>
            <li className=" hover:text-gray-500">
              <Link href={`/`}>About</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-3">
          <Link href="/sign-in">
            <Button className="rounded-sm cursor-pointer ">Sign in</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="rounded-sm cursor-pointer px-8 ">
              Start for free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
