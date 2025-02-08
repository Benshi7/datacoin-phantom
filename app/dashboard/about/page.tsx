"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Twitter, Globe, Shield, Database, Lock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex-1 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">About DataCoin</h2>
          <p className="text-muted-foreground">Learn more about our platform and mission</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" size="sm">
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
          <Button variant="outline" size="sm">
            <Globe className="mr-2 h-4 w-4" />
            Website
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-primary" />
            <CardTitle className="mt-4">Privacy First</CardTitle>
            <CardDescription>Your data security and privacy are our top priorities</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>End-to-end encryption</li>
              <li>Zero-knowledge proofs</li>
              <li>User-controlled sharing</li>
              <li>GDPR compliant</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Database className="h-8 w-8 text-primary" />
            <CardTitle className="mt-4">Data Monetization</CardTitle>
            <CardDescription>Turn your personal data into valuable digital assets</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Fair compensation</li>
              <li>Transparent pricing</li>
              <li>Instant rewards</li>
              <li>Multiple data sources</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Lock className="h-8 w-8 text-primary" />
            <CardTitle className="mt-4">User Control</CardTitle>
            <CardDescription>Maintain full control over your data sharing</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Granular permissions</li>
              <li>Revoke access anytime</li>
              <li>Usage analytics</li>
              <li>Data portability</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Statistics</CardTitle>
          <CardDescription>Current state of the DataCoin ecosystem</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="text-3xl font-bold">1.2M+</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold">$25M+</p>
            <p className="text-sm text-muted-foreground">Total Rewards Paid</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold">50B+</p>
            <p className="text-sm text-muted-foreground">Data Points Processed</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold">100+</p>
            <p className="text-sm text-muted-foreground">Partner Organizations</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Latest Updates</CardTitle>
          <CardDescription>Recent developments and announcements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4">
            <Badge variant="secondary">New</Badge>
            <div>
              <h4 className="text-sm font-semibold">Health Data Integration</h4>
              <p className="text-sm text-muted-foreground">
                Now supporting integration with major health tracking platforms
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Badge variant="secondary">Update</Badge>
            <div>
              <h4 className="text-sm font-semibold">Enhanced Security</h4>
              <p className="text-sm text-muted-foreground">
                Implemented advanced encryption protocols for better data protection
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Badge variant="secondary">Coming Soon</Badge>
            <div>
              <h4 className="text-sm font-semibold">Mobile App</h4>
              <p className="text-sm text-muted-foreground">
                Manage your data sharing on the go with our upcoming mobile application
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

