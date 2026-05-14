// Mock data for the SaaS Dashboard

export const kpiData = {
  revenue: { value: 124500, change: 12.5, trend: "up" as const },
  users: { value: 8432, change: 8.2, trend: "up" as const },
  churn: { value: 2.4, change: -0.3, trend: "down" as const },
  mrr: { value: 41200, change: 5.7, trend: "up" as const },
};

export const revenueOverTime = [
  { month: "Jan", revenue: 32000, target: 30000 },
  { month: "Feb", revenue: 38000, target: 33000 },
  { month: "Mar", revenue: 35000, target: 36000 },
  { month: "Apr", revenue: 42000, target: 38000 },
  { month: "May", revenue: 48000, target: 42000 },
  { month: "Jun", revenue: 51000, target: 46000 },
  { month: "Jul", revenue: 55000, target: 50000 },
  { month: "Aug", revenue: 58000, target: 54000 },
  { month: "Sep", revenue: 62000, target: 58000 },
  { month: "Oct", revenue: 68000, target: 62000 },
  { month: "Nov", revenue: 72000, target: 66000 },
  { month: "Dec", revenue: 78000, target: 70000 },
];

export const userGrowthData = [
  { month: "Jan", newUsers: 320, churned: 45 },
  { month: "Feb", newUsers: 410, churned: 52 },
  { month: "Mar", newUsers: 380, churned: 48 },
  { month: "Apr", newUsers: 520, churned: 61 },
  { month: "May", newUsers: 610, churned: 55 },
  { month: "Jun", newUsers: 580, churned: 70 },
  { month: "Jul", newUsers: 720, churned: 65 },
  { month: "Aug", newUsers: 690, churned: 72 },
  { month: "Sep", newUsers: 810, churned: 68 },
  { month: "Oct", newUsers: 870, churned: 80 },
  { month: "Nov", newUsers: 920, churned: 75 },
  { month: "Dec", newUsers: 1050, churned: 88 },
];

export const trafficSources = [
  { name: "Organic Search", value: 38, color: "#6366f1" },
  { name: "Direct", value: 24, color: "#8b5cf6" },
  { name: "Social Media", value: 18, color: "#a78bfa" },
  { name: "Referral", value: 12, color: "#c4b5fd" },
  { name: "Email", value: 8, color: "#ddd6fe" },
];

export const mrrData = [
  { month: "Jan", mrr: 28000, arr: 336000 },
  { month: "Feb", mrr: 30500, arr: 366000 },
  { month: "Mar", mrr: 31200, arr: 374400 },
  { month: "Apr", mrr: 33800, arr: 405600 },
  { month: "May", mrr: 35100, arr: 421200 },
  { month: "Jun", mrr: 36700, arr: 440400 },
  { month: "Jul", mrr: 37900, arr: 454800 },
  { month: "Aug", mrr: 38500, arr: 462000 },
  { month: "Sep", mrr: 39200, arr: 470400 },
  { month: "Oct", mrr: 40100, arr: 481200 },
  { month: "Nov", mrr: 40800, arr: 489600 },
  { month: "Dec", mrr: 41200, arr: 494400 },
];

export const channelPerformance = [
  { channel: "Organic", sessions: 12400, conversions: 310, revenue: 18600 },
  { channel: "Paid", sessions: 8200, conversions: 246, revenue: 14760 },
  { channel: "Social", sessions: 6100, conversions: 122, revenue: 7320 },
  { channel: "Email", sessions: 4800, conversions: 192, revenue: 11520 },
  { channel: "Referral", sessions: 3200, conversions: 96, revenue: 5760 },
  { channel: "Direct", sessions: 9100, conversions: 273, revenue: 16380 },
];

export const periodComparison = [
  { month: "Jan", current: 32000, previous: 26000 },
  { month: "Feb", current: 38000, previous: 29000 },
  { month: "Mar", current: 35000, previous: 31000 },
  { month: "Apr", current: 42000, previous: 34000 },
  { month: "May", current: 48000, previous: 38000 },
  { month: "Jun", current: 51000, previous: 42000 },
];

