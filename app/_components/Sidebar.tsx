"use client";
import React, { useState } from "react";
import {
  Users,
  BarChart2,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { ModeToggle } from "../global/ThemBtn";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
    { link: "/users", name: "Users", icon: BarChart2 },
    { link: "/add-user", name: "Add User", icon: Users },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const activeItem =
    menuItems.find((item) => pathname.startsWith(item.link))?.name || "";

  return (
    <div
      className={`flex flex-col h-screen  transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-bold ">Dashboard</h1>}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:light-bg-gray-200"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <>
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeItem === item.name
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-300 hover:shadow-md  dark:hover:bg-gray-800 "
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${collapsed ? "mx-auto" : "mr-3"}`}
                    />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              </>
            );
          })}
          <div className="hidden sm:block mt-4">
            <ModeToggle />
          </div>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center w-full mt-4 p-2 rounded-lg hover:bg-gray-300 hover:shadow-md  dark:hover:bg-gray-800  text-sm"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
