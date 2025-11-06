export const apiClient = {
  // Transactions
  async getTransactions(userId?: string, type?: string) {
    const params = new URLSearchParams()
    if (userId) params.append("userId", userId)
    if (type) params.append("type", type)

    const response = await fetch(`/api/transactions?${params}`)
    if (!response.ok) throw new Error("Failed to fetch transactions")
    return response.json()
  },

  async createTransaction(data: {
    userId: string
    recipient: string
    amount: number
    message?: string
    type: string
  }) {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create transaction")
    return response.json()
  },

  // Crypto
  async getCryptoPrices(symbols?: string[]) {
    const params = new URLSearchParams()
    if (symbols) params.append("symbols", symbols.join(","))

    const response = await fetch(`/api/crypto/prices?${params}`)
    if (!response.ok) throw new Error("Failed to fetch crypto prices")
    return response.json()
  },

  async executeTrade(data: {
    userId: string
    symbol: string
    quantity: number
    type: "buy" | "sell"
  }) {
    const response = await fetch("/api/crypto/trade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to execute trade")
    return response.json()
  },

  // Posts
  async getPosts(category?: string, limit?: number) {
    const params = new URLSearchParams()
    if (category) params.append("category", category)
    if (limit) params.append("limit", limit.toString())

    const response = await fetch(`/api/posts?${params}`)
    if (!response.ok) throw new Error("Failed to fetch posts")
    return response.json()
  },

  async createPost(data: {
    userId: string
    content: string
    category?: string
    image?: string
  }) {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create post")
    return response.json()
  },

  // User Profile
  async getUserProfile(userId: string) {
    const response = await fetch(`/api/user/profile?userId=${userId}`)
    if (!response.ok) throw new Error("Failed to fetch profile")
    return response.json()
  },

  async updateUserProfile(userId: string, data: { name?: string; bio?: string }) {
    const response = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...data }),
    })
    if (!response.ok) throw new Error("Failed to update profile")
    return response.json()
  },
}
