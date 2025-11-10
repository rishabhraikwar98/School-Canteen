"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
  const pathname = usePathname() || "/";

  const isHome = pathname === "/";
  const isStudents = pathname.startsWith("/students");

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / title */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
              School Canteen
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant={isHome ? "default" : "outline"} className="text-sm" aria-current={isHome ? "page" : undefined}>
              <Link href="/">Snacks</Link>
            </Button>

            <Button asChild variant={isStudents ? "default" : "outline"} className="text-sm" aria-current={isStudents ? "page" : undefined}>
              <Link href="/students">Students</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
