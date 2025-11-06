"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  accountNumber: string
  walletAddress: string
  balance: number
  cryptoBalance: number
  profilePic?: string
  isAdmin?: boolean
  showBalanceOnProfile?: boolean
  transactions?: Transaction[]
  reposts?: string[] // add reposts tracking
  followers?: number
  referralCode?: string
  verifiedFollowers?: boolean
}

interface Transaction {
  id: string
  type: "send" | "receive" | "buy" | "sell" | "topup"
  amount: number
  timestamp: string
  description: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (fullName: string, email: string, phoneNumber: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const generateAccountNumber = (phoneNumber: string) => {
  // Remove +, spaces, and country code - convert to format without leading 0
  const cleaned = phoneNumber.replace(/[^\d]/g, "")
  // Get last 10 digits (remove first 0 if present)
  return cleaned.length > 10 ? cleaned.substring(1) : cleaned.substring(0, 10)
}

const generateWalletAddress = () => {
  return "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
}

const DEMO_USER = {
  fullName: "John Doe",
  email: "demo@vibenpay.com",
  phoneNumber: "07062014710",
  password: "Demo123!@#",
  accountNumber: "7062014710",
  walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f42E9",
  balance: 0.0,
  cryptoBalance: 0.0,
  isAdmin: false,
  followers: 0,
  referralCode: "DEMO123",
  verifiedFollowers: false,
}

const DEMO_ADMIN = {
  fullName: "Admin User",
  email: "admin@vibenpay.com",
  phoneNumber: "08001112222",
  password: "Admin123!@#",
  accountNumber: "8001112222",
  walletAddress: "0xAdminWallet1234567890123456789012345678",
  balance: 0.0,
  cryptoBalance: 0.0,
  isAdmin: true,
  followers: 0,
  referralCode: "ADMIN123",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!localStorage.getItem("vibenpay_users")) {
      localStorage.setItem(
        "vibenpay_users",
        JSON.stringify([
          { ...DEMO_USER, id: "demo-user", verified: true, reposts: [] },
          { ...DEMO_ADMIN, id: "demo-admin", verified: true, reposts: [] },
        ]),
      )
    }

    const storedUser = localStorage.getItem("vibenpay_user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const storedUsers = JSON.parse(localStorage.getItem("vibenpay_users") || "[]")
    const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        phoneNumber: foundUser.phoneNumber,
        accountNumber: foundUser.accountNumber,
        walletAddress: foundUser.walletAddress,
        balance: foundUser.balance,
        cryptoBalance: foundUser.cryptoBalance,
        profilePic: foundUser.profilePic,
        isAdmin: foundUser.isAdmin,
        showBalanceOnProfile: foundUser.showBalanceOnProfile,
        transactions: foundUser.transactions,
        reposts: foundUser.reposts,
        followers: foundUser.followers || 0,
        referralCode: foundUser.referralCode,
      }
      setUser(userData)
      localStorage.setItem("vibenpay_user", JSON.stringify(userData))
      // Removed the redirect here - let the app handle routing
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const signup = async (fullName: string, email: string, phoneNumber: string, password: string) => {
    const storedUsers = JSON.parse(localStorage.getItem("vibenpay_users") || "[]")
    if (storedUsers.some((u: any) => u.email === email)) {
      throw new Error("Email already exists")
    }

    const accountNumber = generateAccountNumber(phoneNumber)

    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      phoneNumber,
      password,
      accountNumber,
      walletAddress: generateWalletAddress(),
      balance: 0.0,
      cryptoBalance: 0.0,
      verified: false,
      isAdmin: false,
      reposts: [],
      followers: 0,
      referralCode: `REF${Date.now().toString().slice(-6)}`,
    }

    storedUsers.push(newUser)
    localStorage.setItem("vibenpay_users", JSON.stringify(storedUsers))

    const userData: User = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      accountNumber: newUser.accountNumber,
      walletAddress: newUser.walletAddress,
      balance: newUser.balance,
      cryptoBalance: newUser.cryptoBalance,
      isAdmin: newUser.isAdmin,
      reposts: newUser.reposts,
      followers: newUser.followers,
      referralCode: newUser.referralCode,
    }
    setUser(userData)
    localStorage.setItem("vibenpay_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("vibenpay_user")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("vibenpay_user", JSON.stringify(updatedUser))

      const storedUsers = JSON.parse(localStorage.getItem("vibenpay_users") || "[]")
      const userIndex = storedUsers.findIndex((u: any) => u.id === user.id)
      if (userIndex !== -1) {
        storedUsers[userIndex] = { ...storedUsers[userIndex], ...updatedUser }
        localStorage.setItem("vibenpay_users", JSON.stringify(storedUsers))
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return { ...context, isLoading: context.isLoading }
}
