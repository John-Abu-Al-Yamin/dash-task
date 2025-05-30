"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "../global/ThemBtn";
import Link from "next/link";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="dark:bg-gray-900 bg-white shadow-sm relative z-50">
      <div className="flex justify-between items-center py-4 px-4 h-20 container mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <h1 className="text-2xl font-extrabold">Dashboard</h1>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="w-72 h-12 dark:bg-white bg-gray-100 shadow-md rounded-full px-4 relative flex items-center hover:scale-[1.02] transition-transform duration-200">
            <ul className="flex items-center justify-center gap-x-4 w-full h-full text-black">
                {["Home", "Users", "Add-User"].map((item) => (
                <li
                  key={item}
                  className="font-bold cursor-pointer text-sm hover:text-gray-500 hover:scale-105 transition-all duration-200"
                >
                  <a href={`${item.toLowerCase()}`}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          className="block cursor-pointer sm:hidden"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden bg-transparent overflow-hidden transition-all duration-300">
          <div className="px-4 py-6 flex flex-col gap-6">
            <div className="w-full h-12 dark:bg-white bg-gray-300 rounded-full px-4 relative flex items-center hover:scale-[1.02] transition-transform duration-200">
              <ul className="flex items-center justify-center gap-x-4 w-full h-full text-black">
                {["Home", "Users", "Add-User"].map((item) => (
                  <li
                    key={item}
                    className="font-bold text-sm hover:text-gray-500 hover:scale-105 transition-all duration-200"
                  >
                    <Link href={`${item.toLowerCase()}`}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
