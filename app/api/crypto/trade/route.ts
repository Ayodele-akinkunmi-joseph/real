export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, symbol, quantity, type } = body

    // Validate input
    if (!userId || !symbol || !quantity || !type) {
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    if (type !== "buy" && type !== "sell") {
      return Response.json({ success: false, error: "Invalid transaction type" }, { status: 400 })
    }

    // Mock trade execution - replace with actual trade logic
    const mockPrices: Record<string, number> = {
      BTC: 42350.5,
      ETH: 2250.75,
      USDC: 1.0,
    }

    const price = mockPrices[symbol] || 0
    const total = quantity * price

    const trade = {
      id: Math.random(),
      userId,
      symbol,
      quantity,
      price,
      total,
      type,
      timestamp: new Date().toISOString(),
      status: "completed",
    }

    console.log("[API] Trade executed:", trade)

    return Response.json({ success: true, data: trade })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to execute trade" }, { status: 500 })
  }
}
