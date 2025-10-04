import type { Metadata } from "next";
import { ReactNode } from "react";

import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "English Roadmap | 3-Month Work Communication",
  description:
    "Internal English learning roadmap for dev teams to build meeting, writing, and speaking confidence in 3 months.",
  keywords: [
    "english",
    "learning",
    "dev team",
    "communication",
    "dashboard",
    "roadmap"
  ]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