export const revenueStreams = [
  { month: "Jan", starter: 8000, pro: 14000, enterprise: 10000 },
  { month: "Feb", starter: 8500, pro: 15500, enterprise: 14000 },
  { month: "Mar", starter: 7800, pro: 15200, enterprise: 12000 },
  { month: "Apr", starter: 9200, pro: 17800, enterprise: 15000 },
  { month: "May", starter: 10100, pro: 19900, enterprise: 18000 },
  { month: "Jun", starter: 10800, pro: 21200, enterprise: 19000 },
  { month: "Jul", starter: 11500, pro: 22500, enterprise: 21000 },
  { month: "Aug", starter: 12000, pro: 23000, enterprise: 23000 },
  { month: "Sep", starter: 12800, pro: 24200, enterprise: 25000 },
  { month: "Oct", starter: 13500, pro: 26500, enterprise: 28000 },
  { month: "Nov", starter: 14200, pro: 27800, enterprise: 30000 },
  { month: "Dec", starter: 15000, pro: 29000, enterprise: 34000 },
];

export const transactions = [
  { id: "TXN-001", customer: "Acme Corp", plan: "Enterprise", amount: 2400, status: "paid", date: "2024-12-01" },
  { id: "TXN-002", customer: "TechStart Inc", plan: "Pro", amount: 149, status: "paid", date: "2024-12-02" },
  { id: "TXN-003", customer: "Digital Wave", plan: "Starter", amount: 49, status: "paid", date: "2024-12-03" },
  { id: "TXN-004", customer: "CloudBase Ltd", plan: "Enterprise", amount: 2400, status: "pending", date: "2024-12-04" },
  { id: "TXN-005", customer: "Nexus Systems", plan: "Pro", amount: 149, status: "paid", date: "2024-12-05" },
  { id: "TXN-006", customer: "Bright Future", plan: "Starter", amount: 49, status: "failed", date: "2024-12-06" },
  { id: "TXN-007", customer: "Apex Solutions", plan: "Pro", amount: 149, status: "paid", date: "2024-12-07" },
  { id: "TXN-008", customer: "Velocity Labs", plan: "Enterprise", amount: 2400, status: "paid", date: "2024-12-08" },
  { id: "TXN-009", customer: "Orbit Media", plan: "Starter", amount: 49, status: "pending", date: "2024-12-09" },
  { id: "TXN-010", customer: "Fusion Tech", plan: "Pro", amount: 149, status: "paid", date: "2024-12-10" },
  { id: "TXN-011", customer: "Spark Analytics", plan: "Pro", amount: 149, status: "paid", date: "2024-12-11" },
  { id: "TXN-012", customer: "Nova Ventures", plan: "Enterprise", amount: 2400, status: "paid", date: "2024-12-12" },
  { id: "TXN-013", customer: "Pulse Digital", plan: "Starter", amount: 49, status: "failed", date: "2024-12-13" },
  { id: "TXN-014", customer: "Zenith Corp", plan: "Pro", amount: 149, status: "paid", date: "2024-12-14" },
  { id: "TXN-015", customer: "Horizon AI", plan: "Enterprise", amount: 2400, status: "paid", date: "2024-12-15" },
];

