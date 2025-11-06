"use client"

import { TrendingUp, TrendingDown, Plus, Minus } from "lucide-react"

interface Crypto {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  amount: number
  value: number
  icon: string
}

interface CryptoCardProps {
  crypto: Crypto
  onBuy: (crypto: Crypto) => void
  onSell: (crypto: Crypto) => void
}

export function CryptoCard({ crypto, onBuy, onSell }: CryptoCardProps) {
  const isPositive = crypto.change24h >= 0

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 to-indigo-200 flex items-center justify-center text-lg font-bold">
            {crypto.icon}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{crypto.name}</p>
            <p className="text-xs text-gray-500">{crypto.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900">${crypto.value.toFixed(2)}</p>
          <div
            className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {isPositive ? "+" : ""}
            {crypto.change24h.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
        <span>
          {crypto.amount} {crypto.symbol}
        </span>
        <span>${crypto.price.toFixed(2)}/unit</span>
      </div>

      {/* Buy/Sell Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onBuy(crypto)}
          className="flex-1 flex items-center justify-center gap-1 bg-green-50 text-green-600 py-2 rounded-lg font-medium hover:bg-green-100 transition text-sm"
        >
          <Plus className="w-4 h-4" />
          Buy
        </button>
        <button
          onClick={() => onSell(crypto)}
          className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition text-sm"
        >
          <Minus className="w-4 h-4" />
          Sell
        </button>
      </div>
    </div>
  )
}
