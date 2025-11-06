"use client"

import { TopNav } from "@/components/top-nav"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"
import {
  Search,
  TrendingUp,
  AlertCircle,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Zap,
  Plus,
  X,
  Upload,
  Video,
  Camera,
  Users,
  Gift,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/providers/auth-provider"

interface TrendingPost {
  id: number
  author: string
  avatar: string
  content: string
  likes: number
  comments: number
  timestamp: string
  category: string
  hasVideo?: boolean
  videoUrl?: string
  followers?: number
  isMonetized?: boolean
  earningsPerView?: number
  liked?: boolean
  isLive?: boolean
}

const trendingPosts: TrendingPost[] = [
  {
    id: 1,
    author: "Alex Johnson",
    avatar: "/professional-woman-diverse.png",
    content: "Just discovered this amazing feature on Vibenpay! You can now set savings goals directly in the app.",
    likes: 1240,
    comments: 234,
    timestamp: "4 hours ago",
    category: "entertainment",
    followers: 2500,
    isMonetized: false,
  },
  {
    id: 2,
    author: "Maya Patel",
    avatar: "/professional-woman-finance.png",
    content: "Bitcoin just hit a new all-time high! What's your prediction for next month?",
    likes: 5600,
    comments: 890,
    timestamp: "2 hours ago",
    category: "crypto",
    hasVideo: true,
    videoUrl: "/crypto-chart.jpg",
    followers: 8900,
    isMonetized: true,
    earningsPerView: 4,
  },
  {
    id: 3,
    author: "David Chen",
    avatar: "/professional-man.jpg",
    content: "5 simple ways to improve your financial literacy this year. Start with understanding compound interest!",
    likes: 3200,
    comments: 456,
    timestamp: "6 hours ago",
    category: "finance",
    followers: 5600,
    isMonetized: true,
    earningsPerView: 4,
  },
  {
    id: 4,
    author: "Sarah Ahmed",
    avatar: "/professional-woman.png",
    content: "New anime series just dropped! The animation quality is insane. Check it out on our streaming partner.",
    likes: 4120,
    comments: 567,
    timestamp: "3 hours ago",
    category: "anime & comics",
    hasVideo: true,
    videoUrl: "/social-media-post.jpg",
    followers: 12000,
    isMonetized: true,
    earningsPerView: 4,
    isLive: true,
  },
  {
    id: 5,
    author: "John Tech",
    avatar: "/professional-man.jpg",
    content: "Gaming is the future of entertainment. VR gaming revenue expected to hit $200B by 2030!",
    likes: 2890,
    comments: 345,
    timestamp: "5 hours ago",
    category: "entertainment",
    followers: 1200,
    isMonetized: false,
  },
]

const categories = [
  { id: "all", name: "All" },
  { id: "trending", name: "Trending" },
  { id: "entertainment", name: "Entertainment" },
  { id: "anime & comics", name: "Anime & Comics" },
  { id: "crypto", name: "Crypto" },
  { id: "finance", name: "Finance" },
]

const ContentModerationNotice = () => (
  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
    <div className="flex gap-3">
      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-amber-900 text-sm">Community Standards</p>
        <p className="text-xs text-amber-800 mt-1">
          Our platform does not allow explicit or sensitive content. This includes naked imagery, adult content, or any
          material that violates our community guidelines. All uploads are reviewed for compliance.
        </p>
      </div>
    </div>
  </div>
)

const MonetizationBadge = ({
  isMonetized,
  followers,
  earningsPerView,
}: { isMonetized: boolean; followers: number; earningsPerView?: number }) => {
  if (followers < 1000) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
        <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-blue-900">Monetization Locked</p>
          <p className="text-xs text-blue-700 mt-1">Reach 1,000 followers to unlock earning potential</p>
          <div className="mt-2 bg-blue-200 rounded-full h-1.5 w-full">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(followers / 1000) * 100}%` }} />
          </div>
          <p className="text-xs text-blue-700 mt-1">{followers}/1,000 followers</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
      <Zap className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-green-900 flex items-center gap-2">
          <span>Monetized</span>
          <span className="inline-block w-2 h-2 bg-green-600 rounded-full" />
        </p>
        <p className="text-xs text-green-700 mt-1">Earning ₦{earningsPerView} per 1,000 views</p>
        <p className="text-xs text-green-700 mt-1">{followers} followers</p>
      </div>
    </div>
  )
}

const LiveBadge = () => (
  <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold">
    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
    LIVE
  </div>
)

export default function SocialPage() {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState<TrendingPost[]>(trendingPosts)
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showComments, setShowComments] = useState<number | null>(null)
  const [expandedReplies, setExpandedReplies] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")
  const [showLiveModal, setShowLiveModal] = useState(false)
  const [liveTitle, setLiveTitle] = useState("")

  const [createData, setCreateData] = useState({
    caption: "",
    type: "video" as "video" | "text",
    details: "",
    hasSensitiveContent: false,
    media: null as File | null,
  })

  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === "all" || post.category === selectedCategory) &&
      (searchQuery === "" ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
      setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes - 1, liked: false } : post)))
    } else {
      setLikedPosts([...likedPosts, postId])
      setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1, liked: true } : post)))
    }
  }

  const handleCreatePost = () => {
    if (!createData.caption.trim()) {
      alert("Please add a caption")
      return
    }

    const newPost: TrendingPost = {
      id: posts.length + 1,
      author: user?.fullName || "Anonymous",
      avatar: user?.profilePic || "/placeholder.svg",
      content: createData.caption,
      likes: 0,
      comments: 0,
      timestamp: "just now",
      category: selectedCategory,
      followers: user?.followers || 0,
      isMonetized: (user?.followers || 0) >= 1000,
      earningsPerView: (user?.followers || 0) >= 1000 ? 4 : 0,
    }

    setPosts([newPost, ...posts])
    setShowCreateModal(false)
    setCreateData({ caption: "", type: "video", details: "", hasSensitiveContent: false, media: null })
    alert("Post created successfully!")
  }

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
            }
          : post,
      ),
    )
    setNewComment("")
    alert("Comment added!")
  }

  const handleGoLive = () => {
    if (!liveTitle.trim()) {
      alert("Please enter a title for your live stream")
      return
    }
    alert(`Live stream started: ${liveTitle}`)
    setShowLiveModal(false)
    setLiveTitle("")
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <div className="flex">
        <DesktopNav />

        <main className="flex-1 max-w-2xl mx-auto w-full pb-20 md:pb-0">
          {/* Header */}
          <div className="bg-card border-b border-border sticky top-16 z-40 p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Explore</h1>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search posts, creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-foreground placeholder-muted-foreground"
              />
            </div>
          </div>

          {/* Content Moderation Notice */}
          <div className="p-4 md:p-6 pt-4">
            <ContentModerationNotice />
          </div>

          {/* Category Filter */}
          <div className="bg-card border-b border-border p-4 md:p-6 overflow-x-auto sticky top-40 z-30">
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="p-4 md:p-6 space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center gap-3 border-b border-border">
                    <img
                      src={post.avatar || "/placeholder.svg"}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4 space-y-4">
                    <p className="text-foreground leading-relaxed">{post.content}</p>
                    {post.hasVideo && (
                      <div className="w-full rounded-lg overflow-hidden max-h-96 relative bg-black group cursor-pointer">
                        {post.isLive && <LiveBadge />}
                        <img
                          src={post.videoUrl || "/placeholder.svg"}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover group-hover:opacity-70 transition"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play
                            className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition"
                            fill="white"
                          />
                        </div>
                      </div>
                    )}

                    <MonetizationBadge
                      isMonetized={post.isMonetized || false}
                      followers={post.followers || 0}
                      earningsPerView={post.earningsPerView}
                    />
                  </div>

                  {/* Post Stats */}
                  <div className="px-4 py-2 border-t border-border flex gap-4 text-xs text-muted-foreground">
                    <span>{post.likes} Likes</span>
                    <span>{post.comments} Comments</span>
                  </div>

                  {/* Post Actions */}
                  <div className="p-4 border-t border-border flex items-center justify-around">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition group flex-1 justify-center"
                    >
                      <Heart
                        className="w-5 h-5 transition"
                        fill={likedPosts.includes(post.id) ? "currentColor" : "none"}
                        color={likedPosts.includes(post.id) ? "#ef4444" : "currentColor"}
                      />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button
                      onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition group flex-1 justify-center"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition group flex-1 justify-center">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  {showComments === post.id && (
                    <div className="border-t border-border bg-muted/20 p-4 space-y-4">
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        <div className="flex gap-3">
                          <img
                            src={user?.profilePic || "/placeholder.svg"}
                            alt="User"
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-foreground">{user?.fullName || "You"}</p>
                            <p className="text-xs text-muted-foreground">Sample comment</p>
                            <div className="flex gap-2 mt-2">
                              <button className="text-xs text-muted-foreground hover:text-primary">Like</button>
                              <button className="text-xs text-muted-foreground hover:text-primary">Reply</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-border">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground font-medium">No posts found in this category</p>
              </div>
            )}
          </div>

          {/* Trending Stats */}
          <div className="px-4 md:px-6 pb-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Platform Insights</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">12.5K</p>
                  <p className="text-xs text-muted-foreground mt-1">Active Creators</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">45.2K</p>
                  <p className="text-xs text-muted-foreground mt-1">Videos Today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">₦320M</p>
                  <p className="text-xs text-muted-foreground mt-1">Paid Out</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-24 md:bottom-8 right-8 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      <button
        onClick={() => setShowLiveModal(true)}
        className="fixed bottom-40 md:bottom-24 right-8 w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition z-40"
        title="Go Live"
      >
        <Camera className="w-6 h-6" />
      </button>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Create Post</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Post Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCreateData({ ...createData, type: "video" })}
                    className={`flex-1 px-3 py-2 rounded-lg border transition ${
                      createData.type === "video"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <Video className="w-4 h-4 inline mr-1" />
                    Video
                  </button>
                  <button
                    onClick={() => setCreateData({ ...createData, type: "text" })}
                    className={`flex-1 px-3 py-2 rounded-lg border transition ${
                      createData.type === "text"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    Caption
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Caption</label>
                <textarea
                  value={createData.caption}
                  onChange={(e) => setCreateData({ ...createData, caption: e.target.value })}
                  placeholder="What's on your mind?"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Media
                </label>
                <label className="w-full px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition bg-muted/20 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Click to upload</span>
                  <input type="file" accept={createData.type === "video" ? "video/*" : "image/*"} className="hidden" />
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLiveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Go Live</h2>
              <button onClick={() => setShowLiveModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Live Stream Title</label>
                <input
                  type="text"
                  value={liveTitle}
                  onChange={(e) => setLiveTitle(e.target.value)}
                  placeholder="What are you streaming?"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex gap-2 text-xs text-blue-900">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <p>You can earn ₦4 per 1,000 viewers. Go live to start earning!</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex gap-2 text-xs text-green-900">
                  <Gift className="w-4 h-4 flex-shrink-0" />
                  <p>Viewers can send gifts and tips to support your stream</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowLiveModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGoLive}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Start Live
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
