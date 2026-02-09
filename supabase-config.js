// supabase-config.js

const SUPABASE_URL = 'https://vtjmsbamwczbxrpaowko.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0am1zYmFtd2N6YnhycGFvd2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MDQwMjcsImV4cCI6MjA4NjE4MDAyN30.4J23xlPMxjwKZS8bFExua1tSsnDoXmyhtbL2AipB3OQ'

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
window.supabaseClient = supabase