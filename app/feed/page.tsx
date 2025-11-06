"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { useEffect } from "react"
import { TopNav } from "@/components/top-nav"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"

export default function FeedPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <TopNav />

      <div className="flex">
        <DesktopNav />

        <main className="flex-1 max-w-2xl mx-auto w-full pb-20 md:pb-0">
          {/* Hero Section */}
          <div className="bg-primary text-primary-foreground p-6 md:p-8">
            <div className="max-w-md">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to Vibenpay</h1>
              <p className="text-base opacity-90">
                Send money, trade crypto, and stay connected—all in one secure platform
              </p>
            </div>
          </div>

          {/* Feed content will go here */}
          <div className="p-4 md:p-6 space-y-4">
            <p className="text-center text-muted-foreground py-8">Feed content coming soon...</p>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
