import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || ''

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

export default supabase;