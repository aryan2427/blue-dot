export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 pb-10">
      <div className="inline-flex items-center gap-2 border border-green-200 bg-green-50 rounded-full px-4 py-2 text-sm text-green-700 mb-6">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        Live • Updated 2 min ago
      </div>

      <h1 className="text-6xl font-black leading-tight max-w-4xl tracking-tight">
        The job market of
        <span className="text-blue-600"> My District</span>,
        mapped in real time.
      </h1>

      <p className="mt-6 text-xl text-gray-600 max-w-3xl leading-relaxed">
        See where candidates and opportunities cluster across the district —
        before you sign up. A geo-aware way to connect talent with the right opening.
      </p>
    </section>
  );
}