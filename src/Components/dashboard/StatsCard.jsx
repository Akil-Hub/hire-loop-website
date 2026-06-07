
import { Card } from "@heroui/react";


export default function StatsCard({ icon, label, value, trend, trendDir }) {
  const trendColor =
    trendDir === "up"
      ? "text-emerald-400"
      : trendDir === "down"
      ? "text-red-400"
      : "text-zinc-500";

  return (
    <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-zinc-600 transition-colors duration-200">

      {/* ICON */}
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
        {icon}
      </div>

      {/* LABEL */}
      <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">
        {label}
      </p>

      {/* VALUE */}
      <p className="text-2xl font-bold text-white leading-none">
        {value}
      </p>

      {/* TREND — optional */}
      {trend && (
        <p className={`text-xs font-medium ${trendColor}`}>
          {trend}
        </p>
      )}

    </Card>
  );
}