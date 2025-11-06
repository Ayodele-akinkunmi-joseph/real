export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const type = searchParams.get("type")

    // Mock transaction data - replace with actual database query
    const transactions = [
      {
        id: 1,
        userId: "123",
        name: "Sarah Ahmed",
        type: "sent",
        amount: 50,
        timestamp: "2024-11-01T14:30:00Z",
        status: "completed",
      },
      {
        id: 2,
        userId: "123",
        name: "Airtime - MTN",
        type: "airtime",
        amount: 10,
        timestamp: "2024-10-31T17:15:00Z",
        status: "completed",
      },
      {
        id: 3,
        userId: "123",
        name: "John Tech",
        type: "received",
        amount: 100,
        timestamp: "2024-10-29T10:45:00Z",
        status: "completed",
      },
    ]

    const filtered = transactions.filter((t) => (!userId || t.userId === userId) && (!type || t.type === type))

    return Response.json({ success: true, data: filtered })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch transactions" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, recipient, amount, message, type } = body

    // Validate input
    if (!userId || !recipient || !amount) {
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Mock transaction creation - replace with actual database insert
    const newTransaction = {
      id: Math.random(),
      userId,
      name: recipient,
      type,
      amount,
      message,
      timestamp: new Date().toISOString(),
      status: "pending",
    }

    console.log("[API] Transaction created:", newTransaction)

    return Response.json({ success: true, data: newTransaction })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to create transaction" }, { status: 500 })
  }
}
