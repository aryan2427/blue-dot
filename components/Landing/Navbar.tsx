import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-4 border-blue-600"></div>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Blue Dot
          </h1>
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 text-gray-700 hover:text-black transition-all duration-300 text-sm font-medium">
              Sign in
            </button>
          </Link>

          <Link href="/login">
            <button className="px-5 py-2.5 rounded-xl bg-black text-white shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 text-sm font-semibold">
              Get Started →
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}