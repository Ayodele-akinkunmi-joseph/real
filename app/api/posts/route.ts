export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // Mock posts data - replace with actual database query
    const allPosts = [
      {
        id: 1,
        author: "Alex Johnson",
        content: "Just discovered this amazing feature on Vibenpay!",
        category: "trending",
        likes: 1240,
        comments: 234,
        timestamp: "2024-11-01T16:00:00Z",
      },
      {
        id: 2,
        author: "Maya Patel",
        content: "Bitcoin just hit a new all-time high!",
        category: "crypto",
        likes: 5600,
        comments: 890,
        timestamp: "2024-11-01T14:00:00Z",
      },
      {
        id: 3,
        author: "David Chen",
        content: "5 simple ways to improve your financial literacy",
        category: "finance",
        likes: 3200,
        comments: 456,
        timestamp: "2024-11-01T12:00:00Z",
      },
    ]

    const filtered = category ? allPosts.filter((p) => p.category === category) : allPosts

    return Response.json({
      success: true,
      data: filtered.slice(0, limit),
    })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, content, category, image } = body

    if (!userId || !content) {
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const post = {
      id: Math.random(),
      userId,
      author: "User",
      content,
      category: category || "general",
      image,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
    }

    console.log("[API] Post created:", post)

    return Response.json({ success: true, data: post })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to create post" }, { status: 500 })
  }
}
