"use client"

import type React from "react"

import { TopNav } from "@/components/top-nav"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"
import {
  Settings,
  Edit2,
  Bell,
  HelpCircle,
  ChevronDown,
  Upload,
  Eye,
  EyeOff,
  Key,
  Trash2,
  Shield,
  Award,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/providers/auth-provider"
import { useRouter } from "next/navigation"

const mockPosts = [
  {
    id: 1,
    content: "Just hit 10,000 followers! Thanks to everyone supporting my creative journey",
    timestamp: "2 days ago",
    type: "video",
    likes: 1240,
    views: 45000,
    earnings: 180,
  },
  {
    id: 2,
    content: "Excited to announce my new partnership with VibenPay. Finally making crypto accessible!",
    timestamp: "5 days ago",
    type: "text",
    likes: 890,
    views: 0,
    earnings: 0,
  },
  {
    id: 3,
    content: "Tutorial: How to optimize your video content for maximum earnings on VibenPay",
    timestamp: "1 week ago",
    type: "video",
    likes: 2340,
    views: 78000,
    earnings: 312,
  },
]

const rewards = [
  {
    id: 1,
    name: "Creator Milestone",
    description: "10,000 followers reached",
    earned: true,
    earnedDate: "2024-01-15",
    icon: "🎯",
    bonus: "₦5,000",
  },
  {
    id: 2,
    name: "Viral Content",
    description: "100K+ views on a single post",
    earned: true,
    earnedDate: "2024-01-10",
    icon: "🚀",
    bonus: "₦2,500",
  },
  {
    id: 3,
    name: "Consistency Streak",
    description: "Post daily for 30 days",
    earned: false,
    earnedDate: null,
    icon: "🔥",
    bonus: "₦1,000",
  },
  {
    id: 4,
    name: "Community Champion",
    description: "1,000 positive comments",
    earned: false,
    earnedDate: null,
    icon: "👑",
    bonus: "₦3,000",
  },
]

const mockReposts = [{ id: 1, content: "Sample repost", timestamp: "2023-10-01" }]

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth()
  const router = useRouter()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [activeSettings, setActiveSettings] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profilePic, setProfilePic] = useState(user?.profilePic || "")
  const [currentTab, setCurrentTab] = useState<"posts" | "reposts" | "rewards">("posts")
  const [showBalanceOnProfile, setShowBalanceOnProfile] = useState(user?.showBalanceOnProfile !== false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  const [securityData, setSecurityData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })

  const [editProfileData, setEditProfileData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
  })

  const totalEarnings = mockPosts.reduce((sum, post) => sum + (post.earnings || 0), 0)
  const totalViews = mockPosts.reduce((sum, post) => sum + (post.views || 0), 0)
  const totalLikes = mockPosts.reduce((sum, post) => sum + (post.likes || 0), 0)
  const earnedRewards = rewards.filter((r) => r.earned).length

  const showNotify = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleLogout = () => {
    logout()
    router.push("/signin")
  }

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(user?.walletAddress || "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setProfilePic(result)
        updateUser({ profilePic: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePasswordChange = () => {
    if (!securityData.currentPassword || !securityData.newPassword || !securityData.confirmPassword) {
      showNotify("Please fill all password fields")
      return
    }

    if (securityData.newPassword !== securityData.confirmPassword) {
      showNotify("New passwords do not match")
      return
    }

    if (securityData.newPassword.length < 8) {
      showNotify("Password must be at least 8 characters")
      return
    }

    showNotify("Password changed successfully!")
    setSecurityData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleShowBalance = (newValue: boolean) => {
    setShowBalanceOnProfile(newValue)
    updateUser({ showBalanceOnProfile: newValue })
    showNotify(`Balance ${newValue ? "shown" : "hidden"} on profile`)
  }

  const handleEditProfileSave = () => {
    if (!editProfileData.fullName.trim()) {
      showNotify("Full name is required")
      return
    }
    updateUser({
      fullName: editProfileData.fullName,
      email: editProfileData.email,
      phoneNumber: editProfileData.phoneNumber,
      bio: editProfileData.bio,
    })
    showNotify("Profile updated successfully!")
    setActiveSettings(null)
  }

  const handleDeleteAccount = () => {
    showNotify("Account deletion initiated. Check your email for confirmation.")
    setTimeout(() => {
      logout()
      router.push("/signin")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <TopNav />

      <div className="flex">
        <DesktopNav />

        <main className="flex-1 max-w-2xl mx-auto w-full pb-20 md:pb-0">
          {showNotification && (
            <div className="fixed top-20 left-4 right-4 z-50 p-4 bg-primary text-primary-foreground rounded-lg shadow-lg animate-in slide-in-from-top">
              {notificationMessage}
            </div>
          )}

          <div className="h-24 md:h-32 bg-gradient-to-r from-primary to-primary/80" />

          <div className="px-4 md:px-6 -mt-12 mb-6 relative z-10">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 mb-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-1">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-background bg-primary flex items-center justify-center text-3xl font-bold text-primary-foreground overflow-hidden">
                      {profilePic ? (
                        <img
                          src={profilePic || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user?.fullName.charAt(0)
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition">
                      <Upload className="w-4 h-4" />
                      <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
                    </label>
                  </div>

                  <div className="text-center sm:text-left flex-1">
                    <h1 className="text-2xl font-bold text-foreground">{user?.fullName}</h1>
                    <p className="text-muted-foreground text-sm">{user?.email}</p>
                    {user?.bio && <p className="text-muted-foreground text-sm mt-1">{user.bio}</p>}
                  </div>
                </div>

                <button
                  onClick={() => setActiveSettings(activeSettings === "edit-profile" ? null : "edit-profile")}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Edit Profile</span>
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-3">Creator Stats</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">{totalViews.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Views</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">{totalLikes.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Likes</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">₦{totalEarnings.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Earnings</p>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-3">Account Details</h2>
            <div className="space-y-3">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-foreground font-semibold">{user?.accountNumber}</p>
                  <button className="text-xs text-muted-foreground hover:text-primary transition">Copy</button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="font-mono text-foreground font-semibold text-xs sm:text-sm truncate flex-1">
                    {user?.walletAddress}
                  </p>
                  <button
                    onClick={handleCopyWallet}
                    className={`text-xs font-medium transition whitespace-nowrap ${
                      copied ? "text-green-600" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {showBalanceOnProfile && (
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Account Balance</p>
                  <p className="font-semibold text-foreground text-lg">₦{user?.balance.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 md:px-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-3">Your Activity</h2>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 border-b border-border">
              <button
                onClick={() => setCurrentTab("posts")}
                className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                  currentTab === "posts"
                    ? "border-b-2 border-primary text-primary"
                    : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Posts ({mockPosts.length})
              </button>
              <button
                onClick={() => setCurrentTab("rewards")}
                className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center gap-2 ${
                  currentTab === "rewards"
                    ? "border-b-2 border-primary text-primary"
                    : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Award className="w-4 h-4" />
                Rewards ({earnedRewards})
              </button>
              <button
                onClick={() => setCurrentTab("reposts")}
                className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                  currentTab === "reposts"
                    ? "border-b-2 border-primary text-primary"
                    : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Reposts ({mockReposts.length})
              </button>
            </div>

            <div className="space-y-3">
              {currentTab === "posts" ? (
                mockPosts.length > 0 ? (
                  mockPosts.map((post) => (
                    <div key={post.id} className="bg-card border border-border rounded-lg p-4">
                      <div className="mb-3">
                        <p className="text-foreground font-medium mb-1">{post.content}</p>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                      </div>

                      {post.type === "video" && (
                        <div className="bg-muted/40 rounded-lg p-3">
                          <div className="grid grid-cols-3 gap-3">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-primary">{post.views.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground mt-1">Views</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-destructive">{post.likes.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground mt-1">Likes</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-primary">₦{post.earnings}</p>
                              <p className="text-xs text-muted-foreground mt-1">Earnings</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-6 bg-card rounded-lg border border-border">
                    No posts yet
                  </p>
                )
              ) : currentTab === "rewards" ? (
                <div className="space-y-3">
                  {rewards.map((reward) => (
                    <div
                      key={reward.id}
                      className={`border rounded-lg p-4 flex items-start gap-3 ${
                        reward.earned ? "bg-green-50 border-green-200" : "bg-card border-border"
                      }`}
                    >
                      <div className="text-2xl flex-shrink-0">{reward.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold ${reward.earned ? "text-green-900" : "text-foreground"}`}>
                          {reward.name}
                        </p>
                        <p className={`text-xs ${reward.earned ? "text-green-800" : "text-muted-foreground"}`}>
                          {reward.description}
                        </p>
                        {reward.earned && (
                          <p className="text-xs text-green-700 mt-1">
                            Earned on {new Date(reward.earnedDate!).toLocaleDateString()} • {reward.bonus}
                          </p>
                        )}
                      </div>
                      {reward.earned && <div className="text-lg flex-shrink-0">✓</div>}
                    </div>
                  ))}
                </div>
              ) : mockReposts.length > 0 ? (
                mockReposts.map((repost) => (
                  <div key={repost.id} className="bg-card border border-border rounded-lg p-4">
                    <p className="text-foreground mb-2">{repost.content}</p>
                    <p className="text-xs text-muted-foreground">{repost.timestamp}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-6 bg-card rounded-lg border border-border">
                  No reposts yet
                </p>
              )}
            </div>
          </div>

          <div className="px-4 md:px-6 mb-6 space-y-3">
            <button
              onClick={() => setActiveSettings(activeSettings === "password" ? null : "password")}
              className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition"
            >
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Change Password</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition ${activeSettings === "password" ? "rotate-180" : ""}`}
              />
            </button>

            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">More Settings</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-muted-foreground transition ${settingsOpen ? "rotate-180" : ""}`} />
            </button>

            {settingsOpen && (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {[
                  { id: "account", label: "Account Preferences", icon: Settings },
                  { id: "2fa", label: "Two-Factor Authentication", icon: Shield },
                  { id: "delete", label: "Delete Account", icon: Trash2 },
                  { id: "notifications", label: "Notifications", icon: Bell },
                  { id: "help", label: "Help & Support", icon: HelpCircle },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSettings(activeSettings === item.id ? null : item.id)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted transition border-b border-border last:border-b-0"
                    >
                      <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition ${activeSettings === item.id ? "rotate-180" : ""}`}
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {activeSettings === "edit-profile" && (
            <div className="px-4 md:px-6 mb-6">
              <div className="bg-card border border-border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-foreground">Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Full Name</label>
                    <input
                      type="text"
                      value={editProfileData.fullName}
                      onChange={(e) => setEditProfileData({ ...editProfileData, fullName: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                    <input
                      type="email"
                      value={editProfileData.email}
                      onChange={(e) => setEditProfileData({ ...editProfileData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Phone Number</label>
                    <input
                      type="tel"
                      value={editProfileData.phoneNumber}
                      onChange={(e) => setEditProfileData({ ...editProfileData, phoneNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Bio</label>
                    <textarea
                      value={editProfileData.bio}
                      onChange={(e) => setEditProfileData({ ...editProfileData, bio: e.target.value })}
                      placeholder="Tell your followers about yourself"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setActiveSettings(null)}
                      className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditProfileSave}
                      className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSettings === "password" && (
            <div className="px-4 md:px-6 mb-6">
              <div className="bg-card border border-border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password (min. 8 characters)"
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button
                    onClick={handlePasswordChange}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSettings === "account" && (
            <div className="px-4 md:px-6 mb-6">
              <div className="bg-card border border-border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-foreground">Account Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showBalanceOnProfile}
                      onChange={(e) => handleShowBalance(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground text-sm">Show account balance on profile</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-foreground text-sm">Make profile public</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-foreground text-sm">Allow others to see earnings</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSettings === "2fa" && (
            <div className="px-4 md:px-6 mb-6 space-y-4">
              <div className="bg-card border border-primary/50 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-primary flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by requiring a verification code in addition to your
                  password.
                </p>
                <div className="bg-muted/30 border border-border rounded-lg p-4 text-sm text-muted-foreground space-y-2">
                  <p className="font-semibold text-foreground mb-2">How it works:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Download an authenticator app</li>
                    <li>Scan the QR code displayed</li>
                    <li>Enter the 6-digit code to verify</li>
                    <li>Save your backup codes safely</li>
                  </ol>
                </div>
                <button className="w-full px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition">
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {activeSettings === "delete" && (
            <div className="px-4 md:px-6 mb-6">
              <div className="bg-card border border-destructive/50 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-destructive flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Delete Account
                </h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full px-4 py-2 bg-destructive/10 text-destructive rounded-lg font-semibold hover:bg-destructive/20 transition"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {activeSettings === "notifications" && (
            <div className="px-4 md:px-6 mb-6">
              <div className="bg-card border border-border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-foreground">Notification Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-foreground text-sm">Transaction alerts</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-foreground text-sm">Price alerts for crypto</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-foreground text-sm">New earnings notifications</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-foreground text-sm">Marketing emails</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSettings === "help" && (
            <div className="px-4 md:px-6 mb-6">
              <div className="bg-card border border-border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-foreground">Help & Support</h3>
                <div className="space-y-3">
                  <a href="/help" className="block text-primary hover:text-primary/80 transition text-sm font-medium">
                    Visit Help Center
                  </a>
                  <a href="/chat" className="block text-primary hover:text-primary/80 transition text-sm font-medium">
                    Contact Support
                  </a>
                  <button className="block text-primary hover:text-primary/80 transition text-sm font-medium">
                    Report Issue
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="px-4 md:px-6 pb-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-destructive/10 text-destructive py-3 rounded-lg font-semibold hover:bg-destructive/20 transition"
            >
              Log Out
            </button>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
