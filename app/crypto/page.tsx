"use client"

import type React from "react"

import { TopNav } from "@/components/top-nav"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"
import { TrendingUp, TrendingDown, Plus, Minus, ArrowUpRight, ArrowDownLeft, DollarSign } from "lucide-react"
import { useState, useMemo } from "react"
import { useAuth } from "@/providers/auth-provider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface CryptoAsset {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  amount: number
  value: number
}

const cryptoAssets: CryptoAsset[] = [
  { id: "btc", symbol: "BTC", name: "Bitcoin", price: 42350.5, change24h: 5.2, amount: 0.25, value: 10587.625 },
  { id: "eth", symbol: "ETH", name: "Ethereum", price: 2250.75, change24h: -2.1, amount: 1.5, value: 3376.125 },
  { id: "usdc", symbol: "USDC", name: "USD Coin", price: 1.0, change24h: 0.0, amount: 5000, value: 5000 },
]

const generateChartData = () => {
  const data = [
    { time: "00:00", BTC: 41200, ETH: 2100, USDC: 1.0 },
    { time: "02:00", BTC: 41500, ETH: 2130, USDC: 1.0 },
    { time: "04:00", BTC: 41800, ETH: 2150, USDC: 1.0 },
    { time: "06:00", BTC: 41600, ETH: 2140, USDC: 1.0 },
    { time: "08:00", BTC: 41500, ETH: 2120, USDC: 1.0 },
    { time: "10:00", BTC: 41900, ETH: 2180, USDC: 1.0 },
    { time: "12:00", BTC: 42100, ETH: 2200, USDC: 1.0 },
    { time: "14:00", BTC: 42200, ETH: 2220, USDC: 1.0 },
    { time: "16:00", BTC: 42350, ETH: 2250, USDC: 1.0 },
    { time: "18:00", BTC: 42300, ETH: 2240, USDC: 1.0 },
    { time: "20:00", BTC: 42350, ETH: 2250, USDC: 1.0 },
  ]
  return data
}

