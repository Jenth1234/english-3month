import { ReactNode } from "react";

import { AppLogo } from "@/components/atoms/AppLogo";
import { SidebarNavigation } from "@/components/organisms/SidebarNavigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-accent/20">
      <SidebarNavigation />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-border bg-secondary/80 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase text-muted-foreground">English Roadmap</p>
            <h1 className="text-xl font-semibold tracking-tight">Daily Learning Control Center</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
              <span>Week 2</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" aria-hidden />
              <span>Phase 1 · Vocabulary Sprint</span>
            </div>
            <div className="md:hidden">
              <AppLogo />
            </div>
          </div>
        </header>
        <main className="flex-1 space-y-6 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}

