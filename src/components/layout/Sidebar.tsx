
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Building2,
  Hospital,
  Users,
  UserRound,
  UserCog,
  Stethoscope,
  LayoutDashboard,
  Settings,
  FileImport,
  FileBarChart,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  active,
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      <div className="w-5 h-5">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: "/",
    },
    {
      label: "Companies",
      icon: <Building2 className="w-5 h-5" />,
      href: "/companies",
    },
    {
      label: "Hospitals",
      icon: <Hospital className="w-5 h-5" />,
      href: "/hospitals",
    },
    {
      label: "Users",
      icon: <Users className="w-5 h-5" />,
      href: "/users",
    },
    {
      label: "Contacts",
      icon: <UserRound className="w-5 h-5" />,
      href: "/contacts",
    },
    {
      label: "Physicians",
      icon: <Stethoscope className="w-5 h-5" />,
      href: "/physicians",
    },
    {
      label: "Import",
      icon: <FileImport className="w-5 h-5" />,
      href: "/import",
    },
    {
      label: "Reports",
      icon: <FileBarChart className="w-5 h-5" />,
      href: "/reports",
    },
    {
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      href: "/settings",
    },
  ];

  return (
    <aside className="bg-sidebar flex h-screen w-64 flex-col border-r border-sidebar-border">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-sidebar-foreground">
          Partner Ecosystem
        </h2>
      </div>
      <div className="flex-1 overflow-auto px-3 py-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname === item.href}
            />
          ))}
        </nav>
      </div>
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground">
            <UserCog className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-sidebar-foreground">
              Michael Davis
            </p>
            <p className="text-xs text-sidebar-foreground/70">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
