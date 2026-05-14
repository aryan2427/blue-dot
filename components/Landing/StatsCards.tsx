import {
  Users,
  Briefcase,
  MapPin,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "ACTIVE CANDIDATES",
    value: "1,361",
    sub: "+128 this week",
    icon: Users,
  },
  {
    title: "OPEN POSITIONS",
    value: "260",
    sub: "+34 new today",
    icon: Briefcase,
  },
  {
    title: "HOTSPOT LOCATIONS",
    value: "10",
    sub: "Talcher leading",
    icon: MapPin,
  },
  {
    title: "MATCH RATE",
    value: "78%",
    sub: "+4.2% vs last month",
    icon: TrendingUp,
  },
];

export default function StatsCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm tracking-wide text-gray-500 font-medium">
                {item.title}
              </p>

              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Icon className="text-blue-600" size={22} />
              </div>
            </div>

            <h2 className="text-5xl font-black tracking-tight">
              {item.value}
            </h2>

            <p className="mt-4 text-green-600 font-medium">
              {item.sub}
            </p>
          </div>
        );
      })}
    </section>
  );
}