import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden max-w-7xl mx-auto px-6 pt-16 pb-20">
      
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-100 blur-3xl opacity-40 rounded-full pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 border border-green-200 bg-white/80 backdrop-blur-md shadow-sm rounded-full px-5 py-2 text-sm text-green-700 mb-8">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            Live • Updated 2 min ago
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight max-w-5xl text-gray-900">
            The job market of
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My District
            </span>
            mapped in real time.
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
            Discover where opportunities and talent connect across the district —
            powered by real-time insights, geo-aware mapping, and a smarter way
            to build careers locally.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">
            <Link href="/login">
              <button className="group bg-black text-white px-7 py-3.5 rounded-2xl font-semibold shadow-lg hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02]">
                <span className="flex items-center gap-2">
                  Get Started
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </button>
            </Link>

            <Link href="/login">
              <button className="px-7 py-3.5 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md text-gray-700 font-medium hover:border-gray-400 hover:bg-white transition-all duration-300">
                Sign In
              </button>
            </Link>
          </div>

          {/* Bottom Stats */}
          <div className="flex flex-wrap items-center gap-6 mt-14 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-black font-bold text-lg">12K+</span>
              Active Candidates
            </div>

            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>

            <div className="flex items-center gap-2">
              <span className="text-black font-bold text-lg">850+</span>
              Open Opportunities
            </div>

            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>

            <div className="flex items-center gap-2">
              <span className="text-black font-bold text-lg">24/7</span>
              Real-Time Updates
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center lg:justify-end">
          
          {/* Glow Behind Image */}
          <div className="absolute w-[420px] h-[420px] bg-blue-200/40 blur-3xl rounded-full"></div>

          {/* Image Card */}
          <div className="relative bg-white/70 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-[2rem] p-6">
            <Image
              src="/hero-illustration.svg"
              alt="Hero Illustration"
              width={600}
              height={600}
              className="w-full max-w-[520px] h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}