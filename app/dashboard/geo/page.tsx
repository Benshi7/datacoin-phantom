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

const geoCategories = [
  {
    id: 'location',
    name: 'Real-time Location',
    description: 'Current geographical position and movement patterns'
  },
  {
    id: 'places',
    name: 'Visited Places',
    description: 'History of locations and venues visited'
  },
  {
    id: 'commute',
    name: 'Commute Patterns',
    description: 'Regular travel routes and transportation methods'
  },
  {
    id: 'residence',
    name: 'Residence History',
    description: 'Past and current places of residence'
  },
  {
    id: 'travel',
    name: 'Travel History',
    description: 'International and domestic travel data'
  },
  {
    id: 'poi',
    name: 'Points of Interest',
    description: 'Frequently visited locations and preferences'
  },
  {
    id: 'activity',
    name: 'Activity Zones',
    description: 'Areas of regular activity and time spent'
  },
  {
    id: 'weather',
    name: 'Weather Exposure',
    description: 'Weather conditions in visited locations'
  }
]

export default function GeoDataPage () {
  const { user, updateUserSettings } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [masterToggle, setMasterToggle] = useState(false)
  const [categories, setCategories] = useState(
    geoCategories.reduce((acc, category) => {
      acc[category.id] = false
      return acc
    }, {} as Record<string, boolean>)
  )

  // Initialize toggle states from user settings
  useEffect(() => {
    if (user?.settings?.location_data_preferences) {
      setCategories(user.settings.location_data_preferences)
      // Set master toggle if all categories are enabled
      const allEnabled = Object.values(
        user.settings.location_data_preferences
      ).every(value => value === true)
      setMasterToggle(allEnabled)
    }
  }, [user?.settings])

  const handleMasterToggle = async (checked: boolean) => {
    try {
      setIsLoading(true)
      setMasterToggle(checked)

      // Update all categories
      const newCategories = Object.keys(categories).reduce((acc, key) => {
        acc[key] = checked
        return acc
      }, {} as Record<string, boolean>)
      setCategories(newCategories)

      // Update database
      await updateUserSettings({
        location_data_preferences: newCategories
      })
    } catch (error) {
      console.error('Error updating settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryToggle = async (id: string, checked: boolean) => {
    try {
      setIsLoading(true)
      const newCategories = { ...categories, [id]: checked }
      setCategories(newCategories)

      // Update master toggle if all categories are the same
      const allSame = Object.values(newCategories).every(
        value => value === checked
      )
      if (allSame) {
        setMasterToggle(checked)
      }

      // Update database
      await updateUserSettings({
        location_data_preferences: newCategories
      })
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
          <CardTitle>Geographical Data Management</CardTitle>
          <CardDescription>
            Control what location data you want to share and manage your privacy
            settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-between border-b pb-4'>
            <div>
              <h3 className='font-semibold'>Master Control</h3>
              <p className='text-sm text-muted-foreground'>
                Toggle all location data sharing
              </p>
            </div>
            <div className='flex items-center gap-2'>
              {isLoading && <Icons.spinner className='h-4 w-4 animate-spin' />}
              <Switch
                checked={masterToggle}
                onCheckedChange={handleMasterToggle}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className='space-y-4 pt-4'>
            {geoCategories.map(category => (
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
                <div className='flex items-center gap-2'>
                  {isLoading && (
                    <Icons.spinner className='h-4 w-4 animate-spin' />
                  )}
                  <Switch
                    checked={categories[category.id]}
                    onCheckedChange={checked =>
                      handleCategoryToggle(category.id, checked)
                    }
                    disabled={isLoading}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location Sharing Management</CardTitle>
          <CardDescription>
            Share your location data with service providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <label className='text-sm font-medium'>
                Service Provider Email
              </label>
              <Input
                type='email'
                placeholder='provider@service.com'
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
