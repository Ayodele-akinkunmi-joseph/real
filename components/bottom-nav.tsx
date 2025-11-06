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

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center flex-1 h-16 gap-1 transition ${
                isActive ? "text-primary border-t-2 border-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
