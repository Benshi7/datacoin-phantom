'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, User } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import Link from 'next/link'

export function ProfileCTA () {
  const { user } = useAuth()

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    if (!user) return 0
    const fields = [
      user.name,
      user.settings?.email_verified,
      user.settings?.telegram_verified,
      user.settings?.twitter_verified,
      user.settings?.instagram_verified
    ]
    const completed = fields.filter(Boolean).length
    return (completed / fields.length) * 100
  }

  const completion = calculateCompletion()

  if (completion === 100) return null

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='space-y-1'>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Fill in your profile information to unlock all features
          </CardDescription>
        </div>
        <User className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='mt-4 space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>Profile Completion</span>
            <span>{Math.round(completion)}%</span>
          </div>
          <Progress value={completion} className='h-2' />
          <Button asChild className='mt-4 w-1/6 mx-auto'>
            <Link href='/dashboard/profile'>
              Complete Profile
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
