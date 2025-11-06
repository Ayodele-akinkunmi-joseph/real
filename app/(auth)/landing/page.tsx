"use client"

import { useRouter } from "next/navigation"
import {
  Menu,
  X,
  Play,
  Send,
  DollarSign,
  Video,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Check,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function LandingPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqItems = [
    {
      q: "How do I get started on VibenPay?",
      a: "Sign up with your email, verify your profile, and you're ready to create content and transact. Verification typically takes 5-10 minutes.",
    },
    {
      q: "When do I start earning money?",
      a: "You can post content immediately, but monetization starts once you reach 1,000 followers. After that, you earn$4per 1,000 views on your content.",
    },
    {
      q: "What payment methods do you support?",
      a: "We support bank transfers, mobile money, and crypto withdrawals. Withdrawals are processed instantly with low fees.",
    },
    {
      q: "Is it safe to buy crypto on VibenPay?",
      a: "Yes, we use bank-grade security with two-factor authentication, encrypted wallets, and comply with financial regulations.",
    },
    {
      q: "Can I transfer money internationally?",
      a: "Absolutely. VibenPay enables borderless transactions. Send money to over 150 countries with instant settlement and competitive rates.",
    },
    {
      q: "What's included in the Creator Plus plan?",
      a: "Full monetization access, ad bonuses, live gift features, investment tools, and priority customer support.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-sm">
              V
            </div>
            <span className="font-bold text-lg hidden sm:inline">VibenPay</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium hover:text-primary transition">
              Home
            </a>
            <a href="#features" className="text-sm font-medium hover:text-primary transition">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition">
              FAQ
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/signin" className="text-sm font-medium hover:text-primary transition hidden sm:block">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition"
            >
              Join Now
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4 space-y-4">
            <a
              href="#home"
              className="block text-sm hover:text-primary transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#features"
              className="block text-sm hover:text-primary transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block text-sm hover:text-primary transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="block text-sm hover:text-primary transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="block text-sm hover:text-primary transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Link href="/signin" className="block text-sm text-primary font-medium">
              Sign In
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-24 md:pt-20 bg-gradient-to-b from-primary/5 via-background to-background"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
              Connect. Create. <span className="text-primary">Earn</span>. Invest.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              VibenPay is a social fintech platform for creators — simplifying borderless transactions, global earning,
              and crypto investments all in one place.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/signup"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg hover:shadow-xl"
            >
              Join as Creator
            </Link>
            <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition">
              Join as Brand
            </button>
            <button className="px-8 py-4 border-2 border-border text-foreground rounded-lg font-semibold hover:bg-muted transition">
              Download App
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">The Creator's Dilemma</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-destructive/30 rounded-xl p-8 space-y-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💸</span>
              </div>
              <h3 className="text-xl font-bold">Unfair Monetization</h3>
              <p className="text-muted-foreground">
                Limited earning opportunities and low payouts from traditional platforms mean your hard work doesn't pay
                enough.
              </p>
            </div>
            <div className="bg-card border border-destructive/30 rounded-xl p-8 space-y-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚫</span>
              </div>
              <h3 className="text-xl font-bold">Payment Barriers</h3>
              <p className="text-muted-foreground">
                High fees, delayed payments, and limited withdrawal options make it hard to access your earnings
                globally.
              </p>
            </div>
            <div className="bg-card border border-destructive/30 rounded-xl p-8 space-y-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold">No Investment Access</h3>
              <p className="text-muted-foreground">
                Creators can't grow their wealth through investments and often lack tools to manage their finances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Meet Your Financial Partner</h2>
            <p className="text-lg text-muted-foreground">
              VibenPay empowers African creators to earn instantly and grow financially
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Create & Earn</h3>
              <p className="text-muted-foreground">
                Post videos, gain followers, and start monetizing. Earn$4per 1,000 views instantly.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <Send className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Transact & Get Paid Instantly</h3>
              <p className="text-muted-foreground">
                Send and receive money globally with low fees. Withdraw instantly to any bank account.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Invest & Grow Wealth</h3>
              <p className="text-muted-foreground">
                Invest your earnings in crypto or savings vaults. Watch your wealth grow with real-time insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Highlights</h2>
            <p className="text-lg text-muted-foreground">Everything you need to succeed as a creator</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-xl p-8 space-y-6 hover:border-primary/50 transition">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                <Play className="w-7 h-7 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Social & Creator Hub</h3>
                <p className="text-muted-foreground text-sm">Your all-in-one platform for content and community</p>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Upload and share short-form videos</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Gain 1,000 followers to unlock monetization</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Earn$4per 1,000 views per content</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Live bonuses, ad rewards & Creator's Day gifts</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-xl p-8 space-y-6 hover:border-primary/50 transition">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                <Send className="w-7 h-7 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Fintech & Payments</h3>
                <p className="text-muted-foreground text-sm">Borderless money made simple</p>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Send and receive money globally</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Instant withdrawals with low fees</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Smart wallet with cross-border transfers</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Integrated brand payment system</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-xl p-8 space-y-6 hover:border-primary/50 transition">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Crypto & Investment</h3>
                <p className="text-muted-foreground text-sm">Invest and grow your wealth</p>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Buy and sell crypto easily</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Invest directly from your wallet</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Portfolio tracking with real-time insights</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Crypto engagement & referral bonuses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in 5 Simple Steps</h2>
            <p className="text-lg text-muted-foreground">Join thousands of creators earning with VibenPay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
            {[
              { step: 1, title: "Sign Up", desc: "Create account & verify profile", icon: "👤" },
              { step: 2, title: "Post Content", desc: "Share your creative videos", icon: "📹" },
              { step: 3, title: "Grow Followers", desc: "Reach 1,000 followers", icon: "👥" },
              { step: 4, title: "Start Earning", desc: "Get paid per 1,000 views", icon: "💰" },
              { step: 5, title: "Invest & Grow", desc: "Invest earnings in crypto", icon: "📈" },
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-4 relative">
                {idx < 4 && <div className="hidden md:block absolute top-8 left-[55%] w-[45%] h-0.5 bg-border" />}
                <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto relative z-10 shadow-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
                <div className="text-4xl">{item.icon}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Join 10,000+ Early Creators Building Wealth
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-muted/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Choose the plan that fits your journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-8 space-y-6 flex flex-col">
              <div>
                <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                <p className="text-sm text-muted-foreground">Perfect for getting started</p>
              </div>
              <div>
                <p className="text-4xl font-bold">₦0</p>
                <p className="text-sm text-muted-foreground mt-1">Forever free</p>
              </div>
              <ul className="space-y-3 text-sm flex-1">
                <li className="flex gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Create & post content</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Send & receive money</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Limited monetization</span>
                </li>
              </ul>
              <Link
                href="/signup"
                className="w-full py-2 border border-border rounded-lg hover:bg-muted transition text-center font-medium"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-card border-2 border-primary rounded-xl p-8 space-y-6 flex flex-col ring-2 ring-primary/10">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-primary">Creator Plus</h3>
                <p className="text-sm text-muted-foreground">For active creators</p>
              </div>
              <div>
                <p className="text-4xl font-bold">₦5,000</p>
                <p className="text-sm text-muted-foreground mt-1">per month</p>
              </div>
              <ul className="space-y-3 text-sm flex-1">
                <li className="flex gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Full monetization access</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Ad bonuses & live gifts</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Investment tools unlocked</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link
                href="/signup"
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-center font-semibold"
              >
                Subscribe Now
              </Link>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 space-y-6 flex flex-col">
              <div>
                <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
                <p className="text-sm text-muted-foreground">Maximum benefits</p>
              </div>
              <div>
                <p className="text-4xl font-bold">₦15,000</p>
                <p className="text-sm text-muted-foreground mt-1">per month</p>
              </div>
              <ul className="space-y-3 text-sm flex-1">
                <li className="flex gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Everything in Plus</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Verified creator badge</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Premium analytics</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>1-on-1 dedicated support</span>
                </li>
              </ul>
              <button className="w-full py-2 border border-border rounded-lg hover:bg-muted transition text-center font-medium">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about VibenPay</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition"
                >
                  <span className="text-left font-semibold text-foreground">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${expandedFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-muted/30 border-t border-border">
                    <p className="text-muted-foreground">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">Have questions? We'd love to hear from you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a href="mailto:support@vibenpay.com" className="text-primary hover:underline">
                       vibenpay@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <a href="tel:+2341234567890" className="text-primary hover:underline">
                        07033073970, 07084345640
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="text-muted-foreground">Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition"
                  >
                    <span className="text-sm font-bold">𝕏</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition"
                  >
                    <span className="text-sm">📷</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition"
                  >
                    <span className="text-sm">💼</span>
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ for Support */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">FAQ & Support</h3>
              <div className="space-y-4 mb-8">
                <div className="pb-4 border-b border-border">
                  <p className="font-semibold text-foreground mb-2">Monetization Questions</p>
                  <p className="text-sm text-muted-foreground">
                    Learn about follower requirements, earnings, and payouts
                  </p>
                </div>
                <div className="pb-4 border-b border-border">
                  <p className="font-semibold text-foreground mb-2">Withdrawal & KYC</p>
                  <p className="text-sm text-muted-foreground">Understand verification and withdrawal processes</p>
                </div>
                <div className="pb-4">
                  <p className="font-semibold text-foreground mb-2">Investor Inquiries</p>
                  <p className="text-sm text-muted-foreground">For partnership and investment opportunities</p>
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Creative Career?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join thousands of creators already earning, transacting globally, and building wealth with VibenPay
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Get Early Access Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">VibenPay</h4>
              <p className="text-sm text-muted-foreground">Connect. Create. Earn. Invest.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 VibenPay. All rights reserved. Empowering creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
