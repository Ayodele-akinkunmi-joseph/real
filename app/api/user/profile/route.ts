export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return Response.json({ success: false, error: "User ID required" }, { status: 400 })
    }

    // Mock user profile - replace with actual database query
    const userProfile = {
      id: userId,
      name: "Sarah Ahmed",
      username: "@sarahahmed",
      bio: "Fintech enthusiast | Crypto lover | Digital nomad",
      followers: 1250,
      following: 432,
      postsCount: 48,
      walletAddress: "0x1234...5678",
      email: "sarah@example.com",
      joinDate: "2023-01-15",
      balance: 1250.5,
    }

    return Response.json({ success: true, data: userProfile })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { userId, name, bio } = body

    if (!userId) {
      return Response.json({ success: false, error: "User ID required" }, { status: 400 })
    }

    // Mock profile update - replace with actual database update
    const updatedProfile = {
      id: userId,
      name: name || "Sarah Ahmed",
      bio: bio || "Fintech enthusiast",
    }

    console.log("[API] Profile updated:", updatedProfile)

    return Response.json({ success: true, data: updatedProfile })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to update profile" }, { status: 500 })
  }
}
