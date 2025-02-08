"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Clock, AlertTriangle, Shield, Coins } from "lucide-react"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: 1,
    title: "New Data Request",
    description: "Healthcare provider XYZ requested access to your health records",
    time: "2 minutes ago",
    type: "request",
    icon: Clock,
    unread: true,
  },
  {
    id: 2,
    title: "Earning Milestone",
    description: "Congratulations! You've earned 1,000 DHT this month",
    time: "1 hour ago",
    type: "success",
    icon: Coins,
    unread: true,
  },
  {
    id: 3,
    title: "Security Alert",
    description: "New device accessed your account. Please verify if this was you.",
    time: "2 hours ago",
    type: "warning",
    icon: AlertTriangle,
    unread: false,
  },
  {
    id: 4,
    title: "Privacy Update",
    description: "Your privacy settings were automatically updated",
    time: "1 day ago",
    type: "info",
    icon: Shield,
    unread: false,
  },
]

export function Notifications() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated with your data sharing activity</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn("flex items-start space-x-4 rounded-lg border p-4", notification.unread && "bg-muted/50")}
            >
              <div
                className={cn("rounded-full p-2", {
                  "bg-blue-100 text-blue-600": notification.type === "info",
                  "bg-green-100 text-green-600": notification.type === "success",
                  "bg-yellow-100 text-yellow-600": notification.type === "warning",
                  "bg-purple-100 text-purple-600": notification.type === "request",
                })}
              >
                <notification.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
              {notification.unread && <div className="flex h-2 w-2 rounded-full bg-primary" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

