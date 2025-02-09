'use client'

import { useAuth } from '@/contexts/auth-context'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Activity,
  Coins,
  Database,
  Share2,
  TrendingUp,
  Users,
  Shield,
  Award
} from 'lucide-react'
import { Overview } from '@/components/dashboard/overview'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { Analytics } from '@/components/dashboard/analytics'
import { Reports } from '@/components/dashboard/reports'
import { Notifications } from '@/components/dashboard/notifications'
import { ProfileCTA } from '@/components/dashboard/profile-cta'
import { MissionsCard } from '@/components/dashboard/missions-card'
export default function DashboardPage () {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className='flex-1 space-y-8'>
      {/* Overview Section */}
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Welcome back, {user.name}!
          </h2>
          <p className='text-muted-foreground'>
            Here's what's happening with your data today
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Button>
            <Coins className='mr-2 h-4 w-4' />
            Buy More DHT
          </Button>
        </div>
      </div>
      {/* Profile Completion Card */}
      <ProfileCTA />
      <MissionsCard />
      {/* Stats Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Balance</CardTitle>
            <Coins className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {user.balance.toFixed(2)} DHT
            </div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Data Points</CardTitle>
            <Database className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{user?.data_points}</div>
            <p className='text-xs text-muted-foreground'>
              +180 new points this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Shares</CardTitle>
            <Share2 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{user?.active_shares}</div>
            <p className='text-xs text-muted-foreground'>5 pending approvals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Trust Score</CardTitle>
            <Shield className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>98%</div>
            <p className='text-xs text-muted-foreground'>Top 5% of users</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='reports'>Reports</TabsTrigger>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>Data Earnings Overview</CardTitle>
                <CardDescription>
                  Your earning trends over the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent className='pl-2'>
                <Overview />
              </CardContent>
            </Card>
            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest data sharing activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>Data Sharing Overview</CardTitle>
              </CardHeader>
              <CardContent className='pl-2'>
                <div className='flex flex-col space-y-4'>
                  {/* Health Data */}
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <Activity className='h-4 w-4 text-primary' />
                        <span className='text-sm font-medium'>Health Data</span>
                      </div>
                      <span className='text-sm text-muted-foreground'>85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  {/* Financial Data */}
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <TrendingUp className='h-4 w-4 text-primary' />
                        <span className='text-sm font-medium'>
                          Financial Data
                        </span>
                      </div>
                      <span className='text-sm text-muted-foreground'>65%</span>
                    </div>
                    <Progress value={65} />
                  </div>
                  {/* Social Data */}
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <Users className='h-4 w-4 text-primary' />
                        <span className='text-sm font-medium'>Social Data</span>
                      </div>
                      <span className='text-sm text-muted-foreground'>92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>
                  Your latest data sharing milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-4'>
                    <Award className='h-8 w-8 text-primary' />
                    <div>
                      <p className='text-sm font-medium'>Data Pioneer</p>
                      <p className='text-xs text-muted-foreground'>
                        Shared over 10,000 data points
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <Shield className='h-8 w-8 text-primary' />
                    <div>
                      <p className='text-sm font-medium'>Trust Champion</p>
                      <p className='text-xs text-muted-foreground'>
                        Maintained 95%+ trust score for 3 months
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <Users className='h-8 w-8 text-primary' />
                    <div>
                      <p className='text-sm font-medium'>Community Leader</p>
                      <p className='text-xs text-muted-foreground'>
                        Helped 50+ users with data sharing
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value='analytics' className='space-y-4'>
          <Analytics />
        </TabsContent>
        <TabsContent value='reports' className='space-y-4'>
          <Reports />
        </TabsContent>
        <TabsContent value='notifications' className='space-y-4'>
          <Notifications />
        </TabsContent>
      </Tabs>
    </div>
  )
}
