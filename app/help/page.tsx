"use client"

import { TopNav } from "@/components/top-nav"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"
import { ChevronDown, Mail, MessageCircle, Phone } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "How do I send money to another person?",
    answer:
      "Navigate to Finance > Send Money, enter the recipient's email or phone number, amount, and confirm the transaction. Funds are transferred instantly.",
  },
  {
    question: "What are the transaction fees?",
    answer:
      "Domestic transfers: Free for Vibenpay users. International transfers: 1.5% + $2. Crypto trades: 0.5% trading fee.",
  },
  {
    question: "Is my money secure on Vibenpay?",
    answer:
      "Yes, we use bank-level encryption (256-bit SSL) and store funds in segregated accounts with licensed financial institutions.",
  },
  {
    question: "How do I buy cryptocurrency?",
    answer:
      "Go to Crypto section, select the asset you want, click Buy, enter amount, and confirm. Purchases settle within 2 minutes.",
  },
  {
    question: "Can I withdraw my funds anytime?",
    answer:
      "Yes, you can withdraw to your linked bank account anytime. Withdrawals typically process within 1-3 business days.",
  },
]

export default function HelpPage() {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <div className="flex">
        <DesktopNav />

        <main className="flex-1 max-w-3xl mx-auto w-full pb-20 md:pb-0">
          {/* Header */}
          <div className="gradient-primary text-primary-foreground p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Help & Support</h1>
            <p className="text-base opacity-90">Find answers to common questions or contact our support team</p>
          </div>

          <div className="p-4 md:p-6">
            {/* Support Options */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition">
                <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-3">support@vibenpay.com</p>
                <button className="text-primary text-sm font-medium hover:underline">Send Email</button>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition">
                <MessageCircle className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-3">Average reply: 2 minutes</p>
                <button className="text-primary text-sm font-medium hover:underline">Start Chat</button>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition">
                <Phone className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-3">+1 (555) 000-0000</p>
                <button className="text-primary text-sm font-medium hover:underline">Call Now</button>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpanded(expanded === idx ? null : idx)}
                      className="w-full px-4 py-4 flex items-center justify-between hover:bg-muted transition"
                    >
                      <h3 className="font-semibold text-left">{faq.question}</h3>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition ${expanded === idx ? "rotate-180" : ""}`}
                      />
                    </button>
                    {expanded === idx && (
                      <div className="px-4 py-3 border-t border-border bg-muted/30 text-muted-foreground">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
