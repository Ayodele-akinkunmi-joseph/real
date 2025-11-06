"use client"

import {
  Users,
  TrendingUp,
  Activity,
  BarChart3,
  AlertTriangle,
  Eye,
  Trash2,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  UserCheck,
  Search,
  Download,
  Flag,
  CheckCircle,
  XCircle,
  MessageSquare,
  Heart,
  Share2,
  Ban,
  UserX,
  Clock,
  Home,
} from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const adminStats = [
  { label: "Total Users", value: "12,543", change: "+12.5%", icon: Users, trend: "up" },
  { label: "Active Today", value: "3,421", change: "+5.2%", icon: Activity, trend: "up" },
  { label: "Total Revenue", value: "₦2.4M", change: "+23.8%", icon: DollarSign, trend: "up" },
  { label: "Pending Flags", value: "47", change: "+8.1%", icon: AlertTriangle, trend: "warning" },
]

const transactionData = [
  { date: "Mon", inflow: 240000, outflow: 180000 },
  { date: "Tue", inflow: 380000, outflow: 220000 },
  { date: "Wed", inflow: 320000, outflow: 260000 },
  { date: "Thu", inflow: 450000, outflow: 280000 },
  { date: "Fri", inflow: 520000, outflow: 340000 },
  { date: "Sat", inflow: 380000, outflow: 200000 },
  { date: "Sun", inflow: 610000, outflow: 380000 },
]

const userGrowthData = [
  { month: "Jan", users: 8500 },
  { month: "Feb", users: 9200 },
  { month: "Mar", users: 10100 },
  { month: "Apr", users: 10800 },
  { month: "May", users: 11500 },
  { month: "Jun", users: 12543 },
]

const categoryData = [
  { name: "Send Money", value: 45, color: "#3b82f6" },
  { name: "Crypto", value: 32, color: "#8b5cf6" },
  { name: "Airtime", value: 18, color: "#ec4899" },
  { name: "Bills", value: 5, color: "#f59e0b" },
]

const customersData = [
  {
    id: 1,
    fullName: "Sarah Ahmed",
    email: "sarah@example.com",
    phone: "+234 706 201 4710",
    accountNumber: "7062014710",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f42E9",
    balance: "₦45,230",
    cryptoBalance: "0.0234 BTC",
    joinedDate: "2024-01-15",
    status: "Active",
    verified: true,
    totalTransactions: 127,
    followers: 1250,
  },
  {
    id: 2,
    fullName: "John Tech",
    email: "john@example.com",
    phone: "+234 803 456 7890",
    accountNumber: "8034567890",
    walletAddress: "0x8f3d4e5c6b7a8d9e0f1a2b3c4d5e6f7a8b9c0d1e",
    balance: "₦12,450",
    cryptoBalance: "0.0089 BTC",
    joinedDate: "2024-02-20",
    status: "Active",
    verified: true,
    totalTransactions: 45,
    followers: 890,
  },
  {
    id: 3,
    fullName: "Emma Wilson",
    email: "emma@example.com",
    phone: "+234 734 567 8901",
    accountNumber: "7345678901",
    walletAddress: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    balance: "₦8,920",
    cryptoBalance: "0.0012 BTC",
    joinedDate: "2024-03-10",
    status: "Inactive",
    verified: false,
    totalTransactions: 23,
    followers: 340,
  },
  {
    id: 4,
    fullName: "Michael Brown",
    email: "michael@example.com",
    phone: "+234 745 678 9012",
    accountNumber: "7456789012",
    walletAddress: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
    balance: "₦67,890",
    cryptoBalance: "0.0567 BTC",
    joinedDate: "2024-01-05",
    status: "Active",
    verified: true,
    totalTransactions: 234,
    followers: 2340,
  },
  {
    id: 5,
    fullName: "Lisa Wong",
    email: "lisa@example.com",
    phone: "+234 756 789 0123",
    accountNumber: "7567890123",
    walletAddress: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    balance: "₦34,560",
    cryptoBalance: "0.0234 BTC",
    joinedDate: "2024-02-14",
    status: "Active",
    verified: true,
    totalTransactions: 156,
    followers: 1560,
  },
  {
    id: 6,
    fullName: "David Chen",
    email: "david@example.com",
    phone: "+234 767 890 1234",
    accountNumber: "7678901234",
    walletAddress: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
    balance: "₦23,450",
    cryptoBalance: "0.0156 BTC",
    joinedDate: "2024-03-22",
    status: "Active",
    verified: false,
    totalTransactions: 67,
    followers: 670,
  },
]

