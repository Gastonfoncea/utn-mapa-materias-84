import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cdktlhxocjxznbhwdnlf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNka3RsaHhvY2p4em5iaHdkbmxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzNDU1NDIsImV4cCI6MjA1MDkyMTU0Mn0.qEa-ZU_3LRnfNfQMHczZX7I0MKMCIAk9rwq8-HpKSp0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)