"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed z-20 tracking-tighter top-0 sm:top-3 w-full backdrop-blur-xs">
      <div className="px-5 max-w-5xl mx-auto flex justify-between items-center p-3">
        <Link href={`/`}>
          <h1 className="text-2xl font-extrabold text-black cursor-pointer hover:underline">
            Coursity.
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex justify-around items-center gap-3">
            <li className="hover:text-gray-500">
              <Link href={`/`}>Home</Link>
            </li>
            <li className="hover:text-gray-500">
              <Link href={`/`}>Courses</Link>
            </li>
            <li className="hover:text-gray-500">
              <Link href={`/`}>Pricing</Link>
            </li>
            <li className="hover:text-gray-500">
              <Link href={`/`}>About</Link>
            </li>
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <Link href="/sign-in">
            <Button className="rounded-sm cursor-pointer">Sign in</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="rounded-sm cursor-pointer px-8">
              Start for free
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1 w-6 h-6 justify-center items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`w-full h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 bg-white/95 backdrop-blur-sm">
          <ul className="flex flex-col gap-4 mb-4">
            <li className="hover:text-gray-500">
              <Link href={`/`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="hover:text-gray-500">
              <Link href={`/`} onClick={() => setIsMenuOpen(false)}>
                Courses
              </Link>
            </li>
            <li className="hover:text-gray-500">
              <Link href={`/`} onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
            </li>
            <li className="hover:text-gray-500">
              <Link href={`/`} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-3">
            <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
              <Button className="rounded-sm cursor-pointer w-full">
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
              <Button className="rounded-sm cursor-pointer px-8 w-full">
                Start for free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
