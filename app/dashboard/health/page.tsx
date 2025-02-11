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
import { FileUpload } from '@/components/ui/file-upload'

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
  const [hasChanges, setHasChanges] = useState(false)
  const [masterToggle, setMasterToggle] = useState(false)
  const [categories, setCategories] = useState(
    healthCategories.reduce((acc, category) => {
      acc[category.id] = false
      return acc
    }, {} as Record<string, boolean>)
  )

  useEffect(() => {
    if (user?.settings?.health_data_preferences) {
      setCategories(user.settings.health_data_preferences)
      const allEnabled = Object.values(
        user.settings.health_data_preferences
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
        health_data_sharing: anyEnabled,
        health_data_preferences: categories
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
          <CardTitle>Health Data Management</CardTitle>
          <CardDescription>
            Control what health data you want to share and manage your privacy
            settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div className='flex items-center justify-between border-b pb-4'>
              <div>
                <h3 className='font-semibold'>Master Control</h3>
                <p className='text-sm text-muted-foreground'>
                  Toggle all health data sharing
                </p>
              </div>
              <Switch
                checked={masterToggle}
                onCheckedChange={handleMasterToggle}
                disabled={isLoading}
              />
            </div>

            <div className='space-y-4'>
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

      {/* <Card>
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
      </Card> */}
      <FileUpload category='health' />
    </div>
  )
}
