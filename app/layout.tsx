import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MetricFlow — SaaS Analytics Dashboard",
  description: "Monitor your key business metrics with MetricFlow analytics suite.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.variable + " font-sans antialiased"}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