export default function CryptoPage() {
  const { user, updateUser } = useAuth()
  const [cryptoBalance, setCryptoBalance] = useState(user?.balance || 0.0) // sync with user balance
  const [activeModal, setActiveModal] = useState<"buy" | "sell" | "convert" | null>(null)
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset | null>(null)
  const [copied, setCopied] = useState(false)
  const [conversionAmount, setConversionAmount] = useState("")
  const [selectedChart, setSelectedChart] = useState<"BTC" | "ETH" | "USDC">("BTC")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")

  const showNotify = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const chartData = useMemo(() => generateChartData(), [])
  const totalPortfolioValue = cryptoBalance
  const totalChange = 0

  const handleBuy = (crypto: CryptoAsset) => {
    setSelectedCrypto(crypto)
    setActiveModal("buy")
    setBuyAmount("")
  }

  const handleSell = (crypto: CryptoAsset) => {
    setSelectedCrypto(crypto)
    setActiveModal("sell")
    setSellAmount("")
  }

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCrypto || !buyAmount) return
    const amount = Number.parseFloat(buyAmount)
    const newBalance = cryptoBalance - amount
    setCryptoBalance(newBalance)
    updateUser({ cryptoBalance: newBalance, balance: newBalance })
    showNotify(`Purchased ${buyAmount} of ${selectedCrypto.name}`)
    setBuyAmount("")
    setActiveModal(null)
    setSelectedCrypto(null)
  }

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCrypto || !sellAmount) return
    const amount = Number.parseFloat(sellAmount)
    const newBalance = cryptoBalance + amount
    setCryptoBalance(newBalance)
    updateUser({ cryptoBalance: newBalance, balance: newBalance })
    showNotify(`Sold ${sellAmount} of ${selectedCrypto.name}`)
    setSellAmount("")
    setActiveModal(null)
    setSelectedCrypto(null)
  }

  const handleConvertSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!conversionAmount) return
    showNotify(`Converted $${conversionAmount} USD to ₦${(Number(conversionAmount) * 1650).toFixed(2)} NGN`)
    setConversionAmount("")
    setActiveModal(null)
  }

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(user?.walletAddress || "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <TopNav />

      <div className="flex">
        <DesktopNav />

        <main className="flex-1 max-w-4xl mx-auto w-full pb-20 md:pb-0">
          {/* Portfolio Overview */}
          <div className="p-4 md:p-6 bg-primary text-primary-foreground rounded-lg m-4 md:m-6">
            <p className="text-primary-foreground/80 text-sm mb-2">Portfolio Value</p>
            <h1 className="text-4xl font-bold mb-4">${cryptoBalance.toFixed(2)}</h1>
            <div className="flex items-center gap-2">
              {totalChange >= 0 ? (
                <TrendingUp className="w-5 h-5 text-accent" />
              ) : (
                <TrendingDown className="w-5 h-5 text-destructive" />
              )}
              <span className={totalChange >= 0 ? "text-accent" : "text-destructive"}>
                {totalChange >= 0 ? "+" : ""}${totalChange.toFixed(2)}
              </span>
              <span className="text-primary-foreground/80 text-sm">24h</span>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="px-4 md:px-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-3">Your Wallet</h2>
            <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                <p className="font-mono text-sm text-foreground truncate">{user?.walletAddress}</p>
              </div>
              <button
                onClick={handleCopyWallet}
                className={`px-3 py-1 rounded-lg transition text-sm font-medium flex-shrink-0 ml-2 ${
                  copied ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 px-4 md:px-6 mb-6 flex-wrap">
            <button
              onClick={() => {
                setSelectedCrypto(null)
                setActiveModal("buy")
                setBuyAmount("")
              }}
              className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Buy</span>
            </button>
            <button
              onClick={() => {
                setSelectedCrypto(null)
                setActiveModal("sell")
                setSellAmount("")
              }}
              className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-destructive text-white py-3 rounded-lg font-semibold hover:bg-destructive/90 transition"
            >
              <Minus className="w-5 h-5" />
              <span>Sell</span>
            </button>
            <button
              onClick={() => {
                setActiveModal("convert")
                setConversionAmount("")
              }}
              className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 transition"
            >
              <DollarSign className="w-5 h-5" />
              <span>Convert</span>
            </button>
          </div>

          <div className="px-4 md:px-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">24h Price Chart</h2>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="mb-4 flex gap-2 flex-wrap">
                {["BTC", "ETH", "USDC"].map((symbol) => (
                  <button
                    key={symbol}
                    onClick={() => setSelectedChart(symbol as "BTC" | "ETH" | "USDC")}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedChart === symbol
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  {selectedChart === "BTC" && (
                    <Line type="monotone" dataKey="BTC" stroke="#10b981" strokeWidth={2} dot={false} />
                  )}
                  {selectedChart === "ETH" && (
                    <Line type="monotone" dataKey="ETH" stroke="#ef4444" strokeWidth={2} dot={false} />
                  )}
                  {selectedChart === "USDC" && (
                    <Line type="monotone" dataKey="USDC" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Your Assets */}
          <div className="px-4 md:px-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Your Assets</h2>
            <div className="space-y-3">
              {cryptoAssets.map((crypto) => (
                <div
                  key={crypto.id}
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-primary">
                        {crypto.symbol[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{crypto.name}</p>
                        <p className="text-xs text-muted-foreground">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${crypto.value.toFixed(2)}</p>
                      <div
                        className={`flex items-center justify-end gap-1 text-xs font-medium ${crypto.change24h >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {crypto.change24h >= 0 ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4" />
                        )}
                        {crypto.change24h >= 0 ? "+" : ""}
                        {crypto.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBuy(crypto)}
                      className="flex-1 px-3 py-2 bg-green-100 text-green-600 rounded-lg text-sm font-medium hover:bg-green-200 transition"
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => handleSell(crypto)}
                      className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                    >
                      Sell
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <BottomNav />

      {activeModal === "buy" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Buy Crypto</h2>

            <form onSubmit={handleBuySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Select Crypto</label>
                <select
                  value={selectedCrypto?.id || ""}
                  onChange={(e) => {
                    const crypto = cryptoAssets.find((c) => c.id === e.target.value)
                    setSelectedCrypto(crypto || null)
                  }}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select cryptocurrency</option>
                  {cryptoAssets.map((crypto) => (
                    <option key={crypto.id} value={crypto.id}>
                      {crypto.name} ({crypto.symbol}) - ${crypto.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Amount (USD) $</label>
                <input
                  type="number"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="p-3 bg-muted/30 border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Est. Total</span>
                  <span className="font-semibold text-foreground">${buyAmount || "0.00"}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null)
                    setSelectedCrypto(null)
                    setBuyAmount("")
                  }}
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Buy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === "sell" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Sell Crypto</h2>

            <form onSubmit={handleSellSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Select Crypto</label>
                <select
                  value={selectedCrypto?.id || ""}
                  onChange={(e) => {
                    const crypto = cryptoAssets.find((c) => c.id === e.target.value)
                    setSelectedCrypto(crypto || null)
                  }}
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select cryptocurrency</option>
                  {cryptoAssets.map((crypto) => (
                    <option key={crypto.id} value={crypto.id}>
                      {crypto.name} ({crypto.symbol}) - ${crypto.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Amount (USD) $</label>
                <input
                  type="number"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="p-3 bg-muted/30 border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Est. Total</span>
                  <span className="font-semibold text-foreground">${sellAmount || "0.00"}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null)
                    setSelectedCrypto(null)
                    setSellAmount("")
                  }}
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Sell
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === "convert" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Currency Conversion</h2>

            <form onSubmit={handleConvertSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Amount (USD) $</label>
                <input
                  type="number"
                  value={conversionAmount}
                  onChange={(e) => setConversionAmount(e.target.value)}
                  placeholder="100.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="p-3 bg-muted/30 border border-border rounded-lg">
                <p className="text-sm text-muted-foreground">Converted Amount (NGN) ₦</p>
                <p className="text-2xl font-bold text-foreground">₦{(Number(conversionAmount) * 1650).toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">1 USD = ₦1,650 (Rate)</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null)
                    setConversionAmount("")
                  }}
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Convert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification Bar */}
      {showNotification && (
        <div className="fixed top-20 left-4 right-4 z-50 p-4 bg-primary text-primary-foreground rounded-lg shadow-lg animate-in slide-in-from-top">
          {notificationMessage}
        </div>
      )}
    </div>
  )
}
