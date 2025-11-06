"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <Link href="/signin" className="flex items-center gap-2 text-primary mb-8 hover:gap-3 transition">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Sign In</span>
        </Link>

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vibe-fH9M07jEipclbqzX4g5IO9otSe1CcP.png"
            alt="Vibenpay"
            className="h-12 w-auto"
          />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2">Verify Your Email</h1>
        <p className="text-muted-foreground mb-8">We've sent a verification code to your email address</p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Verification Code</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Check your email for the 6-digit code</p>
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <p className="text-center mt-8 text-muted-foreground text-sm">
          Didn't receive the code? <button className="text-primary font-semibold hover:underline">Resend code</button>
        </p>
      </div>
    </div>
  )
}
