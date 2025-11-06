"use client"

import { TopNav } from "@/components/top-nav"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"
import { Send, Search, X } from "lucide-react"
import { useState } from "react"

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Ahmed",
    avatar: "/professional-woman-diverse.png",
    lastMessage: "Thanks for sending the money!",
    timestamp: "2 min",
    unread: 1,
  },
  {
    id: 2,
    name: "John Tech",
    avatar: "/professional-man.jpg",
    lastMessage: "Let's discuss the project",
    timestamp: "1 hour",
    unread: 0,
  },
  {
    id: 3,
    name: "Emma Finance",
    avatar: "/professional-woman-finance.png",
    lastMessage: "Sounds good, see you tomorrow",
    timestamp: "3 hours",
    unread: 0,
  },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <div className="flex flex-1">
        <DesktopNav />

        <main className="flex-1 w-full pb-20 md:pb-0 flex flex-col md:flex-row bg-background h-[calc(100vh-64px)]">
          {/* Conversations List */}
          <div
            className={`w-full md:w-72 border-r border-border bg-card flex flex-col ${
              selectedChat !== null ? "hidden md:flex" : "flex"
            }`}
          >
            <div className="p-4 border-b border-border">
              <h1 className="text-2xl font-bold mb-4 text-foreground">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`w-full px-4 py-3 border-b border-border flex items-center gap-3 hover:bg-muted transition ${
                    selectedChat === conv.id ? "bg-muted" : ""
                  }`}
                >
                  <img
                    src={conv.avatar || "/placeholder.svg"}
                    alt={conv.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-semibold text-foreground truncate">{conv.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{conv.timestamp}</span>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col bg-background ${selectedChat === null ? "hidden md:flex" : "flex"}`}>
            {selectedChat ? (
              <>
                <div className="p-4 border-b border-border bg-card flex items-center justify-between md:justify-start">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden p-2 hover:bg-muted rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h2 className="font-semibold text-foreground flex-1 text-center md:text-left">
                    {conversations.find((c) => c.id === selectedChat)?.name}
                  </h2>
                </div>

                <div className="flex-1 p-4 overflow-y-auto flex items-end justify-center">
                  <p className="text-muted-foreground">Messages will appear here</p>
                </div>

                <div className="p-4 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type message..."
                      className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <button className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition flex-shrink-0 font-semibold flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline text-sm">Send</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center justify-center h-full text-muted-foreground">
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
