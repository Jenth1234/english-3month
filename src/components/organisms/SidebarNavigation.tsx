"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { AudioWaveform, GraduationCap, LayoutDashboard, Library, Mic, NotebookPen } from "lucide-react";

import { cn } from "@/lib/utils";
import { AppLogo } from "@/components/atoms/AppLogo";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vocabulary", label: "Vocabulary", icon: Library },
  { href: "/listening", label: "Listening", icon: AudioWaveform },
  { href: "/pronunciation", label: "Pronunciation", icon: Mic },
  { href: "/writing", label: "Writing", icon: NotebookPen },
  { href: "/simulation", label: "Simulation", icon: GraduationCap }
];

export function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-card p-4 md:flex">
      <AppLogo />
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === href : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
