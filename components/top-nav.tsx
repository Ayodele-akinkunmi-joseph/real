"use client"

import Link from "next/link"
import { Bell, MessageCircle, HelpCircle, LogOut, Moon, Sun } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { useTheme } from "next-themes"
import { useState } from "react"

export function TopNav() {
  const router = useRouter()
  const { user, isLoggedIn, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [showLogout, setShowLogout] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/signin")
  }

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo/Brand */}
          <Link href={isLoggedIn ? "/feed" : "/signin"} className="flex items-center gap-2 flex-shrink-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vibe-fH9M07jEipclbqzX4g5IO9otSe1CcP.png"
              alt="Vibenpay"
              className="h-9 w-auto"
            />
          </Link>

          {isLoggedIn && user && (
            <div className="hidden md:flex items-center text-sm">
              <span className="text-muted-foreground">Hi, </span>
              <span className="font-semibold text-foreground ml-1">{user.fullName.split(" ")[0]}</span>
            </div>
          )}

          {/* Right Navigation */}
          <div className="flex items-center gap-3 md:gap-6">
            {isLoggedIn && (
              <>
                <Link
                  href="/help"
                  className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition p-2"
                  title="Help"
                >
                  <HelpCircle className="w-5 h-5" />
                </Link>

                <Link
                  href="/chat"
                  className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition p-2"
                  title="Chat"
                >
                  <MessageCircle className="w-5 h-5" />
                </Link>

                <Link
                  href="/notifications"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition relative p-2"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                </Link>
              </>
            )}

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-muted rounded-lg transition"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Logout Button */}
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setShowLogout(!showLogout)}
                  className="p-2 hover:bg-muted rounded-lg transition"
                  title="User menu"
                >
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {user?.fullName.charAt(0)}
                  </div>
                </button>
                {showLogout && (
                  <button
                    onClick={handleLogout}
                    className="absolute right-0 mt-2 bg-card border border-border rounded-lg p-2 flex items-center gap-2 text-destructive hover:bg-destructive/10 transition whitespace-nowrap"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
