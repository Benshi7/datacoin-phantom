'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  CheckCircle2,
  ExternalLink,
  Send,
  Twitter,
  Instagram
} from 'lucide-react'

const missions = [
  {
    id: 'twitter',
    title: 'Follow on Twitter',
    description: 'Follow DataCoin to stay updated',
    icon: Twitter,
    link: 'https://twitter.com/datacoin'
  },
  {
    id: 'instagram',
    title: 'Follow on Instagram',
    description: 'Join our Instagram community',
    icon: Instagram,
    link: 'https://instagram.com/datacoin'
  },
  {
    id: 'telegram',
    title: 'Join Telegram Group',
    description: 'Connect with the DataCoin community',
    icon: Send,
    link: 'https://t.me/datacoin_community'
  }
]

export function MissionsCard () {
  const [completed, setCompleted] = useState<string[]>([])

  const markCompleted = (id: string) => {
    if (!completed.includes(id)) {
      setCompleted([...completed, id])
    }
  }

  const progress = (completed.length / missions.length) * 100

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <CardTitle>Community Missions</CardTitle>
            <CardDescription>
              Complete missions to join our community
            </CardDescription>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <span className='font-medium'>
              {completed.length}/{missions.length}
            </span>
            <span className='text-muted-foreground'>completed</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Progress value={progress} className='h-2' />

        <div className='space-y-4'>
          {missions.map(mission => {
            const isCompleted = completed.includes(mission.id)
            return (
              <div
                key={mission.id}
                className='flex items-center justify-between rounded-lg border p-4'
              >
                <div className='flex items-center gap-4'>
                  <div className='rounded-lg bg-primary/10 p-2'>
                    <mission.icon className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <h4 className='font-medium'>{mission.title}</h4>
                    <p className='text-sm text-muted-foreground'>
                      {mission.description}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => window.open(mission.link, '_blank')}
                  >
                    <ExternalLink className='mr-2 h-4 w-4' />
                    Visit
                  </Button>
                  <Button
                    variant={isCompleted ? 'ghost' : 'outline'}
                    size='sm'
                    onClick={() => markCompleted(mission.id)}
                    disabled={isCompleted}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className='mr-2 h-4 w-4 text-green-500' />
                        Done
                      </>
                    ) : (
                      'Mark Done'
                    )}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {progress === 100 && (
          <div className='rounded-lg bg-green-500/10 p-4 text-center text-sm text-green-600'>
            🎉 Congratulations! You've completed all community missions!
          </div>
        )}
      </CardContent>
    </Card>
  )
}
