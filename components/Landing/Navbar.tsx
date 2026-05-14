import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-4 border-blue-600"></div>
          </div>
          <h1 className="text-2xl font-bold">Blue Dot</h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="text-gray-600 hover:text-black transition text-sm font-medium">
              Sign in
            </button>
          </Link>

          <Link href="/login">
            <button className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition text-sm font-semibold">
              Get Started →
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}