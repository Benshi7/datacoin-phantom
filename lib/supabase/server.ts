import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// env local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isValidUrl = (urlString: string) => {
  try {
    new URL(urlString)
    return true
  } catch (e) {
    return false
  }
}

export function createClient () {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined'
    )
  }

  if (!isValidUrl(supabaseUrl)) {
    throw new Error(
      'Invalid NEXT_PUBLIC_SUPABASE_URL: Must be a valid URL (e.g., https://your-project.supabase.co)'
    )
  }

  const cookieStore = cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get (name: string) {
        return cookieStore.get(name)?.value
      },
      set (name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          console.error('Error setting cookie:', error)
        }
      },
      remove (name: string, options: any) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          console.error('Error removing cookie:', error)
        }
      }
    }
  })
}
