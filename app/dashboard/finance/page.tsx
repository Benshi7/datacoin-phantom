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

const financeCategories = [
  {
    id: 'transactions',
    name: 'Transaction History',
    description: 'Purchase history and payment patterns'
  },
  {
    id: 'income',
    name: 'Income Data',
    description: 'Salary and other income sources'
  },
  {
    id: 'credit',
    name: 'Credit Information',
    description: 'Credit score and credit card usage'
  },
  {
    id: 'investments',
    name: 'Investment Portfolio',
    description: 'Investment preferences and history'
  },
  {
    id: 'spending',
    name: 'Spending Patterns',
    description: 'Category-wise spending analysis'
  },
  {
    id: 'assets',
    name: 'Asset Information',
    description: 'Property and valuable assets owned'
  },
  {
    id: 'bills',
    name: 'Bill Payments',
    description: 'Regular bill payment history'
  },
  {
    id: 'savings',
    name: 'Savings Behavior',
    description: 'Savings accounts and goals'
  }
]

export default function FinanceDataPage () {
  const { user, updateUserSettings } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [masterToggle, setMasterToggle] = useState(false)
  const [categories, setCategories] = useState(
    financeCategories.reduce((acc, category) => {
      acc[category.id] = false
      return acc
    }, {} as Record<string, boolean>)
  )

  // Initialize toggle states from user settings
  useEffect(() => {
    if (user?.settings) {
      const financePrefs = user.settings.financial_data_preferences || {}
      setCategories(prev =>
        Object.keys(prev).reduce((acc, key) => {
          acc[key] = financePrefs[key] || false
          return acc
        }, {} as Record<string, boolean>)
      )
      setMasterToggle(Object.values(financePrefs).some(value => value))
    }
  }, [user?.settings])

  const handleMasterToggle = async (checked: boolean) => {
    try {
      setIsLoading(true)
      setMasterToggle(checked)

      const newCategories = Object.keys(categories).reduce((acc, key) => {
        acc[key] = checked
        return acc
      }, {} as Record<string, boolean>)
      setCategories(newCategories)

      await updateUserSettings({
        financial_data_preferences: newCategories
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

      const anyEnabled = Object.values(newCategories).some(value => value)
      setMasterToggle(anyEnabled)

      await updateUserSettings({
        financial_data_preferences: newCategories
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
          <CardTitle>Financial Data Management</CardTitle>
          <CardDescription>
            Control what financial data you want to share and manage your
            privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-between border-b pb-4'>
            <div>
              <h3 className='font-semibold'>Master Control</h3>
              <p className='text-sm text-muted-foreground'>
                Toggle all financial data sharing
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
            {financeCategories.map(category => (
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
          <CardTitle>Financial Data Sharing</CardTitle>
          <CardDescription>
            Share your financial data with financial institutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <label className='text-sm font-medium'>Institution Email</label>
              <Input
                type='email'
                placeholder='institution@bank.com'
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
