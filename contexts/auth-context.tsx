'use client'

import type React from 'react'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import type { PublicKey } from '@solana/web3.js'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row'] &
  Database['public']['Tables']['user_data']['Row'] & {
    settings?: Database['public']['Tables']['user_settings']['Row']
    health_data?: Database['public']['Tables']['health_data']['Row']
    financial_data?: Database['public']['Tables']['financial_data']['Row']
  }

interface AuthContextType {
  user: Profile | null
  isLoading: boolean
  walletConnected: boolean
  publicKey: PublicKey | null
  connectWallet: () => Promise<void>
  signOut: () => Promise<void>
  updateUserSettings: (
    settings: Partial<
      Database['public']['Tables']['user_settings']['Update']
    > & {
      health_data_preferences?: Record<string, boolean>
      financial_data_preferences?: Record<string, boolean>
      location_data_preferences?: Record<string, boolean>
      social_data_preferences?: Record<string, boolean>
      internet_data_preferences?: Record<string, boolean>
    }
  ) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider ({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Start as true to prevent flash
  const [walletConnected, setWalletConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Check if Phantom is installed and get provider
  const getProvider = useCallback(() => {
    if (typeof window === 'undefined') return undefined

    const provider = window.solana
    if (!provider?.isPhantom) return undefined

    return provider
  }, [])

  // Fetch user data from Supabase
  const fetchUserData = useCallback(async (walletAddress: string) => {
    try {
      // Get or create profile
      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single()

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                wallet_address: walletAddress,
                name: `Wallet ${walletAddress.slice(
                  0,
                  4
                )}...${walletAddress.slice(-4)}`
              }
            ])
            .select()
            .single()

          if (createError) throw createError
          profile = newProfile
        } else {
          throw profileError
        }
      }

      // Get user data
      const { data: userData, error: userDataError } = await supabase
        .from('user_data')
        .select('*')
        .eq('id', profile.id)
        .single()

      if (userDataError && userDataError.code !== 'PGRST116')
        throw userDataError

      // Get user settings
      const { data: settings, error: settingsError } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', profile.id)
        .single()

      if (settingsError && settingsError.code !== 'PGRST116')
        throw settingsError

      // Get health data
      const { data: healthData } = await supabase
        .from('health_data')
        .select('*')
        .eq('user_id', profile.id)
        .single()

      // Get financial data
      const { data: financialData } = await supabase
        .from('financial_data')
        .select('*')
        .eq('user_id', profile.id)
        .single()

      // Return the combined data
      return {
        ...profile,
        ...userData,
        settings,
        health_data: healthData,
        financial_data: financialData,
        // Add default values for dashboard display
        balance: userData?.balance ?? 1000,
        data_points: userData?.data_points ?? 150,
        active_shares: userData?.active_shares ?? 3,
        trust_score: userData?.trust_score ?? 95
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      // Return mock data as fallback
      return {
        id: walletAddress,
        wallet_address: walletAddress,
        name: `Wallet ${walletAddress.slice(0, 4)}...${walletAddress.slice(
          -4
        )}`,
        balance: 1000,
        data_points: 150,
        active_shares: 3,
        trust_score: 95,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
  }, [])

  // Initialize wallet connection
  useEffect(() => {
    const initializeWallet = async () => {
      const provider = getProvider()
      if (!provider) {
        setIsLoading(false)
        return
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        const isStorageConnected =
          localStorage.getItem('walletConnected') === 'true'

        if (isStorageConnected) {
          let attempts = 0
          while (
            attempts < 3 &&
            (!provider.isConnected || !provider.publicKey)
          ) {
            try {
              await provider.connect()
            } catch (e) {}
            await new Promise(resolve => setTimeout(resolve, 200))
            attempts++
          }

          if (provider.isConnected && provider.publicKey) {
            setWalletConnected(true)
            setPublicKey(provider.publicKey as PublicKey)
            const userData = await fetchUserData(provider.publicKey.toString())
            setUser(userData)
          } else {
            localStorage.removeItem('walletConnected')
            router.push('/signin')
          }
        }

        provider.on('connect', handleConnection)
        provider.on('disconnect', () => {
          setWalletConnected(false)
          setPublicKey(null)
          setUser(null)
          localStorage.removeItem('walletConnected')
          router.push('/')
        })
      } catch (error) {
        console.error('Error initializing wallet:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeWallet()

    return () => {
      const provider = getProvider()
      if (provider) {
        provider.removeAllListeners('connect')
        provider.removeAllListeners('disconnect')
      }
    }
  }, [getProvider, fetchUserData, router])
  const handleConnection = async (publicKey: PublicKey) => {
    try {
      setWalletConnected(true)
      setPublicKey(publicKey)
      localStorage.setItem('walletConnected', 'true')
      const userData = await fetchUserData(publicKey.toString())
      setUser(userData)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error handling connection:', error)
      toast({
        title: 'Error',
        description: 'Failed to load user data. Please try again.',
        variant: 'destructive'
      })
    }
  }

  const connectWallet = async () => {
    try {
      setIsLoading(true)
      const provider = getProvider()

      if (!provider) {
        window.open('https://phantom.app/', '_blank')
        throw new Error('Please install Phantom wallet')
      }

      // Connect to Phantom
      const response = await provider.connect()

      // Directly handle the connection here instead of waiting for the event
      if (response.publicKey) {
        setWalletConnected(true)
        setPublicKey(response.publicKey)
        localStorage.setItem('walletConnected', 'true')
        const userData = await fetchUserData(response.publicKey.toString())
        setUser(userData)
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Wallet connection error:', error)
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to connect wallet',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      const provider = getProvider()

      if (provider) {
        // First clear our state
        setWalletConnected(false)
        setPublicKey(null)
        setUser(null)
        localStorage.removeItem('walletConnected')

        // Then disconnect Phantom
        await provider.disconnect()

        // Remove event listeners to prevent any reconnection attempts
        provider.removeAllListeners('connect')
        provider.removeAllListeners('disconnect')
      }

      // Only redirect after everything is cleared
      router.push('/')

      toast({
        title: 'Signed out',
        description: 'Wallet disconnected successfully.'
      })
    } catch (error) {
      console.error('Sign out error:', error)
      toast({
        title: 'Error',
        description: 'Failed to disconnect wallet. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserSettings = async (
    settings: Partial<Database['public']['Tables']['user_settings']['Update']>
  ) => {
    if (!user) throw new Error('No user logged in')

    try {
      const { error } = await supabase
        .from('user_settings')
        .update(settings)
        .eq('user_id', user.id)

      if (error) throw error

      // Update local user state
      setUser(prev => {
        if (!prev) return prev
        return {
          ...prev,
          settings: {
            ...prev.settings,
            ...settings
          } as Database['public']['Tables']['user_settings']['Row']
        }
      })

      toast({
        title: 'Success',
        description: 'Settings updated successfully.'
      })
    } catch (error) {
      console.error('Error updating settings:', error)
      toast({
        title: 'Error',
        description: 'Failed to update settings. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        walletConnected,
        publicKey,
        connectWallet,
        signOut,
        updateUserSettings
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