export const users = [
  { id: 1, name: "Alice Johnson", email: "alice@acmecorp.com", plan: "Enterprise", status: "active", joined: "2024-01-15", avatar: "AJ", revenue: 2400 },
  { id: 2, name: "Bob Martinez", email: "bob@techstart.io", plan: "Pro", status: "active", joined: "2024-02-20", avatar: "BM", revenue: 149 },
  { id: 3, name: "Carol White", email: "carol@digitalwave.co", plan: "Starter", status: "active", joined: "2024-03-05", avatar: "CW", revenue: 49 },
  { id: 4, name: "David Chen", email: "david@cloudbase.net", plan: "Enterprise", status: "inactive", joined: "2024-01-28", avatar: "DC", revenue: 2400 },
  { id: 5, name: "Eva Rodriguez", email: "eva@nexus.systems", plan: "Pro", status: "active", joined: "2024-04-12", avatar: "ER", revenue: 149 },
  { id: 6, name: "Frank Kim", email: "frank@brightfuture.com", plan: "Starter", status: "churned", joined: "2024-02-14", avatar: "FK", revenue: 49 },
  { id: 7, name: "Grace Lee", email: "grace@apex.solutions", plan: "Pro", status: "active", joined: "2024-05-01", avatar: "GL", revenue: 149 },
  { id: 8, name: "Henry Brown", email: "henry@velocity.labs", plan: "Enterprise", status: "active", joined: "2024-03-22", avatar: "HB", revenue: 2400 },
  { id: 9, name: "Iris Taylor", email: "iris@orbitmedia.io", plan: "Starter", status: "trial", joined: "2024-11-30", avatar: "IT", revenue: 0 },
  { id: 10, name: "Jack Wilson", email: "jack@fusiontech.co", plan: "Pro", status: "active", joined: "2024-06-18", avatar: "JW", revenue: 149 },
  { id: 11, name: "Karen Davis", email: "karen@sparkanalytics.com", plan: "Pro", status: "active", joined: "2024-07-09", avatar: "KD", revenue: 149 },
  { id: 12, name: "Liam Thompson", email: "liam@novaventures.io", plan: "Enterprise", status: "active", joined: "2024-04-25", avatar: "LT", revenue: 2400 },
  { id: 13, name: "Mia Garcia", email: "mia@pulsedigital.net", plan: "Starter", status: "churned", joined: "2024-03-11", avatar: "MG", revenue: 49 },
  { id: 14, name: "Noah Anderson", email: "noah@zenithcorp.com", plan: "Pro", status: "active", joined: "2024-08-03", avatar: "NA", revenue: 149 },
  { id: 15, name: "Olivia Harris", email: "olivia@horizonai.tech", plan: "Enterprise", status: "active", joined: "2024-05-17", avatar: "OH", revenue: 2400 },
  { id: 16, name: "Peter Clark", email: "peter@streamline.io", plan: "Starter", status: "trial", joined: "2024-12-01", avatar: "PC", revenue: 0 },
  { id: 17, name: "Quinn Lewis", email: "quinn@databridge.co", plan: "Pro", status: "active", joined: "2024-09-14", avatar: "QL", revenue: 149 },
  { id: 18, name: "Rachel Scott", email: "rachel@cloudpeak.net", plan: "Enterprise", status: "inactive", joined: "2024-02-08", avatar: "RS", revenue: 2400 },
  { id: 19, name: "Sam Young", email: "sam@pixelcraft.io", plan: "Starter", status: "active", joined: "2024-10-22", avatar: "SY", revenue: 49 },
  { id: 20, name: "Tina Walker", email: "tina@metaflow.com", plan: "Pro", status: "active", joined: "2024-11-05", avatar: "TW", revenue: 149 },
];

export const notifications = [
  { id: 1, type: "success", title: "Payment received", message: "Acme Corp paid $2,400 for Enterprise plan", time: "2 min ago", read: false },
  { id: 2, type: "warning", title: "Trial expiring", message: "Iris Taylor's trial expires in 2 days", time: "1 hour ago", read: false },
  { id: 3, type: "error", title: "Payment failed", message: "Bright Future's payment of $49 failed", time: "3 hours ago", read: false },
  { id: 4, type: "info", title: "New user signup", message: "Peter Clark signed up for a free trial", time: "5 hours ago", read: true },
  { id: 5, type: "success", title: "MRR milestone", message: "You've reached $41,200 MRR this month!", time: "1 day ago", read: true },
  { id: 6, type: "info", title: "Report ready", message: "Your December analytics report is ready", time: "2 days ago", read: true },
];

export const revenueMetrics = {
  totalRevenue: 124500,
  mrr: 41200,
  arr: 494400,
  avgRevenuePerUser: 14.77,
  ltv: 892,
  cac: 124,
};
