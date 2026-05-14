"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { notifications } from "@/lib/mock-data";
import { Layout, Activity, Users, Settings, ChevronRight, Sparkles, X, ArrowRight, Bell, Search, Menu, Sun, Moon, ChevronDown, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import { Avatar } from "@/components/ui/Avatar";

// ─── Nav items ───────────────────────────────────────────────────────────────
const navItems = [
  { href: "/", label: "Overview", icon: Layout },
  { href: "/analytics", label: "Analytics", icon: Activity },
  { href: "/revenue", label: "Revenue", icon: Sparkles },
  { href: "/users", label: "Users", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

// ─── Notifications Panel ─────────────────────────────────────────────────────
const typeConfig = {
  success: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" },
  error: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
  info: { icon: Info, color: "text-indigo-500", bg: "bg-indigo-500/10" },
};

function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div ref={ref} className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{notifications.filter((n) => !n.read).length} unread</p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><X className="w-4 h-4" /></button>
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
        {notifications.map((n) => {
          const cfg = typeConfig[n.type as keyof typeof typeConfig];
          const Icon = cfg.icon;
          return (
            <div key={n.id} className={cn("flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer", !n.read && "bg-indigo-50/50 dark:bg-indigo-900/10")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", cfg.bg)}>
                <Icon className={cn("w-4 h-4", cfg.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white">{n.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />}
            </div>
          );
        })}
      </div>
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700">
        <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">Mark all as read</button>
      </div>
    </div>
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ toggleMobile, breadcrumbs = [] }: { toggleMobile: () => void; breadcrumbs?: { label: string }[] }) {
  const { theme, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 px-4 lg:px-6 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50">
      <button onClick={toggleMobile} className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
        <Menu className="w-5 h-5" />
      </button>
      <div className="hidden sm:flex items-center gap-1.5 text-sm flex-1">
        {[{ label: "MetricFlow" }, ...breadcrumbs].map((crumb, i, arr) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-slate-400 dark:text-slate-600">/</span>}
            <span className={cn(i === arr.length - 1 ? "text-slate-900 dark:text-white font-medium" : "text-slate-500 dark:text-slate-400")}>{crumb.label}</span>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search..." value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 transition-all focus:w-64" />
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors" title="Toggle theme">
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="relative">
          <button onClick={() => setNotifOpen((o) => !o)} className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
            <Bell className="w-5 h-5" />
            {unread > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unread}</span>}
          </button>
          <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
          <Avatar initials="AJ" size="sm" />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">Alice Johnson</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
interface SidebarProps {
  collapsed: boolean;
  toggle: () => void;
  mobileOpen: boolean;
  closeMobile: () => void;
}

function SidebarInner({ collapsed, toggle, mobileOpen, closeMobile }: SidebarProps) {
  const pathname = usePathname();

  const Content = () => (
    <div className="flex flex-col h-full">
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-slate-200 dark:border-slate-700/50", collapsed && "justify-center px-2")}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-sm">MetricFlow</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">Analytics Suite</p>
          </div>
        )}
        <button onClick={closeMobile} className="ml-auto lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={closeMobile}
              className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white",
                collapsed && "justify-center px-2")}
              title={collapsed ? label : undefined}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0", active ? "text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-indigo-500")} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && active && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>
      {!collapsed && (
        <div className="mx-3 mb-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">Upgrade to Pro</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Unlock advanced analytics and unlimited users.</p>
          <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
            Learn more <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
      <div className="px-3 pb-4 hidden lg:block">
        <button onClick={toggle} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
          <ChevronRight className={cn("w-4 h-4 transition-transform duration-200", !collapsed && "rotate-180")} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className={cn("hidden lg:flex flex-col h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700/50 transition-all duration-300 flex-shrink-0", collapsed ? "w-16" : "w-60")}>
        <Content />
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobile} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700/50 z-50">
            <Content />
          </aside>
        </div>
      )}
    </>
  );
}

// ─── Dashboard Shell (exported) ───────────────────────────────────────────────
export function DashboardShell({ children, breadcrumbs = [{ label: "Overview" }] }: { children: React.ReactNode; breadcrumbs?: { label: string }[] }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { setCollapsed(true); }
      else { setCollapsed(false); setMobileOpen(false); }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <SidebarInner collapsed={collapsed} toggle={() => setCollapsed((c) => !c)} mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar toggleMobile={() => setMobileOpen((o) => !o)} breadcrumbs={breadcrumbs} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
