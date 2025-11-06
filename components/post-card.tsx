"use client"

import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useState } from "react"

interface PostCardProps {
  id: number
  author: string
  avatar: string
  content: string
  image: string
  initialLikes: number
  comments: number
  timestamp: string
}

export function PostCard({ id, author, avatar, content, image, initialLikes, comments, timestamp }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-100">
        <img src={avatar || "/placeholder.svg"} alt={author} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-xs text-gray-500">{timestamp}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-800 mb-3">{content}</p>
        <img src={image || "/placeholder.svg"} alt="Post" className="w-full rounded-lg" />
      </div>

      {/* Post Actions */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-around text-gray-600">
        <button onClick={handleLike} className="flex items-center gap-2 hover:text-red-600 transition group">
          <Heart className={`w-5 h-5 ${liked ? "fill-red-600" : "group-hover:fill-red-600"}`} />
          <span className="text-sm">{likeCount}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-blue-600 transition">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">{comments}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-blue-600 transition">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </article>
  )
}
