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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { Icons } from '@/components/icons'
import { Mail, Send, Twitter, Instagram } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase/client'

export default function ProfilePage () {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: '',
    telegram: '',
    twitter: '',
    instagram: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name
        })
        .eq('id', user.id)

      if (error) throw error

      const { error: completionError } = await supabase
        .from('profile_completion')
        .update({
          telegram_username: formData.telegram,
          twitter_username: formData.twitter,
          instagram_username: formData.instagram
        })
        .eq('user_id', user.id)

      if (completionError) throw completionError

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.'
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Profile Settings</h2>
        <p className='text-muted-foreground'>
          Manage your profile information and connected accounts
        </p>
      </div>

      <Separator />

      <form onSubmit={handleSubmit} className='space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>
              Update your basic profile information
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Display Name</Label>
              <Input
                id='name'
                placeholder='Enter your name'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='wallet'>Wallet Address</Label>
              <Input id='wallet' value={user?.wallet_address || ''} disabled />
              <p className='text-sm text-muted-foreground'>
                Your wallet address cannot be changed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              Link your social media accounts to earn rewards
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email Address</Label>
              <div className='flex gap-2'>
                <Input
                  id='email'
                  type='email'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Button type='button' variant='outline'>
                  <Mail className='mr-2 h-4 w-4' />
                  Verify
                </Button>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='telegram'>Telegram Username</Label>
              <div className='flex gap-2'>
                <Input
                  id='telegram'
                  placeholder='@username'
                  value={formData.telegram}
                  onChange={e =>
                    setFormData({ ...formData, telegram: e.target.value })
                  }
                />
                <Button type='button' variant='outline'>
                  <Send className='mr-2 h-4 w-4' />
                  Verify
                </Button>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='twitter'>Twitter Username</Label>
              <div className='flex gap-2'>
                <Input
                  id='twitter'
                  placeholder='@username'
                  value={formData.twitter}
                  onChange={e =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                />
                <Button type='button' variant='outline'>
                  <Twitter className='mr-2 h-4 w-4' />
                  Verify
                </Button>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='instagram'>Instagram Username</Label>
              <div className='flex gap-2'>
                <Input
                  id='instagram'
                  placeholder='@username'
                  value={formData.instagram}
                  onChange={e =>
                    setFormData({ ...formData, instagram: e.target.value })
                  }
                />
                <Button type='button' variant='outline'>
                  <Instagram className='mr-2 h-4 w-4' />
                  Verify
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='flex justify-end'>
          <Button type='submit' disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
