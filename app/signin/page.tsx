'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { Database, Wallet } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { AuthError } from '@/components/auth-error'
import { useRouter } from 'next/navigation'
export default function SignInPage () {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { connectWallet, walletConnected, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('SignIn Page - Wallet Connected:', walletConnected)
    if (walletConnected && !authLoading) {
      console.log('Already connected, redirecting to dashboard')
      router.push('/dashboard')
    }
  }, [walletConnected, authLoading, router])

  const handleWalletConnect = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await connectWallet()
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to connect wallet'
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return <AuthError message={error} />
  }

  return (
    <div className='container mx-auto flex h-screen w-screen flex-col items-center justify-center'>
      <Link
        href='/'
        className='absolute left-4 top-4 flex items-center text-lg font-bold md:left-8 md:top-8'
      >
        <Database className='mr-2 h-6 w-6' />
        <span>DataCoin</span>
      </Link>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Welcome to DataCoin
          </h1>
          <p className='text-sm text-muted-foreground'>
            Connect your wallet to start monetizing your data
          </p>
        </div>
        <div className='grid gap-6'>
          <Button
            variant='outline'
            disabled={isLoading}
            onClick={handleWalletConnect}
          >
            {isLoading ? (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Wallet className='mr-2 h-4 w-4' />
            )}
            Connect Phantom Wallet
          </Button>
        </div>
        <p className='px-8 text-center text-sm text-muted-foreground'>
          By connecting your wallet, you agree to our{' '}
          <Link
            href='/terms'
            className='hover:text-brand underline underline-offset-4'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy'
            className='hover:text-brand underline underline-offset-4'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
