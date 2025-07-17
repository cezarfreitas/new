import { createClient } from "@supabase/supabase-js"

// URLs do Supabase self-hosted
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://5.161.117.45:8000"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

// Cliente para uso no lado do cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente para uso no servidor (com service role)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

// Tipos para TypeScript
export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          email: string
          name: string | null
          source: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          source?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          source?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          message?: string
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      page_views: {
        Row: {
          id: string
          page: string
          user_agent: string | null
          ip_address: string | null
          referrer: string | null
          created_at: string
        }
        Insert: {
          id?: string
          page: string
          user_agent?: string | null
          ip_address?: string | null
          referrer?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          page?: string
          user_agent?: string | null
          ip_address?: string | null
          referrer?: string | null
          created_at?: string
        }
      }
    }
  }
}
