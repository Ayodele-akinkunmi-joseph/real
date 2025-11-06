export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbols = searchParams.get("symbols")?.split(",") || ["BTC", "ETH", "USDC"]

    // Mock crypto price data - replace with real API (CoinGecko, CoinMarketCap, etc.)
    const priceData: Record<string, any> = {
      BTC: {
        symbol: "BTC",
        name: "Bitcoin",
        price: 42350.5,
        change24h: 5.2,
        marketCap: 830000000000,
        volume24h: 25000000000,
      },
      ETH: {
        symbol: "ETH",
        name: "Ethereum",
        price: 2250.75,
        change24h: -2.1,
        marketCap: 270000000000,
        volume24h: 12000000000,
      },
      USDC: {
        symbol: "USDC",
        name: "USD Coin",
        price: 1.0,
        change24h: 0.0,
        marketCap: 24000000000,
        volume24h: 5000000000,
      },
    }

    const filtered = symbols.map((sym) => priceData[sym]).filter(Boolean)

    return Response.json({ success: true, data: filtered })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch crypto prices" }, { status: 500 })
  }
}
