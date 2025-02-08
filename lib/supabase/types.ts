export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string

          wallet_address: string

          name: string | null

          created_at: string

          updated_at: string
        }

        Insert: {
          id?: string

          wallet_address: string

          name?: string | null

          created_at?: string

          updated_at?: string
        }

        Update: {
          id?: string

          wallet_address?: string

          name?: string | null

          created_at?: string

          updated_at?: string
        }
      }

      user_data: {
        Row: {
          id: string

          balance: number

          data_points: number

          active_shares: number

          trust_score: number

          created_at: string

          updated_at: string
        }

        Insert: {
          id: string

          balance?: number

          data_points?: number

          active_shares?: number

          trust_score?: number

          created_at?: string

          updated_at?: string
        }

        Update: {
          id?: string

          balance?: number

          data_points?: number

          active_shares?: number

          trust_score?: number

          created_at?: string

          updated_at?: string
        }
      }

      health_data: {
        Row: {
          id: string

          user_id: string

          blood_type: string | null

          height: number | null

          weight: number | null

          allergies: string[] | null

          conditions: string[] | null

          medications: string[] | null

          created_at: string

          updated_at: string
        }

        Insert: {
          id?: string

          user_id: string

          blood_type?: string | null

          height?: number | null

          weight?: number | null

          allergies?: string[] | null

          conditions?: string[] | null

          medications?: string[] | null

          created_at?: string

          updated_at?: string
        }

        Update: {
          id?: string

          user_id?: string

          blood_type?: string | null

          height?: number | null

          weight?: number | null

          allergies?: string[] | null

          conditions?: string[] | null

          medications?: string[] | null

          created_at?: string

          updated_at?: string
        }
      }

      financial_data: {
        Row: {
          id: string

          user_id: string

          credit_score: number | null

          income_range: string | null

          investment_preferences: string[] | null

          risk_tolerance: string | null

          created_at: string

          updated_at: string
        }

        Insert: {
          id?: string

          user_id: string

          credit_score?: number | null

          income_range?: string | null

          investment_preferences?: string[] | null

          risk_tolerance?: string | null

          created_at?: string

          updated_at?: string
        }

        Update: {
          id?: string

          user_id?: string

          credit_score?: number | null

          income_range?: string | null

          investment_preferences?: string[] | null

          risk_tolerance?: string | null

          created_at?: string

          updated_at?: string
        }
      }

      data_sharing_history: {
        Row: {
          id: string

          user_id: string

          data_type: string

          points_earned: number

          shared_at: string
        }

        Insert: {
          id?: string

          user_id: string

          data_type: string

          points_earned: number

          shared_at?: string
        }

        Update: {
          id?: string

          user_id?: string

          data_type?: string

          points_earned?: number

          shared_at?: string
        }
      }

      user_settings: {
        Row: {
          user_id: string
          health_data_preferences: Record<string, boolean>
          financial_data_preferences: Record<string, boolean>
          location_data_preferences: Record<string, boolean>
          social_data_preferences: Record<string, boolean>
          internet_data_preferences: Record<string, boolean>
          created_at: string

          updated_at: string
        }

        Insert: {
          user_id: string

          health_data_sharing?: boolean

          financial_data_sharing?: boolean

          location_data_sharing?: boolean

          social_data_sharing?: boolean

          created_at?: string

          updated_at?: string
        }

        Update: {
          user_id?: string

          health_data_sharing?: boolean

          financial_data_sharing?: boolean

          location_data_sharing?: boolean

          social_data_sharing?: boolean

          created_at?: string

          updated_at?: string
        }
      }
    }
  }
}
