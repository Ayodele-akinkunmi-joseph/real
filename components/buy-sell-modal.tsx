"use client"

import type React from "react"

import { X } from "lucide-react"
import { useState } from "react"

interface Crypto {
  id: string
  symbol: string
  name: string
  price: number
  amount: number
}

interface BuySellModalProps {
  crypto: Crypto
  type: "buy" | "sell"
  onClose: () => void
}

export function BuySellModal({ crypto, type, onClose }: BuySellModalProps) {
  const [quantity, setQuantity] = useState("")
  const [total, setTotal] = useState(0)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = Number.parseFloat(e.target.value) || 0
    setQuantity(e.target.value)
    setTotal(qty * crypto.price)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      type,
      crypto: crypto.symbol,
      quantity: Number.parseFloat(quantity),
      total,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
      <div className="bg-white w-full md:w-full md:max-w-md rounded-t-lg md:rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {type === "buy" ? "Buy" : "Sell"} {crypto.symbol}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Price</label>
            <p className="text-2xl font-bold text-gray-900">${crypto.price.toFixed(2)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity ({crypto.symbol})</label>
            <input
              type="number"
              placeholder="0.00"
              value={quantity}
              onChange={handleQuantityChange}
              step="0.0001"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total {type === "buy" ? "Cost" : "Value"}</p>
            <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
          </div>

          {type === "sell" && crypto.amount > 0 && (
            <p className="text-xs text-gray-500">
              Available: {crypto.amount} {crypto.symbol}
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 text-white rounded-lg font-semibold transition ${
                type === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {type === "buy" ? "Buy" : "Sell"} {crypto.symbol}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
