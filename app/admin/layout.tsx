"use client"

import type React from "react"

import { useAuth } from "@/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Shield } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (!isLoggedIn || !user?.isAdmin) {
      router.push("/")
      return
    }
  }, [isLoading, isLoggedIn, user?.isAdmin, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn || !user?.isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground px-6 py-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-foreground text-primary rounded-xl flex items-center justify-center font-bold text-xl shadow-md">
              V
            </div>
            <div>
              <h1 className="text-2xl font-bold">Vibenpay Admin</h1>
              <p className="text-sm opacity-90">Platform Management Dashboard</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm opacity-90">Logged in as</p>
              <p className="font-semibold">{user?.fullName}</p>
            </div>
            <Shield className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
