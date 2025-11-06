"use client"

import type React from "react"

import { TopNav } from "@/components/top-nav"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"
import { Bell, Send, TrendingUp, CreditCard, MessageCircle } from "lucide-react"

interface Notification {
  id: number
  type: "transaction" | "market" | "message" | "update"
  title: string
  message: string
  timestamp: string
  icon: React.ReactNode
  read: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "transaction",
    title: "Money Sent",
    message: "You sent $150 to Sarah Ahmed",
    timestamp: "2 hours ago",
    icon: <Send className="w-5 h-5" />,
    read: false,
  },
  {
    id: 2,
    type: "market",
    title: "Bitcoin Alert",
    message: "Bitcoin reached $45,000. Your target price alert triggered",
    timestamp: "5 hours ago",
    icon: <TrendingUp className="w-5 h-5" />,
    read: false,
  },
  {
    id: 3,
    type: "message",
    title: "New Message",
    message: "John Tech sent you a message",
    timestamp: "1 day ago",
    icon: <MessageCircle className="w-5 h-5" />,
    read: true,
  },
  {
    id: 4,
    type: "transaction",
    title: "Payment Received",
    message: "You received $50 from Emma Finance",
    timestamp: "2 days ago",
    icon: <CreditCard className="w-5 h-5" />,
    read: true,
  },
  {
    id: 5,
    type: "update",
    title: "App Update Available",
    message: "Vibenpay v2.1.0 is now available with new features",
    timestamp: "3 days ago",
    icon: <Bell className="w-5 h-5" />,
    read: true,
  },
]

const notificationTypeColors = {
  transaction: "bg-blue-50 text-blue-700",
  market: "bg-green-50 text-green-700",
  message: "bg-purple-50 text-purple-700",
  update: "bg-orange-50 text-orange-700",
}

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <div className="flex">
        <DesktopNav />

        <main className="flex-1 max-w-3xl mx-auto w-full pb-20 md:pb-0">
          {/* Header */}
          <div className="gradient-primary text-primary-foreground p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold">Notifications</h1>
            <p className="text-base opacity-90">Stay updated with your activity</p>
          </div>

          <div className="p-4 md:p-6">
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-lg border transition ${
                    notif.read ? "bg-card border-border" : "bg-muted border-primary/30"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-lg h-fit ${notificationTypeColors[notif.type]}`}>{notif.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{notif.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notif.timestamp}</p>
                    </div>
                    {!notif.read && <div className="w-3 h-3 rounded-full bg-primary mt-1"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
