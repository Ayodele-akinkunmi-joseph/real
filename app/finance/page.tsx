"use client"

import type React from "react"

import { TopNav } from "@/components/top-nav"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"
import {
  Send,
  Phone,
  DollarSign,
  ArrowRight,
  Plus,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/providers/auth-provider"

interface RecentTransaction {
  id: number
  name: string
  type: "sent" | "received" | "airtime" | "data" | "bills" | "topup"
  amount: number
  timestamp: string
  status: "success" | "pending" | "failed"
}

export default function FinancePage() {
  const { user, updateUser } = useAuth()
  const [balance, setBalance] = useState(user?.balance || 0.0)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  const [notificationType, setNotificationType] = useState<"success" | "error" | "pending">("success")
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([
    {
      id: 1,
      name: "Sarah Ahmed",
      type: "sent",
      amount: 50000,
      timestamp: "Today at 2:30 PM",
      status: "success",
    },
    {
      id: 2,
      name: "Airtime - MTN",
      type: "airtime",
      amount: 10000,
      timestamp: "Yesterday at 5:15 PM",
      status: "success",
    },
    {
      id: 3,
      name: "John Tech",
      type: "received",
      amount: 100000,
      timestamp: "2 days ago",
      status: "success",
    },
  ])

  const [formData, setFormData] = useState({
    bank: "",
    recipient: "",
    amount: "",
    description: "",
  })

  const [airtimeData, setAirtimeData] = useState({ type: "airtime", phone: "", provider: "", amount: "" })
  const [billsData, setBillsData] = useState({ billType: "", amount: "" })
  const [topupData, setTopupData] = useState({ bank: "", amount: "" })
  const [verificationCode, setVerificationCode] = useState("")
  const [showVerification, setShowVerification] = useState(false)
  const [pendingTransaction, setPendingTransaction] = useState<any>(null)
  const [showBalance, setShowBalance] = useState(true)

  const nigeriaBanks = [
    "Access Bank",
    "First Bank",
    "GTBank",
    "UBA",
    "Zenith Bank",
    "Fidelity Bank",
    "FCMB",
    "Ecobank",
    "Guaranty Trust Bank",
    "Stanbic IBTC",
  ]

  const showNotify = (message: string, type: "success" | "error" | "pending" = "success") => {
    setNotificationMessage(message)
    setNotificationType(type)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 30000)
  }

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(user?.accountNumber || "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVerifyTransaction = () => {
    if (verificationCode !== "123456") {
      showNotify("Invalid verification code", "error")
      return
    }

    if (pendingTransaction.type === "send") {
      handleSendMoneyConfirmed()
    } else if (pendingTransaction.type === "airtime" || pendingTransaction.type === "data") {
      handleBuyAirtimeConfirmed()
    } else if (pendingTransaction.type === "bills") {
      handlePayBillsConfirmed()
    } else if (pendingTransaction.type === "topup") {
      handleTopupConfirmed()
    }

    setShowVerification(false)
    setVerificationCode("")
  }

  const handleSendMoney = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.bank) {
      showNotify("Please select a bank", "error")
      return
    }
    const amount = Number.parseFloat(formData.amount)
    if (amount > balance) {
      showNotify("Insufficient balance", "error")
      return
    }

    setPendingTransaction({
      type: "send",
      bank: formData.bank,
      recipient: formData.recipient,
      amount: amount,
      description: formData.description,
    })
    setShowVerification(true)
    showNotify("Verification code sent to your email. Please check and enter it.", "pending")
  }

  const handleSendMoneyConfirmed = () => {
    const amount = pendingTransaction.amount
    const newBalance = balance - amount
    setBalance(newBalance)
    updateUser({ balance: newBalance })
    setRecentTransactions([
      {
        id: recentTransactions.length + 1,
        name: pendingTransaction.recipient,
        type: "sent",
        amount,
        timestamp: "Just now",
        status: "success",
      },
      ...recentTransactions,
    ])
    showNotify(
      `₦${amount.toFixed(2)} sent to ${pendingTransaction.recipient} via ${pendingTransaction.bank}`,
      "success",
    )
    setFormData({ bank: "", recipient: "", amount: "", description: "" })
    setActiveModal(null)
    setPendingTransaction(null)
  }

  const handleBuyAirtime = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseFloat(airtimeData.amount)
    if (amount > balance) {
      showNotify("Insufficient balance", "error")
      return
    }

    setPendingTransaction({
      type: airtimeData.type,
      phone: airtimeData.phone,
      provider: airtimeData.provider,
      amount: amount,
      typeLabel: airtimeData.type === "airtime" ? "Airtime" : "Data",
    })
    setShowVerification(true)
    showNotify("Verification code sent to your email. Please check and enter it.", "pending")
  }

  const handleBuyAirtimeConfirmed = () => {
    const amount = pendingTransaction.amount
    const newBalance = balance - amount
    setBalance(newBalance)
    updateUser({ balance: newBalance })
    setRecentTransactions([
      {
        id: recentTransactions.length + 1,
        name: `${pendingTransaction.typeLabel} - ${pendingTransaction.provider}`,
        type: pendingTransaction.type,
        amount,
        timestamp: "Just now",
        status: "success",
      },
      ...recentTransactions,
    ])
    showNotify(
      `₦${amount.toFixed(2)} ${pendingTransaction.typeLabel.toLowerCase()} purchased for ${pendingTransaction.phone}`,
      "success",
    )
    setAirtimeData({ type: "airtime", phone: "", provider: "", amount: "" })
    setActiveModal(null)
    setPendingTransaction(null)
  }

  const handlePayBills = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseFloat(billsData.amount)
    if (amount > balance) {
      showNotify("Insufficient balance", "error")
      return
    }

    setPendingTransaction({
      type: "bills",
      billType: billsData.billType,
      amount: amount,
    })
    setShowVerification(true)
    showNotify("Verification code sent to your email. Please check and enter it.", "pending")
  }

  const handlePayBillsConfirmed = () => {
    const amount = pendingTransaction.amount
    const newBalance = balance - amount
    setBalance(newBalance)
    updateUser({ balance: newBalance })
    setRecentTransactions([
      {
        id: recentTransactions.length + 1,
        name: `Bill Payment - ${pendingTransaction.billType}`,
        type: "bills",
        amount,
        timestamp: "Just now",
        status: "success",
      },
      ...recentTransactions,
    ])
    showNotify(`₦${amount.toFixed(2)} bill payment processed for ${pendingTransaction.billType}`, "success")
    setBillsData({ billType: "", amount: "" })
    setActiveModal(null)
    setPendingTransaction(null)
  }

  const handleTopup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topupData.bank) {
      showNotify("Please select a bank", "error")
      return
    }

    const amount = Number.parseFloat(topupData.amount)

    setPendingTransaction({
      type: "topup",
      bank: topupData.bank,
      amount: amount,
    })
    setShowVerification(true)
    showNotify("Verification code sent to your email. Please confirm the transfer from your bank.", "pending")
  }

  const handleTopupConfirmed = () => {
    const amount = pendingTransaction.amount
    const newBalance = balance + amount
    setBalance(newBalance)
    updateUser({ balance: newBalance })
    setRecentTransactions([
      {
        id: recentTransactions.length + 1,
        name: `Top Up Wallet from ${pendingTransaction.bank}`,
        type: "topup",
        amount,
        timestamp: "Just now",
        status: "success",
      },
      ...recentTransactions,
    ])
    showNotify(`₦${amount.toFixed(2)} added to your wallet`, "success")
    setTopupData({ bank: "", amount: "" })
    setActiveModal(null)
    setPendingTransaction(null)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <TopNav />

      <div className="flex">
        <DesktopNav />

        <main className="flex-1 max-w-2xl mx-auto w-full pb-20 md:pb-0">
          {showNotification && (
            <div
              className={`fixed top-20 left-4 right-4 z-50 p-4 rounded-lg shadow-lg animate-in slide-in-from-top flex items-center gap-3 ${
                notificationType === "success"
                  ? "bg-green-500 text-white"
                  : notificationType === "error"
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
              }`}
            >
              {notificationType === "success" ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : notificationType === "error" ? (
                <XCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="flex-1">{notificationMessage}</span>
              <button
                onClick={() => setShowNotification(false)}
                className="text-white/80 hover:text-white transition ml-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* Wallet Card */}
          <div className="p-4 md:p-6 bg-primary text-primary-foreground rounded-lg m-4 md:m-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-primary-foreground/80 text-sm">Total Balance</p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-primary-foreground/20 rounded-lg transition"
                aria-label="Toggle balance visibility"
              >
                {showBalance ? (
                  <Eye className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <EyeOff className="w-5 h-5 text-primary-foreground" />
                )}
              </button>
            </div>
            <h1 className="text-4xl font-bold mb-8">{showBalance ? `₦${balance.toFixed(2)}` : "••••••"}</h1>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setActiveModal("send")}
                className="flex items-center gap-2 bg-primary-foreground text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary-foreground/90 transition"
              >
                <Send className="w-5 h-5" />
                Send Money
              </button>
              <button
                onClick={() => setActiveModal("topup")}
                className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition"
              >
                <Plus className="w-5 h-5" />
                Top Up
              </button>
            </div>
          </div>

          {/* Account Number Card */}
          <div className="px-4 md:px-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-3">Your Account</h2>
            <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Account Number (from phone: {user?.phoneNumber})</p>
                <p className="font-mono text-foreground font-semibold">{user?.accountNumber}</p>
              </div>
              <button
                onClick={handleCopyAccount}
                className={`px-3 py-1 rounded-lg transition text-sm font-medium ${
                  copied ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 px-4 md:px-6 mb-6">
            <button
              onClick={() => setActiveModal("send")}
              className="bg-card border border-border p-4 rounded-lg hover:border-primary/50 transition flex flex-col items-center gap-2 text-foreground"
            >
              <Send className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Send</span>
            </button>
            <button
              onClick={() => setActiveModal("airtime")}
              className="bg-card border border-border p-4 rounded-lg hover:border-primary/50 transition flex flex-col items-center gap-2 text-foreground"
            >
              <Phone className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Airtime/Data</span>
            </button>
            <button
              onClick={() => setActiveModal("bills")}
              className="bg-card border border-border p-4 rounded-lg hover:border-primary/50 transition flex flex-col items-center gap-2 text-foreground"
            >
              <DollarSign className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Bills</span>
            </button>
            <button
              onClick={() => setActiveModal("topup")}
              className="bg-card border border-border p-4 rounded-lg hover:border-primary/50 transition flex flex-col items-center gap-2 text-foreground"
            >
              <Plus className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Top Up</span>
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="px-4 md:px-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Recent Transactions</h2>
            <div className="space-y-3 bg-card rounded-lg overflow-hidden border border-border">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="px-4 py-3 border-b border-border last:border-b-0 flex items-center justify-between hover:bg-muted/30 transition"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "airtime" || transaction.type === "data"
                          ? "bg-green-100 text-green-600"
                          : transaction.type === "topup"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {transaction.type === "airtime" || transaction.type === "data" ? (
                        <Phone className="w-5 h-5" />
                      ) : transaction.type === "topup" ? (
                        <Plus className="w-5 h-5" />
                      ) : (
                        <ArrowRight className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{transaction.name}</p>
                      <p className="text-xs text-muted-foreground">{transaction.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p
                      className={`font-semibold ${
                        transaction.type === "received" || transaction.type === "topup"
                          ? "text-green-600"
                          : "text-foreground"
                      }`}
                    >
                      {transaction.type === "received" || transaction.type === "topup" ? "+" : "-"}₦
                      {transaction.amount.toFixed(2)}
                    </p>
                    {transaction.status === "success" && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <BottomNav />

      {showVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Verify Transaction</h2>
            <p className="text-sm text-muted-foreground mb-4">Enter the verification code sent to your email</p>

            <div className="mb-4 p-4 bg-muted/30 border border-border rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Demo Verification Code:</p>
              <p className="font-mono text-foreground font-bold">123456</p>
            </div>

            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4 text-center tracking-widest font-mono"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowVerification(false)
                  setVerificationCode("")
                  setActiveModal(null)
                }}
                className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyTransaction}
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Money Modal - Added bank selection dropdown */}
      {activeModal === "send" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">Send Money</h2>

            <form onSubmit={handleSendMoney} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Select Bank</label>
                <div className="relative">
                  <select
                    value={formData.bank}
                    onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    required
                  >
                    <option value="">Choose recipient's bank</option>
                    {nigeriaBanks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Recipient Email or Phone</label>
                <input
                  type="text"
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  placeholder="email@example.com or 08012345678"
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Amount (₦)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Description (Optional)</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Payment for..."
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Airtime/Data Modal - Added type selection step */}
      {activeModal === "airtime" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Buy Airtime or Data</h2>

            <form onSubmit={handleBuyAirtime} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">What do you want to buy?</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAirtimeData({ ...airtimeData, type: "airtime" })}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition ${
                      airtimeData.type === "airtime"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Airtime
                  </button>
                  <button
                    type="button"
                    onClick={() => setAirtimeData({ ...airtimeData, type: "data" })}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition ${
                      airtimeData.type === "data"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Data
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Phone Number</label>
                <input
                  type="tel"
                  value={airtimeData.phone}
                  onChange={(e) => setAirtimeData({ ...airtimeData, phone: e.target.value })}
                  placeholder="08012345678"
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Provider</label>
                <div className="relative">
                  <select
                    value={airtimeData.provider}
                    onChange={(e) => setAirtimeData({ ...airtimeData, provider: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    required
                  >
                    <option value="">Select Provider</option>
                    <option value="MTN">MTN</option>
                    <option value="Airtel">Airtel</option>
                    <option value="Glo">Glo</option>
                    <option value="9mobile">9mobile</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Amount (₦)</label>
                <input
                  type="number"
                  value={airtimeData.amount}
                  onChange={(e) => setAirtimeData({ ...airtimeData, amount: e.target.value })}
                  placeholder="1000"
                  step="100"
                  min="100"
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Buy {airtimeData.type === "airtime" ? "Airtime" : "Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bills Modal */}
      {activeModal === "bills" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Pay Bills</h2>

            <form onSubmit={handlePayBills} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Bill Type</label>
                <div className="relative">
                  <select
                    value={billsData.billType}
                    onChange={(e) => setBillsData({ ...billsData, billType: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    required
                  >
                    <option value="">Select Bill Type</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Water">Water</option>
                    <option value="Internet">Internet</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Subscription">Subscription</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Amount (₦)</label>
                <input
                  type="number"
                  value={billsData.amount}
                  onChange={(e) => setBillsData({ ...billsData, amount: e.target.value })}
                  placeholder="5000"
                  step="100"
                  min="100"
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Pay Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Top Up Modal - Updated bank dropdown to include all Nigerian banks */}
      {activeModal === "topup" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Top Up Wallet</h2>

            <form onSubmit={handleTopup} className="space-y-4">
              <div className="p-4 bg-muted/30 border border-border rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Transfer money from your bank account to the account below
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Select Your Bank</label>
                <div className="relative">
                  <select
                    value={topupData.bank}
                    onChange={(e) => setTopupData({ ...topupData, bank: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    required
                  >
                    <option value="">Select Your Bank</option>
                    {nigeriaBanks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg space-y-2">
                <p className="text-xs text-muted-foreground">Bank Account:</p>
                <p className="font-mono text-foreground font-bold">0123456789</p>
                <p className="text-xs text-muted-foreground">Bank Name: Access Bank Nigeria</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Amount (₦)</label>
                <input
                  type="number"
                  value={topupData.amount}
                  onChange={(e) => setTopupData({ ...topupData, amount: e.target.value })}
                  placeholder="50000.00"
                  step="0.01"
                  min="1"
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null)
                    setTopupData({ bank: "", amount: "" })
                  }}
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Confirm Top Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
