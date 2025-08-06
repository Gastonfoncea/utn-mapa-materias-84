import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rrawlrjxwnwvwencqczw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyYXdscmp4d253dndlbmNxY3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNjQ0NzEsImV4cCI6MjA2OTc0MDQ3MX0.k3nEfZ7tfkWs_WLVneee_d-kwSpBXD071-VlwRRCvzs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)