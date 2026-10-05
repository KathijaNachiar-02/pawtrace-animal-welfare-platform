"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PawPrint,
  FileWarning,
  LifeBuoy,
  HeartPulse,
  Home,
  Heart,
  Search,
  Bell,
  UserCircle,
  Settings,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Animals",
    href: "/animals",
    icon: PawPrint,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileWarning,
  },
  {
    name: "Rescue",
    href: "/rescue",
    icon: LifeBuoy,
  },
  {
    name: "Health",
    href: "/health",
    icon: HeartPulse,
  },
  {
    name: "Foster",
    href: "/foster",
    icon: Home,
  },
  {
    name: "Adoption",
    href: "/adoption",
    icon: Heart,
  },
  {
    name: "Lost & Found",
    href: "/lost-found",
    icon: Search,
  },
];

const bottomItems = [
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserCircle,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 flex-col border-r border-gray-200 bg-white lg:flex">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-gray-100 px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-green-700"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100">
            <PawPrint size={22} />
          </div>

          PawTrace
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Main Menu
        </p>

        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-green-50 text-green-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                }`}
              >
                <Icon
                  size={19}
                  className={
                    isActive
                      ? "text-green-700"
                      : "text-gray-400 group-hover:text-green-700"
                  }
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Account */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Account
          </p>

          <div className="space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon;

              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                  }`}
                >
                  <Icon
                    size={19}
                    className={
                      isActive
                        ? "text-green-700"
                        : "text-gray-400 group-hover:text-green-700"
                    }
                  />

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Card */}
      <div className="border-t border-gray-100 p-4">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
              U
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                User
              </p>

              <p className="truncate text-xs text-gray-500">
                Citizen Account
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}