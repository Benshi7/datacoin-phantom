/* import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined",
  )
}

// Create singleton instance
let supabase: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (!supabase) {
    try {
      supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
    } catch (error) {
      console.error("Error creating Supabase client:", error)
      throw new Error("Failed to initialize Supabase client. Please check your configuration.")
    }
  }
  return supabase
}

 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined'
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
