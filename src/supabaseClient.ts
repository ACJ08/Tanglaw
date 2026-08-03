import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

/** Public Supabase configuration is safe to expose, but optional in demo mode. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Creating the client with placeholders prevents missing configuration from
// crashing the entire React module graph before an error UI can render.
export const supabase = createClient(supabaseUrl || "https://not-configured.supabase.co", supabaseAnonKey || "not-configured")
