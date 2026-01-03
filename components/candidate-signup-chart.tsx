"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Calendar, ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

export function CandidateSignupChart() {
  const locale = useLocale();

  // Dummy data for the chart - showing last 7 days
  const dummyData = [
    { dayKey: "mon", signups: 12 },
    { dayKey: "tue", signups: 19 },
    { dayKey: "wed", signups: 15 },
    { dayKey: "thu", signups: 25 },
    { dayKey: "fri", signups: 22 },
    { dayKey: "sat", signups: 30 },
    { dayKey: "sun", signups: 28 },
  ];

  const maxSignups = Math.max(...dummyData.map((d) => d.signups));
  const minSignups = Math.min(...dummyData.map((d) => d.signups));
  const totalWeekly = dummyData.reduce((sum, d) => sum + d.signups, 0);
  const avgDaily = Math.round(totalWeekly / 7);

  // Calculate SVG path for the line chart
  const chartWidth = 100;
  const chartHeight = 60;
  const padding = 5;

  const points = dummyData.map((item, index) => {
    const x =
      (index / (dummyData.length - 1)) * (chartWidth - padding * 2) + padding;
    const y =
      chartHeight -
      ((item.signups - minSignups) / (maxSignups - minSignups)) *
        (chartHeight - padding * 2) -
      padding;
    return { x, y, signups: item.signups };
  });

  // Create smooth curve path
  const createSmoothPath = (
    points: Array<{ x: number; y: number; signups: number }>
  ) => {
    if (points.length === 0) return "";

    let path = `M ${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;

      path += ` Q ${current.x},${current.y} ${midX},${
        (current.y + next.y) / 2
      }`;
      path += ` Q ${next.x},${next.y} ${next.x},${next.y}`;
    }

    return path;
  };

  const linePath = createSmoothPath(points);
  const areaPath = `${linePath} L ${
    chartWidth - padding
  },${chartHeight} L ${padding},${chartHeight} Z`;

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span>{getContent("dashboard.chart.title", locale)}</span>
          </CardTitle>
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 px-3 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-700">
            <ArrowUpRight className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
              {getContent("dashboard.chart.growth", locale)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        {/* Line Chart */}
        <div className="relative bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-40"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            <line
              x1={padding}
              y1={chartHeight / 3}
              x2={chartWidth - padding}
              y2={chartHeight / 3}
              stroke="#e0e7ff"
              strokeWidth="0.3"
              strokeDasharray="3,3"
            />
            <line
              x1={padding}
              y1={(chartHeight * 2) / 3}
              x2={chartWidth - padding}
              y2={(chartHeight * 2) / 3}
              stroke="#e0e7ff"
              strokeWidth="0.3"
              strokeDasharray="3,3"
            />

            {/* Gradient definitions */}
            <defs>
              <linearGradient
                id="areaGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Area fill */}
            <path d={areaPath} fill="url(#areaGradient)" />

            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Day labels */}
          <div className="flex justify-between mt-2">
            {dummyData.map((item, index) => (
              <span
                key={index}
                className="text-xs font-medium text-muted-foreground"
              >
                {getContent(`dashboard.chart.days.${item.dayKey}`, locale)}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              <p className="text-xs font-medium text-muted-foreground">
                {getContent("dashboard.chart.totalThisWeek", locale)}
              </p>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {totalWeekly}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Calendar className="w-4 h-4 text-purple-600" />
              <p className="text-xs font-medium text-muted-foreground">
                {getContent("dashboard.chart.dailyAverage", locale)}
              </p>
            </div>
            <p className="text-3xl font-bold text-purple-600">{avgDaily}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
