'use client'
import { DashboardNav } from '@/components/dashboard/nav'
import { Sidebar } from '@/components/dashboard/sidebar'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import type React from 'react' // Added import for React
import { useEffect } from 'react'

export default function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, walletConnected } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !walletConnected) {
      router.push('/signin')
    }
  }, [isLoading, walletConnected, router])

  // Show loading state only during initial load
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Don't render anything during redirect
  if (!user || !walletConnected) {
    return null
  }

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-1'>
        <DashboardNav />
        <main className='container p-8'>{children}</main>
      </div>
    </div>
  )
}
