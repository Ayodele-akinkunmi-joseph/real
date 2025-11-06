"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Wallet, TrendingUp, User } from "lucide-react"

const navItems = [
  { href: "/feed", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/crypto", label: "Crypto", icon: TrendingUp },
  { href: "/profile", label: "Profile", icon: User },
]

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex flex-col gap-2 w-64 bg-card border-r border-border p-6 h-screen sticky top-16 overflow-y-auto">
      <div className="space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
