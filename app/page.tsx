"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { useEffect } from "react"
import LandingPage from "./(auth)/landing/page"

export default function RootPage() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.push("/feed")
    }
  }, [isLoggedIn, isLoading, router])

  // Show landing page for non-authenticated users
  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return isLoggedIn ? null : <LandingPage />
}
