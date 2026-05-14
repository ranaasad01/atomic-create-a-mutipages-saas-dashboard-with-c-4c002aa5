"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  kpiData, revenueOverTime, userGrowthData, trafficSources, mrrData, notifications,
} from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Calendar, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

type TrendDir = "up" | "down";

function KpiCard({
  title, value, change, trend, icon: Icon, prefix, suffix, gradFrom,
}: {
  title: string;
  value: number;
  change: number;
  trend: TrendDir;
  icon: React.ElementType;
  prefix?: string;
  suffix?: string;
  gradFrom: string;
}) {
  const isUp = trend === "up";
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={"w-10 h-10 rounded-xl flex items-center justify-center " + gradFrom}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className={"flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full " + (isUp ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400")}>
            {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(change)}%
          </span>
        </div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {prefix ?? ""}{formatNumber(value)}{suffix ?? ""}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">vs last month</p>
      </div>
    </Card>
  );
}

type TooltipPayloadItem = { name: string; value: number; color: string };

function ChartTooltip({
  active, payload, label, prefix,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  prefix?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-xl">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-600 dark:text-slate-300 capitalize">{p.name}:</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {prefix ?? ""}{formatNumber(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

const notifIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  success: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" },
  error: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
  info: { icon: Info, color: "text-indigo-500", bg: "bg-indigo-500/10" },
};

export default function OverviewPage() {
  const [dateRange, setDateRange] = useState("12m");

  const filteredRevenue =
    dateRange === "3m" ? revenueOverTime.slice(-3)
    : dateRange === "6m" ? revenueOverTime.slice(-6)
    : revenueOverTime;

  const filteredUsers =
    dateRange === "3m" ? userGrowthData.slice(-3)
    : dateRange === "6m" ? userGrowthData.slice(-6)
    : userGrowthData;

  return (
    <DashboardShell breadcrumbs={[{ label: "Overview" }]}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Good morning, Alice 👋</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here&apos;s what&apos;s happening with MetricFlow today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
            {(["3m", "6m", "12m"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all " +
                  (dateRange === r
                    ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200")
                }
              >
                {r === "3m" ? "3 Months" : r === "6m" ? "6 Months" : "12 Months"}
              </button>
            ))}
          </div>
          <Button size="sm" variant="outline">
            <Calendar className="w-4 h-4" />
            Dec 2024
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Total Revenue"
          value={kpiData.revenue.value}
          change={kpiData.revenue.change}
          trend={kpiData.revenue.trend}
          icon={DollarSign}
          prefix="$"
          gradFrom="bg-gradient-to-br from-indigo-500 to-indigo-600"
        />
        <KpiCard
          title="Active Users"
          value={kpiData.users.value}
          change={kpiData.users.change}
          trend={kpiData.users.trend}
          icon={Users}
          gradFrom="bg-gradient-to-br from-violet-500 to-violet-600"
        />
        <KpiCard
          title="Churn Rate"
          value={kpiData.churn.value}
          change={Math.abs(kpiData.churn.change)}
          trend={kpiData.churn.trend}
          icon={TrendingDown}
          suffix="%"
          gradFrom="bg-gradient-to-br from-rose-500 to-rose-600"
        />
        <KpiCard
          title="Monthly Recurring Revenue"
          value={kpiData.mrr.value}
          change={kpiData.mrr.change}
          trend={kpiData.mrr.trend}
          icon={Activity}
          prefix="$"
          gradFrom="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <Badge variant="success">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5%
            </Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={filteredRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => "$" + v / 1000 + "k"} />
                <Tooltip content={(props) => <ChartTooltip {...props} prefix="$" />} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#6366f1" }} />
                <Line type="monotone" dataKey="target" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" dot={false} activeDot={{ r: 4, fill: "#8b5cf6" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {trafficSources.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [value + "%", ""]}
                  contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", fontSize: "12px", color: "#f1f5f9" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {trafficSources.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    <span className="text-slate-600 dark:text-slate-400">{s.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">{s.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <Badge variant="info">New vs Churned</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={filteredUsers} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={(props) => <ChartTooltip {...props} />} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="newUsers" name="New Users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="churned" name="Churned" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>MRR Trend</CardTitle>
            <Badge variant="success">+5.7%</Badge>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(41200)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Current MRR</p>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={mrrData.slice(-6)} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  formatter={(v: number) => [formatCurrency(v), "MRR"]}
                  contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", fontSize: "11px", color: "#f1f5f9" }}
                />
                <Area type="monotone" dataKey="mrr" stroke="#6366f1" strokeWidth={2} fill="url(#mrrGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <Button size="sm" variant="ghost">View all</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {notifications.slice(0, 5).map((n) => {
                const cfg = notifIcons[n.type] ?? notifIcons.info;
                const Icon = cfg.icon;
                return (
                  <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <div className={"w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 " + cfg.bg}>
                      <Icon className={"w-4 h-4 " + cfg.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{n.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-slate-400 dark:text-slate-500">{n.time}</span>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Avg Revenue / User", value: "$14.77", change: "+2.1%", up: true },
                { label: "Customer LTV", value: "$892", change: "+8.4%", up: true },
                { label: "CAC", value: "$124", change: "-3.2%", up: false },
                { label: "ARR", value: "$494.4K", change: "+5.7%", up: true },
                { label: "Trial Conversions", value: "34.2%", change: "+1.8%", up: true },
                { label: "Support Tickets", value: "12", change: "-5", up: false },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{stat.value}</span>
                    <span className={"text-xs font-medium " + (stat.up ? "text-emerald-500" : "text-red-500")}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">Monthly Goal Progress</span>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">78%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
                {formatCurrency(41200)} of {formatCurrency(52800)} target
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