const initialPostsData = [
  {
    id: 1,
    author: "Sarah Ahmed",
    authorEmail: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Just made my first crypto investment on Vibenpay! The platform is so easy to use. 🚀",
    image: "/crypto-chart.jpg",
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: "2 hours ago",
    postedDate: "2024-06-15 14:30",
    status: "Active",
    flagged: false,
    flagReason: null,
    sensitive: false,
  },
  {
    id: 2,
    author: "John Tech",
    authorEmail: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Check out this amazing deal! Get rich quick with my investment scheme. DM for details! 💰💰💰",
    image: "/scattered-currency.png",
    likes: 12,
    comments: 3,
    shares: 1,
    timestamp: "5 hours ago",
    postedDate: "2024-06-15 11:00",
    status: "Flagged",
    flagged: true,
    flagReason: "Potential scam/spam",
    sensitive: true,
  },
  {
    id: 3,
    author: "Emma Wilson",
    authorEmail: "emma@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Love the new features on Vibenpay! Sending money to friends has never been easier.",
    image: "/social-media-post.jpg",
    likes: 156,
    comments: 23,
    shares: 8,
    timestamp: "1 day ago",
    postedDate: "2024-06-14 09:15",
    status: "Active",
    flagged: false,
    flagReason: null,
    sensitive: false,
  },
  {
    id: 4,
    author: "Michael Brown",
    authorEmail: "michael@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "This is inappropriate content that violates community guidelines...",
    image: "/warning-sign-hazard.png",
    likes: 5,
    comments: 2,
    shares: 0,
    timestamp: "3 hours ago",
    postedDate: "2024-06-15 12:45",
    status: "Flagged",
    flagged: true,
    flagReason: "Inappropriate content",
    sensitive: true,
  },
  {
    id: 5,
    author: "Lisa Wong",
    email: "lisa@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Just sent money to my family back home using Vibenpay. Transaction was instant! ⚡",
    image: null,
    likes: 89,
    comments: 12,
    shares: 5,
    timestamp: "6 hours ago",
    postedDate: "2024-06-15 10:00",
    status: "Active",
    flagged: false,
    flagReason: null,
    sensitive: false,
  },
  {
    id: 6,
    author: "David Chen",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Trading crypto on Vibenpay is seamless. Best platform I've used!",
    image: "/cryptocurrency-concept.png",
    likes: 178,
    comments: 34,
    shares: 15,
    timestamp: "12 hours ago",
    postedDate: "2024-06-15 04:00",
    status: "Active",
    flagged: false,
    flagReason: null,
    sensitive: false,
  },
]

