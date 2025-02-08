"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search } from "lucide-react"

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is DataCoin?",
        answer:
          "DataCoin is a revolutionary platform that allows users to monetize their personal data while maintaining complete control and privacy. Users can earn tokens by sharing their data with approved partners.",
      },
      {
        question: "How do I start earning?",
        answer:
          "To start earning, simply connect your data sources (health apps, financial services, etc.), set your sharing preferences, and begin receiving DHT tokens for your shared data.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes, we use end-to-end encryption and zero-knowledge proofs to ensure your data remains secure. You have complete control over what data is shared and with whom.",
      },
    ],
  },
  {
    category: "Data Sharing",
    questions: [
      {
        question: "What types of data can I share?",
        answer:
          "You can share various types of data including health metrics, financial information, location data, and social media activity. Each type of data has different earning potential.",
      },
      {
        question: "Can I choose who sees my data?",
        answer:
          "You have granular control over your data sharing preferences. You can approve or deny access to specific organizations and revoke access at any time.",
      },
      {
        question: "How often is data collected?",
        answer:
          "Data collection frequency depends on the type of data and your preferences. You can set up real-time sharing or periodic updates according to your comfort level.",
      },
    ],
  },
  {
    category: "Rewards & Tokens",
    questions: [
      {
        question: "How are rewards calculated?",
        answer:
          "Rewards are calculated based on the quantity, quality, and uniqueness of your shared data. Premium data types and consistent sharing can earn bonus rewards.",
      },
      {
        question: "When do I receive my tokens?",
        answer:
          "Tokens are distributed in real-time as your data is utilized. You can track your earnings in the dashboard and withdraw tokens to your wallet at any time.",
      },
      {
        question: "What can I do with DHT tokens?",
        answer:
          "DHT tokens can be traded on supported exchanges, used for platform services, or staked to earn additional rewards. They represent your ownership in the DataCoin ecosystem.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "How do I connect data sources?",
        answer:
          "You can connect data sources through our intuitive interface. Simply navigate to the 'Data Sources' section and follow the prompts to authorize connections.",
      },
      {
        question: "What if I need help?",
        answer:
          "Our support team is available 24/7. You can reach us through the help center, email, or live chat. We also have extensive documentation and community forums.",
      },
      {
        question: "Can I export my data?",
        answer:
          "Yes, you can export your data at any time in various formats. We support data portability and make it easy to maintain copies of your information.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="flex-1 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Find answers to common questions about DataCoin</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search FAQ</CardTitle>
          <CardDescription>Search our knowledge base for quick answers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredFaqs.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

