'use client'

import { useState, useEffect } from 'react'
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
import { useAuth } from '@/contexts/auth-context'
import { Icons } from '@/components/icons'

const healthCategories = [
  {
    id: 'general',
    name: 'General Health Metrics',
    description: 'Blood type, height, weight, etc.'
  },
  {
    id: 'genetic',
    name: 'Genetic Testing Results',
    description: 'DNA analysis and genetic predispositions'
  },
  {
    id: 'allergies',
    name: 'Allergy Information',
    description: 'Known allergies and reactions'
  },
  {
    id: 'birth',
    name: 'Birth Defects Data',
    description: 'Congenital conditions and related information'
  },
  {
    id: 'history',
    name: 'Previous Disease History',
    description: 'Past illnesses and treatments'
  },
  {
    id: 'chronic',
    name: 'Chronic Conditions',
    description: 'Ongoing health conditions'
  },
  {
    id: 'medication',
    name: 'Medication History',
    description: 'Current and past medications'
  },
  {
    id: 'lifestyle',
    name: 'Health Habits & Lifestyle',
    description: 'Exercise, diet, and daily habits'
  },
  {
    id: 'covid',
    name: 'SARS/COVID History',
    description: 'COVID-19 testing and vaccination records'
  },
  {
    id: 'drug',
    name: 'Drug Intolerance Records',
    description: 'Known drug sensitivities and reactions'
  }
]

export default function HealthDataPage () {
  const { user, updateUserSettings } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [masterToggle, setMasterToggle] = useState(false)
  const [categories, setCategories] = useState(
    healthCategories.reduce((acc, category) => {
      acc[category.id] = false
      return acc
    }, {} as Record<string, boolean>)
  )

  // Initialize toggle states from user settings
  useEffect(() => {
    if (user?.settings?.health_data_preferences) {
      setCategories(user.settings.health_data_preferences)
      // Set master toggle if all categories are enabled
      const allEnabled = Object.values(
        user.settings.health_data_preferences
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
        health_data_sharing: checked,
        health_data_preferences: newCategories
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

      // If any category is enabled, health_data_sharing should be true
      const anyEnabled = Object.values(newCategories).some(value => value)

      // Update master toggle if all categories are the same
      const allSame = Object.values(newCategories).every(
        value => value === checked
      )
      if (allSame) {
        setMasterToggle(checked)
      }

      // Update database
      await updateUserSettings({
        health_data_sharing: anyEnabled,
        health_data_preferences: newCategories
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
          <CardTitle>Health Data Management</CardTitle>
          <CardDescription>
            Control what health data you want to share and manage your privacy
            settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-between border-b pb-4'>
            <div>
              <h3 className='font-semibold'>Master Control</h3>
              <p className='text-sm text-muted-foreground'>
                Toggle all health data sharing
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
            {healthCategories.map(category => (
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
          <CardTitle>Sharing Management</CardTitle>
          <CardDescription>
            Share your health data with healthcare providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <label className='text-sm font-medium'>
                Healthcare Provider Email
              </label>
              <Input
                type='email'
                placeholder='doctor@hospital.com'
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
