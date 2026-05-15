"use client";

import Link from "next/link";

interface Props {
  setIsChatOpen: (value: boolean) => void;
}

export default function Navbar({
  setIsChatOpen,
}: Props) {

  return (
    <nav className="w-full border-b border-gray-200 bg-white">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >

          <div
            className="
              w-10 h-10
              rounded-xl
              bg-blue-100
              flex items-center justify-center
            "
          >
            <div className="w-5 h-5 rounded-full border-4 border-blue-600"></div>
          </div>

          <h1 className="text-2xl font-bold">
            Blue Dot
          </h1>

        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* SIGN IN */}
          <Link href="/login">
            <button
              className="
                text-gray-600
                hover:text-black
                transition
                text-sm
                font-medium
              "
            >
              Sign in
            </button>
          </Link>

          {/* GET STARTED */}
          <Link href="/login">
            <button
              className="
                bg-black
                text-white
                px-5
                py-2.5
                rounded-2xl
                hover:bg-gray-800
                hover:scale-105
                transition-all
                duration-300
                text-sm
                font-semibold
                shadow-lg
              "
            >
              Get Started →
            </button>
          </Link>

          {/* AI LOGO BUTTON */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="
              w-11 h-11
              rounded-2xl
              bg-blue-600
              text-white
              flex items-center justify-center
              hover:bg-blue-700
              hover:scale-110
              transition-all
              duration-300
              shadow-lg
              shadow-blue-500/30
            "
          >

            <span className="text-lg font-bold animate-pulse">
              ✦
            </span>

          </button>

        </div>
      </div>
    </nav>
  );
}