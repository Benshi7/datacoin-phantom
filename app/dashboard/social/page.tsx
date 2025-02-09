'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Icons } from '@/components/icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const socialCategories = [
  {
    id: 'connections',
    name: 'Social Connections',
    description: 'Network of friends and professional contacts'
  },
  {
    id: 'interactions',
    name: 'Social Interactions',
    description: 'Likes, comments, and shares on social platforms'
  },
  {
    id: 'content',
    name: 'Posted Content',
    description: 'Public posts, photos, and videos shared'
  },
  {
    id: 'interests',
    name: 'Social Interests',
    description: 'Groups, pages, and topics followed'
  },
  {
    id: 'events',
    name: 'Event Participation',
    description: 'Social events attended or interested in'
  },
  {
    id: 'messaging',
    name: 'Messaging Patterns',
    description: 'Communication frequency and preferences'
  },
  {
    id: 'professional',
    name: 'Professional Network',
    description: 'Career history and professional connections'
  },
  {
    id: 'engagement',
    name: 'Platform Engagement',
    description: 'Time spent and activity on social platforms'
  }
]

export default function SocialDataPage () {
  const { user, updateUserSettings } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [masterToggle, setMasterToggle] = useState(false)
  const [categories, setCategories] = useState(
    socialCategories.reduce((acc, category) => {
      acc[category.id] = false
      return acc
    }, {} as Record<string, boolean>)
  )

  // Initialize toggle states from user settings
  useEffect(() => {
    if (user?.settings?.social_data_preferences) {
      setCategories(user.settings.social_data_preferences)
      const allEnabled = Object.values(
        user.settings.social_data_preferences
      ).every(value => value === true)
      setMasterToggle(allEnabled)
    }
  }, [user?.settings])

  const handleMasterToggle = (checked: boolean) => {
    setMasterToggle(checked)
    const newCategories = Object.keys(categories).reduce((acc, key) => {
      acc[key] = checked
      return acc
    }, {} as Record<string, boolean>)
    setCategories(newCategories)
    setHasChanges(true)
  }

  const handleCategoryToggle = (id: string, checked: boolean) => {
    const newCategories = { ...categories, [id]: checked }
    setCategories(newCategories)

    // Update master toggle if all categories are the same
    const allSame = Object.values(newCategories).every(
      value => value === checked
    )
    if (allSame) {
      setMasterToggle(checked)
    }

    setHasChanges(true)
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      const anyEnabled = Object.values(categories).some(value => value)

      await updateUserSettings({
        social_data_sharing: anyEnabled,
        social_data_preferences: categories
      })
      setHasChanges(false)
    } catch (error) {
      console.error('Error updating settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>Social Data Management</CardTitle>
          <CardDescription>
            Control what social data you want to share and manage your privacy
            settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div className='flex items-center justify-between border-b pb-4'>
              <div>
                <h3 className='font-semibold'>Master Control</h3>
                <p className='text-sm text-muted-foreground'>
                  Toggle all social data sharing
                </p>
              </div>
              <Switch
                checked={masterToggle}
                onCheckedChange={handleMasterToggle}
                disabled={isLoading}
              />
            </div>

            <div className='space-y-4'>
              {socialCategories.map(category => (
                <div
                  key={category.id}
                  className='flex items-center justify-between'
                >
                  <div>
                    <h4 className='font-medium'>{category.name}</h4>
                    <p className='text-sm text-muted-foreground'>
                      {category.description}
                    </p>
                  </div>
                  <Switch
                    checked={categories[category.id]}
                    onCheckedChange={checked =>
                      handleCategoryToggle(category.id, checked)
                    }
                    disabled={isLoading}
                  />
                </div>
              ))}
            </div>

            <div className='flex justify-end pt-4'>
              <Button onClick={handleSave} disabled={!hasChanges || isLoading}>
                {isLoading && (
                  <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Data Sharing</CardTitle>
          <CardDescription>
            Share your social data with marketing partners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <label className='text-sm font-medium'>Partner Email</label>
              <Input
                type='email'
                placeholder='partner@company.com'
                className='mt-1'
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Additional Notes</label>
              <Textarea
                placeholder='Add any specific instructions or notes...'
                className='mt-1'
              />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>
                Access will be valid for 30 minutes
              </p>
            </div>
            <Button className='w-full'>Generate Sharing Link</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
