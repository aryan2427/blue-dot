import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 pb-10">
      <div className="inline-flex items-center gap-2 border border-green-200 bg-green-50 rounded-full px-4 py-2 text-sm text-green-700 mb-6">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        Live • Updated 2 min ago
      </div>

      <h1 className="text-6xl font-black leading-tight max-w-4xl tracking-tight">
        The job market of
        <span className="text-blue-600"> Angul</span>,
        mapped in real time.
      </h1>

      <p className="mt-6 text-xl text-gray-600 max-w-3xl leading-relaxed">
        See where candidates and opportunities cluster across the district —
        before you sign up. A geo-aware way to connect talent with the right opening.
      </p>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <Link href="/login">
          <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
            Get Started →
          </button>
        </Link>

        <Link href="/login">
          <button className="text-gray-600 border border-gray-200 px-6 py-3 rounded-xl font-medium hover:border-gray-400 transition">
            Sign in
          </button>
        </Link>
      </div>
    </section>
  );
}