export default function AdminPage() {
  const { user, isLoggedIn, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"home" | "customers" | "posts">("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "flagged">("all")
  const [postsData, setPostsData] = useState(initialPostsData)

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (!isLoggedIn || !user?.isAdmin) {
      router.push("/")
      return
    }
  }, [isLoading, isLoggedIn, user?.isAdmin, router])

  const filteredCustomers = customersData.filter((customer) => {
    const matchesSearch =
      customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.accountNumber.includes(searchQuery) ||
      customer.phone.includes(searchQuery)

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && customer.status === "Active") ||
      (statusFilter === "inactive" && customer.status === "Inactive")

    return matchesSearch && matchesStatus
  })

  const filteredPosts = postsData.filter((post) => {
    const matchesSearch =
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && post.status === "Active") ||
      (statusFilter === "flagged" && post.status === "Flagged")

    return matchesSearch && matchesStatus
  })

  const handleApprovePost = (postId: number) => {
    setPostsData((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, status: "Active", flagged: false, flagReason: null, sensitive: false } : post,
      ),
    )
  }

  const handleFlagPost = (postId: number) => {
    const reason = prompt("Enter flag reason:")
    if (reason) {
      setPostsData((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, status: "Flagged", flagged: true, flagReason: reason, sensitive: true }
            : post,
        ),
      )
    }
  }

  const handleRemovePost = (postId: number) => {
    if (confirm("Are you sure you want to remove this post?")) {
      setPostsData((prev) => prev.filter((post) => post.id !== postId))
    }
  }

  const handleBanUser = (postId: number) => {
    const post = postsData.find((p) => p.id === postId)
    if (post && confirm(`Are you sure you want to ban ${post.author}? This will remove all their posts.`)) {
      setPostsData((prev) => prev.filter((p) => p.authorEmail !== post.authorEmail))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn || !user?.isAdmin) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:block w-64 bg-card border-r-2 border-border sticky top-[88px] h-[calc(100vh-88px)] overflow-y-auto">
        <nav className="p-4 space-y-2">
          <button
            onClick={() => {
              setActiveTab("home")
              setSearchQuery("")
              setStatusFilter("all")
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
              activeTab === "home"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            onClick={() => {
              setActiveTab("customers")
              setSearchQuery("")
              setStatusFilter("all")
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
              activeTab === "customers"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Users className="w-5 h-5" />
            Customers
          </button>
          <button
            onClick={() => {
              setActiveTab("posts")
              setSearchQuery("")
              setStatusFilter("all")
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
              activeTab === "posts"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Posts
          </button>
        </nav>
      </aside>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border z-40 flex">
        <button
          onClick={() => {
            setActiveTab("home")
            setSearchQuery("")
            setStatusFilter("all")
          }}
          className={`flex-1 flex flex-col items-center gap-1 py-3 font-semibold transition ${
            activeTab === "home" ? "text-primary bg-primary/5" : "text-muted-foreground"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("customers")
            setSearchQuery("")
            setStatusFilter("all")
          }}
          className={`flex-1 flex flex-col items-center gap-1 py-3 font-semibold transition ${
            activeTab === "customers" ? "text-primary bg-primary/5" : "text-muted-foreground"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-xs">Customers</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("posts")
            setSearchQuery("")
            setStatusFilter("all")
          }}
          className={`flex-1 flex flex-col items-center gap-1 py-3 font-semibold transition ${
            activeTab === "posts" ? "text-primary bg-primary/5" : "text-muted-foreground"
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs">Posts</span>
        </button>
      </div>

      <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6 max-w-full overflow-x-hidden">
        {/* Home Tab */}
        {activeTab === "home" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {adminStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-card border-2 border-border rounded-xl p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-muted-foreground font-semibold">{stat.label}</p>
                      <div className={`p-2 rounded-lg ${stat.trend === "warning" ? "bg-orange-100" : "bg-primary/10"}`}>
                        <Icon className={`w-5 h-5 ${stat.trend === "warning" ? "text-orange-600" : "text-primary"}`} />
                      </div>
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                    <p
                      className={`text-sm font-semibold ${stat.trend === "up" ? "text-green-600" : stat.trend === "warning" ? "text-orange-600" : "text-green-600"}`}
                    >
                      {stat.change} from last week
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Money Flow Chart */}
              <div className="bg-card border-2 border-border rounded-xl p-6 hover:shadow-lg transition">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Money Flow (7 Days)
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip formatter={(value) => `₦${(Number(value) / 1000).toFixed(0)}K`} />
                    <Bar dataKey="inflow" fill="#10b981" name="Inflow" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="outflow" fill="#ef4444" name="Outflow" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* User Growth Chart */}
              <div className="bg-card border-2 border-border rounded-xl p-6 hover:shadow-lg transition">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  User Growth (6 Months)
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4" />
                  Total Inflow
                </h3>
                <p className="text-3xl font-bold text-green-900">₦15,847,340</p>
                <p className="text-xs text-green-700 mt-2 font-medium">+12.5% from last week</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                  <ArrowDownLeft className="w-4 h-4" />
                  Total Outflow
                </h3>
                <p className="text-3xl font-bold text-red-900">₦8,234,120</p>
                <p className="text-xs text-red-700 mt-2 font-medium">-3.2% from last week</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Net Flow
                </h3>
                <p className="text-3xl font-bold text-blue-900">₦7,613,220</p>
                <p className="text-xs text-blue-700 mt-2 font-medium">Positive balance</p>
              </div>
            </div>

            {/* Transaction Categories */}
            <div className="bg-card border-2 border-border rounded-xl p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Transaction Distribution
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col justify-center gap-3">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
                        <span className="font-medium text-foreground">{category.name}</span>
                      </div>
                      <span className="font-bold text-foreground">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "customers" && (
          <div className="space-y-4">
            {/* Search and Filter Bar */}
            <div className="bg-card border-2 border-border rounded-xl p-4 mt-6 md:mt-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name, email, account number, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-background text-foreground"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-background text-foreground font-medium"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <button className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="font-medium">
                  Showing {filteredCustomers.length} of {customersData.length} customers
                </span>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border bg-muted/50">
                      <th className="text-left py-3 px-4 font-bold text-foreground text-sm">Customer</th>
                      <th className="text-left py-3 px-4 font-bold text-foreground text-sm">Contact</th>
                      <th className="text-left py-3 px-4 font-bold text-foreground text-sm">Account</th>
                      <th className="text-left py-3 px-4 font-bold text-foreground text-sm">Balance</th>
                      <th className="text-left py-3 px-4 font-bold text-foreground text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-bold text-foreground text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b border-border hover:bg-muted/20 transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-semibold text-foreground text-sm">{customer.fullName}</div>
                              <div className="text-xs text-muted-foreground">
                                {customer.totalTransactions} txns • {customer.followers} followers
                              </div>
                            </div>
                            {customer.verified && <CheckCircle className="w-4 h-4 text-blue-600" title="Verified" />}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-xs text-muted-foreground">{customer.email}</div>
                          <div className="text-xs text-muted-foreground font-mono">{customer.phone}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-foreground font-mono font-semibold">
                            {customer.accountNumber}
                          </div>
                          <div className="text-xs text-muted-foreground">{customer.joinedDate}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-foreground font-bold">{customer.balance}</div>
                          <div className="text-xs text-muted-foreground">{customer.cryptoBalance}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              customer.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            <button
                              className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-muted-foreground hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                              title="Suspend"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="space-y-4">
            {/* Search and Filter Bar */}
            <div className="bg-card border-2 border-border rounded-xl p-4 mt-6 md:mt-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search posts by author, content, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-background text-foreground"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-background text-foreground font-medium"
                >
                  <option value="all">All Posts</option>
                  <option value="active">Active</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium">
                  Showing {filteredPosts.length} of {postsData.length} posts
                </span>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className={`bg-card border-2 rounded-xl overflow-hidden hover:shadow-lg transition ${
                    post.flagged ? "border-orange-300 bg-orange-50/50" : "border-border"
                  }`}
                >
                  {/* Post Header */}
                  <div className="p-4 border-b border-border bg-muted/20">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src={post.avatar || "/placeholder.svg"}
                          alt={post.author}
                          className="w-12 h-12 rounded-full border-2 border-border"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-foreground">{post.author}</p>
                            {post.sensitive && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
                                SENSITIVE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{post.authorEmail}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          post.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <p className="text-foreground mb-3">{post.content}</p>
                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post content"
                        className="w-full rounded-lg border border-border max-h-80 object-cover"
                      />
                    )}

                    {/* Post Stats */}
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-4 h-4 text-muted-foreground">Comments</span>
                        <span className="text-sm font-medium">{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm font-medium">{post.shares}</span>
                      </div>
                    </div>

                    {/* Flag Reason */}
                    {post.flagged && post.flagReason && (
                      <div className="mt-4 p-3 bg-orange-100 border border-orange-300 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-700" />
                          <span className="text-sm font-bold text-orange-900">Flagged Reason:</span>
                          <span className="text-sm text-orange-800">{post.flagReason}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t border-border bg-muted/10">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleApprovePost(post.id)}
                        className="flex-1 min-w-[120px] px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-semibold text-sm flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleFlagPost(post.id)}
                        className="flex-1 min-w-[120px] px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition font-semibold text-sm flex items-center justify-center gap-2"
                      >
                        <Flag className="w-4 h-4" />
                        Flag
                      </button>
                      <button
                        onClick={() => handleRemovePost(post.id)}
                        className="flex-1 min-w-[120px] px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold text-sm flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Remove
                      </button>
                      <button
                        onClick={() => handleBanUser(post.id)}
                        className="flex-1 min-w-[120px] px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold text-sm flex items-center justify-center gap-2"
                      >
                        <UserX className="w-4 h-4" />
                        Ban User
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
